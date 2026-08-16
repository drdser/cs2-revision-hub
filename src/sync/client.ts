import { SYNC_ANON_KEY, SYNC_URL } from './config';

/**
 * Transport for the sync backend.
 *
 * Talks to two Postgres functions rather than to the table directly. That is a
 * deliberate choice: with no table-level read policy, holding the public anon
 * key does not let anyone list or dump records. A caller can only act on a row
 * whose id they already know, and ids are derived from a nickname and PIN.
 *
 * See docs/SYNC-SETUP.md for the schema and the exact policies.
 */

export interface RemoteRecord {
  payload: string;
  /** Server-held proof of the PIN. Compared client-side before decrypting. */
  verifier: string;
  updatedAt: number;
}

export class SyncError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'SyncError';
    this.status = status;
  }
}

async function rpc<T>(fn: string, body: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${SYNC_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SYNC_ANON_KEY,
        Authorization: `Bearer ${SYNC_ANON_KEY}`,
      },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new SyncError('Could not reach the sync server.');
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new SyncError(
      response.status === 429
        ? 'Too many sync requests. Try again in a moment.'
        : `Sync failed (${response.status}). ${detail.slice(0, 120)}`.trim(),
      response.status,
    );
  }

  return (await response.json()) as T;
}

interface RawRecord {
  payload: string | null;
  verifier: string | null;
  updated_at: string | number | null;
}

function toMillis(value: string | number | null): number {
  if (value === null) return 0;
  if (typeof value === 'number') return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/** Fetch a record. Returns null when this id has never been written. */
export async function pullRecord(
  accountId: string,
  signal?: AbortSignal,
): Promise<RemoteRecord | null> {
  const rows = await rpc<RawRecord[] | RawRecord | null>('sync_pull', { p_id: accountId }, signal);
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row?.payload) return null;
  return {
    payload: row.payload,
    verifier: row.verifier ?? '',
    updatedAt: toMillis(row.updated_at),
  };
}

/**
 * Create or replace a record.
 *
 * The server rejects the write when a row already exists under a different
 * verifier, so a wrong PIN can never overwrite somebody else's progress. That
 * check is enforced in the database, not just here.
 */
export async function pushRecord(
  accountId: string,
  verifier: string,
  payload: string,
  signal?: AbortSignal,
): Promise<void> {
  await rpc<unknown>(
    'sync_push',
    { p_id: accountId, p_verifier: verifier, p_payload: payload },
    signal,
  );
}

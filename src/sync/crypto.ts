/**
 * Key derivation and payload encryption for cross-device sync.
 *
 * The design goal is that the server never holds anything meaningful. From the
 * nickname and PIN we derive, entirely in the browser:
 *
 *   - a sync id, which is the row key the server stores the blob under
 *   - an AES-GCM key, which never leaves the device
 *
 * The server therefore sees an opaque id and a ciphertext. It cannot read a
 * student's progress, and neither can anyone who obtains a copy of the database.
 *
 * The trade-off is that a forgotten PIN means unrecoverable data. There is no
 * reset, because there is nothing on the server that could perform one.
 */

const PBKDF2_ITERATIONS = 310_000;
const APP_SALT = 'cs2-revision-hub/sync/v1';

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

/** Nicknames are matched case- and whitespace-insensitively. */
export function normalizeNickname(nickname: string): string {
  return nickname.trim().toLowerCase().replace(/\s+/g, ' ');
}

export interface SyncKeys {
  /** Row key, derived from the nickname ALONE so a wrong PIN still finds the row. */
  accountId: string;
  /** Proves the PIN is right. Safe for the server to store: it decrypts nothing. */
  verifier: string;
  /** Stays on the device. Used to encrypt and decrypt the payload. */
  cryptoKey: CryptoKey;
}

/**
 * Derive everything needed to sync, from a nickname and PIN.
 *
 * The account id comes from the nickname ALONE. That is deliberate: if the row
 * key depended on the PIN, a student who mistyped it would silently land on a
 * different, empty record and conclude their progress had been lost. Keying the
 * row on the nickname means a wrong PIN finds the real row and fails loudly.
 *
 * The PIN then yields two independent values from one PBKDF2 pass: a verifier the
 * server stores so it can reject a wrong PIN, and an AES key that never leaves
 * the device. Holding the verifier does not help anyone decrypt the payload.
 */
export async function deriveSyncKeys(nickname: string, pin: string): Promise<SyncKeys> {
  const encoder = new TextEncoder();
  const normalized = normalizeNickname(nickname);

  const idBits = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(`${APP_SALT}|account|${normalized}`),
  );
  const accountId = bytesToBase64Url(new Uint8Array(idBits).slice(0, 16));

  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(`${normalized} ${pin}`),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  // 48 bytes: 16 for the verifier the server sees, 32 for the AES key it never does.
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(`${APP_SALT} ${normalized}`),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    48 * 8,
  );

  const derived = new Uint8Array(bits);
  const verifier = bytesToBase64Url(derived.slice(0, 16));
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    derived.slice(16),
    'AES-GCM',
    false,
    ['encrypt', 'decrypt'],
  );

  return { accountId, verifier, cryptoKey };
}

/** Encrypt a JSON-serialisable value. The IV is prepended to the ciphertext. */
export async function encryptPayload(key: CryptoKey, value: unknown): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext),
  );

  const combined = new Uint8Array(iv.length + ciphertext.length);
  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  return bytesToBase64Url(combined);
}

/**
 * Decrypt a payload. Returns null when the blob cannot be read, which in
 * practice means the PIN is wrong or the record was written by another version.
 */
export async function decryptPayload<T>(key: CryptoKey, payload: string): Promise<T | null> {
  try {
    const combined = base64UrlToBytes(payload);
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
    return JSON.parse(new TextDecoder().decode(plaintext)) as T;
  } catch {
    // Wrong key, corrupt record, or a payload this build cannot parse.
    return null;
  }
}

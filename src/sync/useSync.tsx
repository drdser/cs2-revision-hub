import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { ProgressState } from '../types';
import { useProgress } from '../hooks/useProgress';
import {
  MIN_NICKNAME_LENGTH,
  MIN_PIN_LENGTH,
  PULL_INTERVAL_MS,
  PUSH_DEBOUNCE_MS,
  syncEnabled,
} from './config';
import {
  deriveSyncKeys,
  decryptPayload,
  encryptPayload,
  normalizeNickname,
  type SyncKeys,
} from './crypto';
import { pullRecord, pushRecord, SyncError } from './client';
import { isProgressState, mergeProgress, sameProgress } from './merge';

const SESSION_KEY = 'cs2hub.sync.session.v1';

export type SyncStatus = 'off' | 'signed-out' | 'connecting' | 'syncing' | 'synced' | 'error';

interface StoredSession {
  nickname: string;
  syncId: string;
}

interface SyncContextValue {
  enabled: boolean;
  status: SyncStatus;
  nickname: string | null;
  lastSyncedAt: number | null;
  error: string | null;
  signIn: (nickname: string, pin: string) => Promise<void>;
  signOut: () => void;
  syncNow: () => void;
}

const SyncContext = createContext<SyncContextValue | null>(null);

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSession>;
    if (typeof parsed.nickname === 'string' && typeof parsed.syncId === 'string') {
      return { nickname: parsed.nickname, syncId: parsed.syncId };
    }
  } catch {
    // Unreadable session; the student signs in again.
  }
  return null;
}

/**
 * Cross-device sync.
 *
 * The PIN is never stored anywhere, and neither is the AES key derived from it —
 * the key lives in memory for the lifetime of the page. Only the nickname and the
 * derived sync id persist, which is enough to pre-fill the form and show who is
 * signed in, but not enough to read the data.
 *
 * The consequence is deliberate: after a reload the student re-enters their PIN
 * to resume syncing. Their progress is never gone in the meantime, because the
 * local copy in localStorage is always the working copy. Sync is a backup and a
 * bridge between devices, not the source of truth.
 */
export function SyncProvider({ children }: { children: ReactNode }) {
  const { state, applyRemote } = useProgress();

  const [status, setStatus] = useState<SyncStatus>(syncEnabled ? 'signed-out' : 'off');
  const [nickname, setNickname] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const keysRef = useRef<SyncKeys | null>(null);
  const pushTimer = useRef<number | null>(null);
  const lastPushed = useRef<ProgressState | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Restore the nickname so the sign-in form is pre-filled after a reload.
  useEffect(() => {
    if (!syncEnabled) return;
    const session = loadSession();
    if (session) setNickname(session.nickname);
  }, []);

  const pull = useCallback(async () => {
    const keys = keysRef.current;
    if (!keys) return;
    const record = await pullRecord(keys.accountId);
    if (!record) return;
    // A verifier change means the PIN was changed elsewhere; do not merge junk.
    if (record.verifier && record.verifier !== keys.verifier) return;

    const decrypted = await decryptPayload<unknown>(keys.cryptoKey, record.payload);
    if (decrypted && isProgressState(decrypted)) {
      applyRemote(decrypted);
    }
  }, [applyRemote]);

  const push = useCallback(async () => {
    const keys = keysRef.current;
    if (!keys) return;
    const current = stateRef.current;
    if (lastPushed.current && sameProgress(lastPushed.current, current)) return;

    const payload = await encryptPayload(keys.cryptoKey, current);
    await pushRecord(keys.accountId, keys.verifier, payload);
    lastPushed.current = current;
  }, []);

  /** Pull, merge, then push the merged result so both devices converge. */
  const syncCycle = useCallback(async () => {
    if (!keysRef.current) return;
    setStatus('syncing');
    setError(null);
    try {
      await pull();
      await push();
      setLastSyncedAt(Date.now());
      setStatus('synced');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof SyncError ? err.message : 'Sync failed. Your progress is still saved on this device.');
      setStatus('error');
    }
  }, [pull, push]);

  const signIn = useCallback(
    async (rawNickname: string, pin: string) => {
      const name = normalizeNickname(rawNickname);
      if (name.length < MIN_NICKNAME_LENGTH) {
        throw new Error(`Nickname must be at least ${MIN_NICKNAME_LENGTH} characters.`);
      }
      if (pin.length < MIN_PIN_LENGTH) {
        throw new Error(`PIN must be at least ${MIN_PIN_LENGTH} characters.`);
      }

      setStatus('connecting');
      setError(null);
      try {
        const keys = await deriveSyncKeys(name, pin);
        keysRef.current = keys;

        let remoteState: ProgressState | null = null;
        const record = await pullRecord(keys.accountId);
        if (record) {
          const wrongPin =
            (record.verifier && record.verifier !== keys.verifier) ||
            (await decryptPayload<unknown>(keys.cryptoKey, record.payload)) === null;
          if (wrongPin) {
            keysRef.current = null;
            setStatus('signed-out');
            throw new Error(
              'Wrong PIN for that nickname. Your progress is safe — check the PIN and try again, or pick a different nickname.',
            );
          }
          const decrypted = await decryptPayload<unknown>(keys.cryptoKey, record.payload);
          if (isProgressState(decrypted)) {
            remoteState = decrypted;
            applyRemote(decrypted);
          }
        }

        // applyRemote has already merged the remote copy into local state, but
        // that setState has not flushed yet, so merge explicitly for the push.
        const merged = remoteState
          ? mergeProgress(stateRef.current, remoteState)
          : stateRef.current;
        const payload = await encryptPayload(keys.cryptoKey, merged);
        await pushRecord(keys.accountId, keys.verifier, payload);
        lastPushed.current = merged;

        try {
          localStorage.setItem(
            SESSION_KEY,
            JSON.stringify({ nickname: name, syncId: keys.accountId } satisfies StoredSession),
          );
        } catch {
          // Session will not persist; sync still works for this visit.
        }

        setNickname(name);
        setLastSyncedAt(Date.now());
        setStatus('synced');
      } catch (err) {
        if (status !== 'signed-out') setStatus(keysRef.current ? 'error' : 'signed-out');
        const message =
          err instanceof SyncError || err instanceof Error
            ? err.message
            : 'Could not start syncing.';
        setError(message);
        throw new Error(message);
      }
    },
    [applyRemote, status],
  );

  const signOut = useCallback(() => {
    keysRef.current = null;
    lastPushed.current = null;
    setNickname(null);
    setLastSyncedAt(null);
    setError(null);
    setStatus(syncEnabled ? 'signed-out' : 'off');
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Nothing to clean up.
    }
  }, []);

  // Debounced push whenever local progress changes.
  useEffect(() => {
    if (!keysRef.current) return;
    if (pushTimer.current) window.clearTimeout(pushTimer.current);
    pushTimer.current = window.setTimeout(() => {
      void syncCycle();
    }, PUSH_DEBOUNCE_MS);
    return () => {
      if (pushTimer.current) window.clearTimeout(pushTimer.current);
    };
  }, [state, syncCycle]);

  // Periodic pull, plus a pull whenever the tab regains focus.
  useEffect(() => {
    if (!syncEnabled) return;
    const tick = () => {
      if (keysRef.current && document.visibilityState === 'visible') void syncCycle();
    };
    const id = window.setInterval(tick, PULL_INTERVAL_MS);
    window.addEventListener('focus', tick);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('focus', tick);
    };
  }, [syncCycle]);

  const value = useMemo<SyncContextValue>(
    () => ({
      enabled: syncEnabled,
      status,
      nickname,
      lastSyncedAt,
      error,
      signIn,
      signOut,
      syncNow: () => void syncCycle(),
    }),
    [status, nickname, lastSyncedAt, error, signIn, signOut, syncCycle],
  );

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}

export function useSync(): SyncContextValue {
  const ctx = useContext(SyncContext);
  if (!ctx) throw new Error('useSync must be used inside a SyncProvider');
  return ctx;
}

import { useEffect, useState } from 'react';
import { useSync, type SyncStatus } from '../sync/useSync';
import { MIN_NICKNAME_LENGTH, MIN_PIN_LENGTH } from '../sync/config';
import { Button, Callout, Card } from './ui';

const STATUS_TEXT: Record<SyncStatus, string> = {
  off: 'Sync is not set up for this site',
  'signed-out': 'Not syncing',
  connecting: 'Connecting…',
  syncing: 'Syncing…',
  synced: 'Synced',
  error: 'Sync problem',
};

const STATUS_STYLE: Record<SyncStatus, string> = {
  off: 'bg-sunken text-ink-3',
  'signed-out': 'bg-sunken text-ink-2',
  connecting: 'bg-brand-soft text-brand-text',
  syncing: 'bg-brand-soft text-brand-text',
  synced: 'bg-ok-soft text-ok-text',
  error: 'bg-bad-soft text-bad-text',
};

const STATUS_ICON: Record<SyncStatus, string> = {
  off: '○',
  'signed-out': '○',
  connecting: '⟳',
  syncing: '⟳',
  synced: '✓',
  error: '!',
};

function relativeTime(at: number): string {
  const seconds = Math.round((Date.now() - at) / 1000);
  if (seconds < 10) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return hours < 24 ? `${hours}h ago` : new Date(at).toLocaleDateString();
}

export function StatusPill() {
  const { status, lastSyncedAt } = useSync();
  const [, force] = useState(0);

  // Keep the "x min ago" label honest without re-rendering the whole page.
  useEffect(() => {
    const id = window.setInterval(() => force((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}
    >
      <span aria-hidden="true">{STATUS_ICON[status]}</span>
      {STATUS_TEXT[status]}
      {status === 'synced' && lastSyncedAt && (
        <span className="text-[0.95em] opacity-80">· {relativeTime(lastSyncedAt)}</span>
      )}
    </span>
  );
}

/**
 * Sign-in and status for cross-device sync.
 *
 * Renders nothing at all when no backend is configured for the build, so the
 * site keeps working exactly as a local-only app until sync is switched on.
 */
export function SyncPanel() {
  const { enabled, status, nickname, error, signIn, signOut, syncNow } = useSync();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (nickname) setName(nickname);
  }, [nickname]);

  if (!enabled) return null;

  const signedIn = status !== 'signed-out' && status !== 'off';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setBusy(true);
    try {
      await signIn(name, pin);
      setPin('');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not start syncing.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-ink">Sync across your devices</h2>
        <StatusPill />
      </div>

      {signedIn ? (
        <>
          <p className="text-sm text-ink-2">
            Signed in as <span className="font-semibold text-ink">{nickname}</span>. Your answers,
            saved questions and mistakes now follow you to any device where you enter the same
            nickname and PIN.
          </p>

          {error && (
            <div className="mt-3">
              <Callout tone="warn" title="Last sync did not go through">
                {error} Your progress is still safe on this device and will sync when the
                connection recovers.
              </Callout>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={syncNow} disabled={status === 'syncing'}>
              Sync now
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Stop syncing on this device
            </Button>
          </div>

          <p className="mt-3 text-xs text-ink-3">
            Stopping only signs out here. It does not delete anything.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-ink-2">
            Pick a nickname and a PIN. Enter the same pair on your phone or another computer and
            your progress follows you. No email, no real name, and nothing you type here is sent
            anywhere in readable form.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="sync-nickname" className="mb-1 block text-sm font-medium text-ink-2">
                  Nickname
                </label>
                <input
                  id="sync-nickname"
                  type="text"
                  value={name}
                  autoComplete="username"
                  spellCheck={false}
                  minLength={MIN_NICKNAME_LENGTH}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-brand"
                  placeholder="anything you will remember"
                />
              </div>
              <div>
                <label htmlFor="sync-pin" className="mb-1 block text-sm font-medium text-ink-2">
                  PIN
                </label>
                <input
                  id="sync-pin"
                  type="password"
                  value={pin}
                  autoComplete="current-password"
                  minLength={MIN_PIN_LENGTH}
                  required
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink placeholder:text-ink-3 focus:border-brand"
                  placeholder={`at least ${MIN_PIN_LENGTH} characters`}
                />
              </div>
            </div>

            {(formError ?? error) && (
              <p role="alert" className="text-sm font-medium text-bad-text">
                {formError ?? error}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={busy}>
                {busy ? 'Starting…' : 'Start syncing'}
              </Button>
              <span className="text-sm text-ink-3">Optional — the site works without it.</span>
            </div>
          </form>

          <p className="mt-4 text-xs leading-relaxed text-ink-3">
            Your progress is encrypted on your device before it is sent, so the server only ever
            stores unreadable data. That also means there is no PIN reset: if you forget it,
            the synced copy cannot be recovered.
          </p>
        </>
      )}
    </Card>
  );
}

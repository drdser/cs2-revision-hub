/**
 * Sync configuration.
 *
 * Both values are injected at build time. When either is missing the whole sync
 * feature stays switched off and the app behaves exactly as it did before:
 * progress lives in localStorage and never leaves the device.
 *
 * The anon key is a PUBLIC key by design. It ends up in the built JavaScript no
 * matter what, so it is not a secret. Access is controlled by the database
 * policies described in docs/SYNC-SETUP.md, not by hiding this string.
 */
const rawUrl = (import.meta.env.VITE_SYNC_URL ?? '').trim().replace(/\/+$/, '');
const rawKey = (import.meta.env.VITE_SYNC_ANON_KEY ?? '').trim();

export const SYNC_URL = rawUrl;
export const SYNC_ANON_KEY = rawKey;

/** True only when a backend has actually been configured for this build. */
export const syncEnabled = Boolean(SYNC_URL && SYNC_ANON_KEY);

/** How long to wait after the last change before pushing to the server. */
export const PUSH_DEBOUNCE_MS = 2000;

/** How often to pull, in addition to pulling on sign-in and on window focus. */
export const PULL_INTERVAL_MS = 60_000;

/** Minimum PIN length. Short PINs make a nickname's blob easier to attack. */
export const MIN_PIN_LENGTH = 6;
export const MIN_NICKNAME_LENGTH = 3;

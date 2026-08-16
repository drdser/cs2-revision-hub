/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the sync backend, e.g. https://xxxx.supabase.co */
  readonly VITE_SYNC_URL?: string;
  /** Public anon key for that backend. Not a secret; see src/sync/config.ts. */
  readonly VITE_SYNC_ANON_KEY?: string;
  /** Sub-path the site is served from, e.g. /cs2-revision-hub/ */
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

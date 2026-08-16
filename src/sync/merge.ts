import type { MockExamResult, ProgressState } from '../types';

/**
 * Merge two copies of a student's progress.
 *
 * Sync must never lose work. A student can answer questions on a laptop and on a
 * phone while offline, so "last device to sync wins" would silently discard
 * whichever session pushed first. Instead every field merges on its own terms:
 *
 *   - attempts    per question, the more recent attempt wins
 *   - bookmarks   union, because unstarring is rarer than starring and losing a
 *                 saved question is worse than keeping an extra one
 *   - mockResults union by identity, newest first, capped like the local store
 *
 * The function is pure and order-independent: merge(a, b) equals merge(b, a).
 */
export function mergeProgress(a: ProgressState, b: ProgressState): ProgressState {
  const winners: ProgressState['attempts'] = { ...a.attempts };
  for (const [id, remote] of Object.entries(b.attempts)) {
    const local = winners[id];
    if (!local || remote.at > local.at) winners[id] = remote;
  }

  // Rebuild in sorted key order so the result is canonical: merge(a, b) is then
  // byte-identical to merge(b, a), which keeps repeated syncs from churning.
  const attempts: ProgressState['attempts'] = {};
  const byId = (x: string, y: string) => (x < y ? -1 : x > y ? 1 : 0);
  for (const id of Object.keys(winners).sort(byId)) attempts[id] = winners[id];

  const bookmarks = [...new Set([...a.bookmarks, ...b.bookmarks])].sort(byId);

  const seen = new Map<string, MockExamResult>();
  for (const result of [...a.mockResults, ...b.mockResults]) {
    // id already encodes the paper; `at` separates two sittings of the same one.
    seen.set(`${result.id}@${result.at}`, result);
  }
  const mockResults = [...seen.values()].sort((x, y) => y.at - x.at).slice(0, 25);

  return { attempts, bookmarks, mockResults };
}

/** Cheap equality check so we can skip pushing when nothing actually changed. */
export function sameProgress(a: ProgressState, b: ProgressState): boolean {
  const aIds = Object.keys(a.attempts);
  const bIds = Object.keys(b.attempts);
  if (aIds.length !== bIds.length) return false;
  for (const id of aIds) {
    if (a.attempts[id]?.at !== b.attempts[id]?.at) return false;
    if (a.attempts[id]?.result !== b.attempts[id]?.result) return false;
  }
  if (a.bookmarks.length !== b.bookmarks.length) return false;
  const bSet = new Set(b.bookmarks);
  if (a.bookmarks.some((x) => !bSet.has(x))) return false;
  return a.mockResults.length === b.mockResults.length;
}

/** Guard against a malformed or truncated record from the server. */
export function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<ProgressState>;
  return (
    typeof v.attempts === 'object' &&
    v.attempts !== null &&
    Array.isArray(v.bookmarks) &&
    Array.isArray(v.mockResults)
  );
}

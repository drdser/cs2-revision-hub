/**
 * Unit tests for the sync merge, which is the part that can silently lose a
 * student's work if it is wrong.
 *
 * Run with: npm run test:merge
 */
import { isProgressState, mergeProgress, sameProgress } from '../src/sync/merge';
import type { MockExamResult, ProgressState } from '../src/types';

let failed = 0;
function check(name: string, ok: boolean, detail = '') {
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failed++;
}
const eq = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const mock = (id: string, at: number, score = 10): MockExamResult => ({
  id, at, score, total: 28, byChapter: {}, byType: {},
});

const empty: ProgressState = { attempts: {}, bookmarks: [], mockResults: [] };

console.log('\nmergeProgress');

// Attempts: newer wins, regardless of which side it is on.
{
  const laptop: ProgressState = {
    attempts: { 'mcq-09-01': { result: 'incorrect', at: 100 } },
    bookmarks: [], mockResults: [],
  };
  const phone: ProgressState = {
    attempts: { 'mcq-09-01': { result: 'correct', at: 200 } },
    bookmarks: [], mockResults: [],
  };
  check('newer attempt wins (a,b)', mergeProgress(laptop, phone).attempts['mcq-09-01'].result === 'correct');
  check('newer attempt wins (b,a)', mergeProgress(phone, laptop).attempts['mcq-09-01'].result === 'correct');
  check('older attempt never overwrites newer',
    mergeProgress(phone, laptop).attempts['mcq-09-01'].at === 200);
}

// Disjoint work from two devices is fully preserved.
{
  const laptop: ProgressState = {
    attempts: { a: { result: 'correct', at: 1 }, b: { result: 'incorrect', at: 2 } },
    bookmarks: ['x'], mockResults: [mock('m1', 10)],
  };
  const phone: ProgressState = {
    attempts: { c: { result: 'correct', at: 3 } },
    bookmarks: ['y'], mockResults: [mock('m2', 20)],
  };
  const merged = mergeProgress(laptop, phone);
  check('keeps attempts from both devices', Object.keys(merged.attempts).sort().join() === 'a,b,c');
  check('unions bookmarks', merged.bookmarks.sort().join() === 'x,y');
  check('keeps mock results from both', merged.mockResults.length === 2);
  check('mock results are newest first', merged.mockResults[0].at === 20);
}

// Order independence: the whole point, so a slow device cannot clobber a fast one.
{
  const a: ProgressState = {
    attempts: { p: { result: 'correct', at: 5 }, q: { result: 'incorrect', at: 9 } },
    bookmarks: ['b1'], mockResults: [mock('m1', 1)],
  };
  const b: ProgressState = {
    attempts: { q: { result: 'correct', at: 4 }, r: { result: 'correct', at: 7 } },
    bookmarks: ['b2', 'b1'], mockResults: [mock('m2', 3)],
  };
  const ab = mergeProgress(a, b);
  const ba = mergeProgress(b, a);
  ab.bookmarks.sort(); ba.bookmarks.sort();
  check('merge is order independent', eq(ab, ba));
}

// Idempotence: repeated syncs must not drift.
{
  const s: ProgressState = {
    attempts: { a: { result: 'correct', at: 1 } },
    bookmarks: ['x'], mockResults: [mock('m', 2)],
  };
  check('merging with itself changes nothing', eq(mergeProgress(s, s), s));
  check('merging twice is stable', eq(mergeProgress(mergeProgress(s, s), s), s));
}

// Empty sides.
{
  const s: ProgressState = {
    attempts: { a: { result: 'correct', at: 1 } }, bookmarks: ['x'], mockResults: [],
  };
  check('merging with empty keeps everything', eq(mergeProgress(s, empty), s));
  check('empty merged with state keeps everything', eq(mergeProgress(empty, s), s));
}

// Mock history is capped like the local store.
{
  const many: ProgressState = {
    attempts: {}, bookmarks: [],
    mockResults: Array.from({ length: 20 }, (_, i) => mock(`m${i}`, i)),
  };
  const more: ProgressState = {
    attempts: {}, bookmarks: [],
    mockResults: Array.from({ length: 20 }, (_, i) => mock(`n${i}`, 100 + i)),
  };
  const merged = mergeProgress(many, more);
  check('mock history capped at 25', merged.mockResults.length === 25, `${merged.mockResults.length}`);
  check('cap keeps the newest', merged.mockResults[0].at === 119);
}

// Same paper sat twice must not collapse into one entry.
{
  const s: ProgressState = {
    attempts: {}, bookmarks: [], mockResults: [mock('m1', 10, 12), mock('m1', 20, 25)],
  };
  check('two sittings of one paper are both kept', mergeProgress(s, empty).mockResults.length === 2);
}

console.log('\nsameProgress');
{
  const s: ProgressState = {
    attempts: { a: { result: 'correct', at: 1 } }, bookmarks: ['x'], mockResults: [],
  };
  check('identical states compare equal', sameProgress(s, { ...s }));
  check('different result detected',
    !sameProgress(s, { ...s, attempts: { a: { result: 'incorrect', at: 1 } } }));
  check('different timestamp detected',
    !sameProgress(s, { ...s, attempts: { a: { result: 'correct', at: 2 } } }));
  check('extra bookmark detected', !sameProgress(s, { ...s, bookmarks: ['x', 'y'] }));
  check('extra attempt detected',
    !sameProgress(s, { ...s, attempts: { ...s.attempts, b: { result: 'correct', at: 3 } } }));
}

console.log('\nisProgressState');
check('accepts a valid state', isProgressState(empty));
check('rejects null', !isProgressState(null));
check('rejects a string', !isProgressState('nope'));
check('rejects a truncated record', !isProgressState({ attempts: {} }));
check('rejects wrong field types', !isProgressState({ attempts: {}, bookmarks: 'x', mockResults: [] }));

console.log(failed ? `\n${failed} failed\n` : '\nAll merge tests passed.\n');
process.exit(failed ? 1 : 0);

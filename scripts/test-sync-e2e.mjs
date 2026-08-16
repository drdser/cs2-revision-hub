/**
 * End-to-end cross-device sync test.
 *
 * Uses two isolated browser contexts as two separate devices: separate
 * localStorage, separate memory, talking to the mock backend. This exercises the
 * real client code, real Web Crypto key derivation, real encryption and the real
 * merge, so a pass here means sync genuinely works.
 *
 * Usage:
 *   node scripts/mock-sync-server.mjs 4400 &
 *   VITE_SYNC_URL=http://localhost:4400 VITE_SYNC_ANON_KEY=test-anon-key npm run build
 *   npm run preview -- --port 4319 &
 *   node scripts/test-sync-e2e.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:4319';
const SYNC = process.env.SYNC_URL ?? 'http://localhost:4400';

let failed = 0;
const ok = (name, cond, detail = '') => {
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failed++;
};

const NICK = 'maya.k';
const PIN = 'hunter42';

async function newDevice(browser, label) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log(`  [${label}] pageerror: ${e.message}`));
  return { ctx, page, label };
}

const go = async (page, route) => {
  await page.goto(`${BASE}/#${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
};

async function signIn(page, nickname = NICK, pin = PIN) {
  await go(page, '/progress');
  await page.fill('#sync-nickname', nickname);
  await page.fill('#sync-pin', pin);
  await page.getByRole('button', { name: 'Start syncing' }).click();
  // Key derivation is 310k PBKDF2 rounds; give it room.
  await page.waitForTimeout(2500);
}

/** Answer the first question on a revision page, correctly or not. */
async function answerFirstTrueFalse(page, choice) {
  await go(page, '/revision/true-false');
  const card = page.locator('article').first();
  await card.getByRole('button', { name: choice }).click();
  await card.getByRole('button', { name: 'Check answer' }).click();
  await page.waitForTimeout(300);
}

async function bookmarkFirstMcq(page) {
  await go(page, '/revision/mcq');
  await page.locator('article').first().getByRole('button', { name: /Save question/ }).click();
  await page.waitForTimeout(200);
}

async function stats(page) {
  await go(page, '/progress');
  const text = await page.locator('#main-content').innerText();
  const grab = (label) => {
    const m = new RegExp(`${label}\\s*\\n\\s*(\\d+)`, 'i').exec(text);
    return m ? Number(m[1]) : -1;
  };
  return {
    attempted: grab('ATTEMPTED'),
    correct: grab('CORRECT'),
    saved: Number(/⭐\s*(\d+)\s*saved/.exec(text)?.[1] ?? -1),
  };
}

const browser = await chromium.launch({ channel: process.env.SMOKE_CHANNEL ?? 'chrome' });

console.log('\n1. Sync panel is visible when a backend is configured');
const laptop = await newDevice(browser, 'laptop');
await go(laptop.page, '/progress');
ok('Sync panel renders', (await laptop.page.locator('#sync-nickname').count()) === 1);
ok('Panel explains it is optional',
  (await laptop.page.locator('#main-content').innerText()).includes('works without it'));

console.log('\n2. Device A: work offline, then sign in');
await answerFirstTrueFalse(laptop.page, 'True');   // tf-09-01 is True -> correct
await bookmarkFirstMcq(laptop.page);
const beforeA = await stats(laptop.page);
ok('Device A recorded 1 attempt', beforeA.attempted === 1, JSON.stringify(beforeA));
ok('Device A recorded 1 bookmark', beforeA.saved === 1);

await signIn(laptop.page);
const statusA = await laptop.page.locator('#main-content').innerText();
ok('Device A reports Synced', /Synced/.test(statusA), statusA.split('\n').slice(0, 6).join(' | '));
ok('Device A shows the nickname', statusA.includes(NICK));

console.log('\n3. Device B: different browser profile, same nickname and PIN');
const phone = await newDevice(browser, 'phone');
const emptyB = await stats(phone.page);
ok('Device B starts empty', emptyB.attempted === 0, JSON.stringify(emptyB));

await signIn(phone.page);
const afterPull = await stats(phone.page);
ok('Device B pulled the attempt from A', afterPull.attempted === 1, JSON.stringify(afterPull));
ok('Device B pulled the bookmark from A', afterPull.saved === 1);

console.log('\n4. Work done on B flows back to A');
await answerFirstTrueFalse(phone.page, 'False');  // tf-09-01 answered again, now wrong
await go(phone.page, '/revision/output');
const outCard = phone.page.locator('article').first();
await outCard.locator('textarea').fill('nonsense');
await outCard.getByRole('button', { name: 'Check answer' }).click();
await phone.page.waitForTimeout(3000);            // let the debounced push fire

await go(laptop.page, '/progress');
await laptop.page.waitForTimeout(500);
await laptop.page.getByRole('button', { name: 'Sync now' }).click();
await laptop.page.waitForTimeout(2000);
const afterB = await stats(laptop.page);
ok('Device A now has both attempts', afterB.attempted === 2, JSON.stringify(afterB));

console.log('\n5. The newer answer wins, not the last device to sync');
// A answered tf-09-01 correctly first; B answered it incorrectly later.
await go(laptop.page, '/mistakes');
const mistakesText = await laptop.page.locator('#main-content').innerText();
ok('Later (incorrect) answer overwrote the earlier correct one',
  /question(s)? to fix/.test(mistakesText), mistakesText.slice(0, 90).replace(/\n/g, ' | '));

console.log('\n6. Wrong PIN is rejected and does not clobber the record');
const impostor = await newDevice(browser, 'impostor');
await signIn(impostor.page, NICK, 'totallywrong');
const impostorText = await impostor.page.locator('#main-content').innerText();
ok('Wrong PIN shows a clear error', /wrong pin for that nickname/i.test(impostorText),
  impostorText.slice(0, 120).replace(/\n/g, ' | '));
ok('Wrong PIN does not sign in', (await impostor.page.locator('#sync-nickname').count()) === 1);

// The genuine device must still be able to read its data afterwards.
const rescue = await newDevice(browser, 'rescue');
await signIn(rescue.page, NICK, PIN);
const rescued = await stats(rescue.page);
ok('Correct PIN still reads the record after a failed attempt', rescued.attempted === 2,
  JSON.stringify(rescued));
await impostor.ctx.close();
await rescue.ctx.close();

console.log('\n7. The server never sees readable progress');
const raw = await laptop.page.evaluate(async (syncUrl) => {
  // Re-derive nothing: just read what the client stored, using the same session id.
  const session = JSON.parse(localStorage.getItem('cs2hub.sync.session.v1') ?? '{}');
  const res = await fetch(`${syncUrl}/rest/v1/rpc/sync_pull`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: 'test-anon-key', Authorization: 'Bearer test-anon-key' },
    body: JSON.stringify({ p_id: session.syncId }),
  });
  return { id: session.syncId, rows: await res.json() };
}, SYNC);
const stored = JSON.stringify(raw.rows);
ok('A record exists on the server', stored.length > 50);
ok('Stored blob contains no question ids', !stored.includes('tf-09-01') && !stored.includes('mcq-'));
ok('Stored blob contains no readable JSON keys',
  !stored.includes('attempts') && !stored.includes('bookmarks'));
ok('Sync id does not leak the nickname', !raw.id.toLowerCase().includes('maya'), raw.id);

console.log('\n8. Direct table access is refused');
const direct = await laptop.page.evaluate(async (syncUrl) => {
  const res = await fetch(`${syncUrl}/rest/v1/progress?select=*`, {
    headers: { apikey: 'test-anon-key', Authorization: 'Bearer test-anon-key' },
  });
  return res.status;
}, SYNC);
ok('Cannot dump the table with the public key', direct === 401 || direct === 403, `status ${direct}`);

console.log('\n9. Signing out is local only');
await go(laptop.page, '/progress');
await laptop.page.getByRole('button', { name: 'Stop syncing on this device' }).click();
await laptop.page.waitForTimeout(400);
const afterSignOut = await stats(laptop.page);
ok('Progress survives signing out', afterSignOut.attempted === 2, JSON.stringify(afterSignOut));
ok('Sign-in form returns', (await laptop.page.locator('#sync-nickname').count()) === 1);

console.log('\n10. Server outage degrades gracefully');
const offline = await newDevice(browser, 'offline');
await offline.page.route('**/rest/v1/rpc/**', (route) => route.abort());
await signIn(offline.page, 'other.student', 'pin12345');
const offlineText = await offline.page.locator('#main-content').innerText();
ok('Shows a sync error rather than crashing', /could not reach|sync failed|sync problem/i.test(offlineText),
  offlineText.slice(0, 120).replace(/\n/g, ' | '));
await answerFirstTrueFalse(offline.page, 'True');
const offlineStats = await stats(offline.page);
ok('Local progress still works with the server down', offlineStats.attempted === 1,
  JSON.stringify(offlineStats));
await offline.ctx.close();

await laptop.ctx.close();
await phone.ctx.close();
await browser.close();

console.log(failed ? `\n${failed} failed\n` : '\nCross-device sync verified.\n');
process.exit(failed ? 1 : 0);

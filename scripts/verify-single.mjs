/**
 * Verify the single-file bundle works with zero external requests.
 * Run after: npm run build && npm run bundle
 */
import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';

const FILE = resolve('dist-single/cs2-revision-hub.html');
const url = pathToFileURL(FILE).href;
const src = readFileSync(FILE, 'utf-8');

// A host that stamps a theme puts the attribute in the served markup.
const stamp = (theme) => {
  const p = resolve(`dist-single/_stamp-${theme}.html`);
  writeFileSync(p, src.replace('<html lang="en">', `<html lang="en" data-theme="${theme}">`));
  return pathToFileURL(p).href;
};

let fails = 0;
const ok = (n, c, d = '') => {
  console.log(`  ${c ? 'ok  ' : 'FAIL'} ${n}${d ? ` — ${d}` : ''}`);
  if (!c) fails++;
};

const b = await chromium.launch({ channel: process.env.SMOKE_CHANNEL ?? 'chrome' });
const errs = [];
const external = [];

const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
p.on('request', (r) => {
  const u = r.url();
  if (!u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u);
});

await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
ok('App mounts from a single file', (await p.locator('#main-content').count()) === 1);
ok('Root div lives in the body', (await p.evaluate(() => document.getElementById('root')?.parentElement?.tagName)) === 'BODY');
ok('Home renders', (await p.locator('#main-content').innerText()).includes('CS2 Final Exam Revision Hub'));
ok('301 questions reported', (await p.locator('#main-content').innerText()).includes('301'));

await p.goto(`${url}#/output-practice`, { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
ok('Hash routing works offline', (await p.locator('article').count()) === 34);
ok('Syntax highlighting renders', (await p.locator('.tok-keyword').count()) > 20);

// The decisive check: multi-line template literals in the bundle must be intact.
const first = p.locator('article').first();
await first.locator('textarea').fill(
  'Rex the Beagle barks loudly\nRex eats only dog food\nLuna the Husky barks loudly\nLuna eats only dog food',
);
await first.getByRole('button', { name: 'Check answer' }).click();
await p.waitForTimeout(400);
const badge = (await first.locator('span').allInnerTexts()).filter((t) => /correct/i.test(t)).join('');
ok('Exact output grades as Correct (data strings intact)', badge.includes('Correct') && !badge.includes('Incorrect'), badge.replace(/\n/g, ' '));

const codeText = await p.locator('article').first().locator('pre code').first().innerText();
ok('Java code keeps its original indentation', codeText.includes('    public static void main'));

await p.goto(`${url}#/mock-exam`, { waitUntil: 'networkidle' });
await p.waitForTimeout(400);
await p.getByRole('button', { name: 'Start exam' }).click();
await p.waitForTimeout(500);
ok('Mock exam generates a paper', (await p.locator('article').count()) === 28);
await ctx.close();

for (const theme of ['dark', 'light']) {
  const c = await b.newContext({ colorScheme: theme === 'dark' ? 'light' : 'dark' });
  const pg = await c.newPage();
  await pg.goto(stamp(theme), { waitUntil: 'networkidle' });
  await pg.waitForTimeout(400);
  const info = await pg.evaluate(() => ({
    dark: document.documentElement.classList.contains('dark'),
    bg: getComputedStyle(document.body).backgroundColor,
  }));
  ok(`Honors host data-theme="${theme}" over the opposite OS setting`, info.dark === (theme === 'dark'), info.bg);
  ok(`Body paints an explicit ${theme} ground`, info.bg !== 'rgba(0, 0, 0, 0)');
  await c.close();
  unlinkSync(resolve(`dist-single/_stamp-${theme}.html`));
}

const c4 = await b.newContext({ viewport: { width: 390, height: 844 } });
const p4 = await c4.newPage();
await p4.goto(`${url}#/revision/output`, { waitUntil: 'networkidle' });
await p4.waitForTimeout(500);
const ov = await p4.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
ok('No horizontal overflow on mobile', ov <= 1, `${ov}px`);
await c4.close();

ok('Zero external network requests', external.length === 0, external.join(', '));
ok('No console errors', errs.length === 0, errs.join(' | '));

await b.close();
console.log(fails ? `\n${fails} failed\n` : '\nSingle-file bundle verified.\n');
process.exit(fails ? 1 : 0);

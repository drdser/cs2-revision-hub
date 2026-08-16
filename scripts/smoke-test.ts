/**
 * End-to-end smoke test.
 *
 * Loads every route in a real browser, fails on any console error or uncaught
 * exception, then drives the core interactions: answering an MCQ, a true/false
 * and an output question, bookmarking, dark mode, the mock exam, and the
 * mobile layout.
 *
 * Usage:
 *   npm run build && npm run preview -- --port 4319
 *   npx tsx scripts/smoke-test.ts
 */
import { chromium, type ConsoleMessage, type Page } from 'playwright';

const BASE = process.env.SMOKE_BASE ?? 'http://localhost:4319';

const ROUTES = [
  ['/', 'CS2 Final Exam Revision Hub'],
  ['/revision', 'Full Revision Question Bank'],
  ['/revision/mcq', 'Multiple Choice'],
  ['/revision/true-false', 'True / False'],
  ['/revision/fill-blank', 'Fill in the Blank'],
  ['/revision/code-completion', 'Code Completion'],
  ['/revision/programming', 'Programming'],
  ['/chapter/9', 'Chapter 9'],
  ['/chapter/10', 'Chapter 10'],
  ['/chapter/11', 'Chapter 11'],
  ['/chapter/15', 'Chapter 15'],
  ['/chapter/12', 'Chapter 12'],
  ['/expected', 'Expected Final Questions'],
  ['/must-study', 'Must Study Before the Final'],
  ['/traps', 'Common Exam Traps'],
  ['/cheat-sheet', 'Final Cheat Sheet'],
  ['/mock-exam', 'Mock Final Exam'],
  ['/quick-practice', 'Quick Practice'],
  ['/output-practice', 'Output Practice'],
  ['/coding-practice', 'Coding Practice'],
  ['/saved', 'Saved Questions'],
  ['/mistakes', 'My Mistakes'],
  ['/progress', 'Progress'],
  ['/does-not-exist', 'Page not found'],
] as const;

const failures: string[] = [];
const passes: string[] = [];

function check(name: string, ok: boolean, detail = '') {
  if (ok) {
    passes.push(name);
    console.log(`  ok   ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

async function goto(page: Page, route: string) {
  await page.goto(`${BASE}/#${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(120);
}

async function main() {
  // Use the system Chrome so the test does not depend on a downloaded browser.
  // Override with SMOKE_CHANNEL=chromium once `npx playwright install` has run.
  const channel = process.env.SMOKE_CHANNEL ?? 'chrome';
  const browser = await chromium.launch(channel === 'chromium' ? {} : { channel });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const consoleErrors: string[] = [];
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

  console.log('\n1. Route rendering');
  for (const [route, expected] of ROUTES) {
    await goto(page, route);
    const body = await page.locator('#main-content').innerText();
    check(`${route} renders "${expected}"`, body.includes(expected));
  }

  console.log('\n2. Question bank content');
  await goto(page, '/revision/mcq');
  const mcqCards = await page.locator('article').count();
  check('MCQ page renders question cards', mcqCards > 50, `${mcqCards} cards`);

  await goto(page, '/output-practice');
  const outCards = await page.locator('article').count();
  check('Output practice renders 34 cards', outCards === 34, `${outCards} cards`);
  const codeBlocks = await page.locator('pre code').count();
  check('Output questions show highlighted code', codeBlocks >= 34, `${codeBlocks} blocks`);

  console.log('\n3. Answering an MCQ (correct path)');
  await goto(page, '/revision/mcq');
  const firstMcq = page.locator('article').first();
  // mcq-09-01: the correct answer is choice A ("super").
  await firstMcq.locator('input[type="radio"]').first().check();
  await firstMcq.getByRole('button', { name: 'Check answer' }).click();
  await page.waitForTimeout(150);
  check(
    'Correct MCQ shows the Correct badge',
    (await firstMcq.innerText()).includes('Correct'),
  );
  check(
    'Correct MCQ reveals an explanation',
    /explanation/i.test(await firstMcq.innerText()),
  );

  console.log('\n4. Answering a true/false (incorrect path)');
  await goto(page, '/revision/true-false');
  const firstTf = page.locator('article').first();
  // tf-09-01 is True, so clicking False must be marked incorrect.
  await firstTf.getByRole('button', { name: 'False' }).click();
  await firstTf.getByRole('button', { name: 'Check answer' }).click();
  await page.waitForTimeout(150);
  const tfText = await firstTf.innerText();
  check('Wrong true/false shows Incorrect', tfText.includes('Incorrect'));
  check('Wrong true/false reveals correct answer', tfText.includes('Correct answer'));

  console.log('\n5. Output question grading');
  await goto(page, '/output-practice');
  const firstOut = page.locator('article').first();
  await firstOut.locator('textarea').fill(
    'Rex the Beagle barks loudly\nRex eats only dog food\nLuna the Husky barks loudly\nLuna eats only dog food',
  );
  await firstOut.getByRole('button', { name: 'Check answer' }).click();
  await page.waitForTimeout(150);
  const outText = await firstOut.innerText();
  check('Exact output is graded correct', outText.includes('Correct') && !outText.includes('Incorrect'));
  check('Output question shows the execution trace', /execution trace/i.test(outText));

  console.log('\n6. Progress tracking persists');
  await goto(page, '/progress');
  const progressText = await page.locator('#main-content').innerText();
  // innerText applies the CSS uppercase transform, so match case-insensitively.
  check(
    'Progress page counts the attempts',
    /attempted[^0-9]{0,12}3\b/i.test(progressText),
    progressText.slice(0, 160).replaceAll('\n', ' | '),
  );
  await goto(page, '/mistakes');
  check(
    'Mistakes page lists the wrong answer',
    (await page.locator('#main-content').innerText()).includes('question to fix'),
  );

  console.log('\n7. Bookmarks');
  await goto(page, '/revision/mcq');
  await page.locator('article').first().getByRole('button', { name: /Save question/ }).click();
  await page.waitForTimeout(120);
  await goto(page, '/saved');
  check(
    'Saved page shows the bookmarked question',
    (await page.locator('article').count()) === 1,
  );

  console.log('\n8. Filters and search');
  await goto(page, '/revision');
  const beforeFilter = await page.locator('article').count();
  await page.getByRole('button', { name: 'Chapter 15' }).first().click();
  await page.waitForTimeout(200);
  const afterFilter = await page.locator('article').count();
  check('Chapter filter narrows the list', afterFilter > 0 && afterFilter < beforeFilter);
  await page.locator('#question-search').fill('mkdir');
  await page.waitForTimeout(250);
  const searched = await page.locator('article').count();
  check('Search narrows further', searched > 0 && searched < afterFilter, `${searched} results`);

  console.log('\n9. Dark mode');
  await goto(page, '/');
  await page.getByRole('button', { name: /Switch to dark mode/ }).click();
  await page.waitForTimeout(200);
  check(
    'Dark class applied to <html>',
    await page.evaluate(() => document.documentElement.classList.contains('dark')),
  );
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check('Body has an explicit dark background', darkBg !== 'rgba(0, 0, 0, 0)', darkBg);
  await page.reload({ waitUntil: 'networkidle' });
  check(
    'Dark mode survives a reload',
    await page.evaluate(() => document.documentElement.classList.contains('dark')),
  );
  await page.getByRole('button', { name: /Switch to light mode/ }).click();
  await page.waitForTimeout(150);

  console.log('\n10. Mock exam end to end');
  await goto(page, '/mock-exam');
  await page.getByRole('button', { name: 'Start exam' }).click();
  await page.waitForTimeout(300);
  const examCards = await page.locator('article').count();
  check('Mock exam draws 28 questions', examCards === 28, `${examCards} questions`);
  const examBody = await page.locator('#main-content').innerText();
  check('Exam mode hides explanations', !examBody.includes('Explanation'));
  // Answer the first few, then submit.
  await page.locator('article').first().locator('button', { hasText: 'True' }).first().click();
  await page.waitForTimeout(100);
  await page.getByRole('button', { name: 'Submit exam' }).first().click();
  await page.waitForTimeout(400);
  const resultBody = await page.locator('#main-content').innerText();
  check('Results page shows a score', /\/28/.test(resultBody));
  check('Results page breaks down by chapter', /by chapter/i.test(resultBody));
  check('Review reveals explanations', /explanation/i.test(resultBody));
  check('Unanswered questions are marked', resultBody.includes('Not answered'));

  console.log('\n11. Programming hint gating');
  await goto(page, '/coding-practice');
  const firstProg = page.locator('article').first();
  check(
    'Solution hidden until requested',
    (await firstProg.locator('pre code').count()) === 0,
  );
  await firstProg.getByRole('button', { name: 'Show hint' }).click();
  await page.waitForTimeout(120);
  check('Hint appears', /hint/i.test(await firstProg.innerText()));
  await firstProg.getByRole('button', { name: 'Show solution' }).click();
  await page.waitForTimeout(200);
  check(
    'Solution code block appears',
    (await firstProg.locator('pre code').count()) > 0,
  );
  check(
    'Solution carries its explanation',
    /explanation/i.test(await firstProg.innerText()),
  );

  console.log('\n12. Reset progress');
  await goto(page, '/progress');
  await page.getByRole('button', { name: 'Reset progress' }).click();
  await page.waitForTimeout(120);
  await page.getByRole('button', { name: 'Yes, reset everything' }).click();
  await page.waitForTimeout(200);
  await goto(page, '/saved');
  check(
    'Reset clears bookmarks',
    (await page.locator('#main-content').innerText()).includes('have not saved any'),
  );

  console.log('\n13. Mobile layout (390x844)');
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mobile.newPage();
  mpage.on('pageerror', (err) => consoleErrors.push(`mobile pageerror: ${err.message}`));
  await mpage.goto(`${BASE}/#/revision/output`, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(300);
  const overflow = await mpage.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check('No horizontal page overflow on mobile', overflow <= 1, `${overflow}px overflow`);
  const preScrolls = await mpage.evaluate(() => {
    const pres = Array.from(document.querySelectorAll('pre'));
    return pres.some((p) => p.scrollWidth > p.clientWidth);
  });
  check('Wide code blocks scroll inside their own container', preScrolls);

  await mpage.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
  await mpage.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await mpage.waitForTimeout(250);
  check(
    'Mobile menu opens the sidebar',
    await mpage.locator('#sidebar-nav').getByRole('link', { name: 'Mock Final' }).isVisible(),
  );
  await mobile.close();

  console.log('\n14. Console cleanliness');
  const realErrors = consoleErrors.filter((e) => !e.includes('favicon'));
  check('No console errors or uncaught exceptions', realErrors.length === 0, realErrors.join(' | '));

  await browser.close();

  console.log(`\n${passes.length} passed, ${failures.length} failed`);
  if (failures.length) {
    console.error('\nFailures:');
    for (const f of failures) console.error(`  x ${f}`);
    process.exit(1);
  }
  console.log('Smoke test passed.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

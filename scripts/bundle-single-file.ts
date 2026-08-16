/**
 * Bundle the built site into one self-contained HTML file.
 *
 * Inlines the CSS and the JS so the page has zero external requests, which is
 * what a strict-CSP static host (and the Artifact viewer) requires.
 *
 * Usage:
 *   npm run build
 *   npm run bundle            -> dist-single/cs2-revision-hub.html
 *   npm run bundle -- --body  -> emits body-only markup for hosts that supply
 *                                their own <html>/<head>/<body> wrapper
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');
const OUT_DIR = join(ROOT, 'dist-single');
const bodyOnly = process.argv.includes('--body');

const assets = readdirSync(join(DIST, 'assets'));
const cssFile = assets.find((f) => f.endsWith('.css'));
const jsFile = assets.find((f) => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('No built assets found. Run `npm run build` first.');
  process.exit(1);
}

const css = readFileSync(join(DIST, 'assets', cssFile), 'utf-8');
const js = readFileSync(join(DIST, 'assets', jsFile), 'utf-8');
const html = readFileSync(join(DIST, 'index.html'), 'utf-8');

// A literal </script> anywhere in the bundle would close the inline tag early.
const escapeForInlineScript = (source: string) =>
  source.replaceAll('</script', String.raw`<\/script`);

// Pull the pre-paint theme script out of the built head so it keeps running
// before the app mounts.
const themeScript = /<script>([\s\S]*?)<\/script>/.exec(html)?.[1] ?? '';

// Never reformat or re-indent these blocks. The bundle keeps multi-line template
// literals verbatim (every `code` and `expectedOutput` string in the question
// bank is one), so adding even a single leading space per line silently rewrites
// the data and breaks answer comparison.
const inlined = `<title>CS2 Final Exam Revision Hub</title>
<meta name="description" content="CS2 Final Exam Revision Hub - Chapters 9-15. 301 practice questions, Java output tracing, exam predictions and a timed mock final." />
<style>
${css}
</style>
<script>${escapeForInlineScript(themeScript)}</script>
<div id="root"></div>
<script type="module">
${escapeForInlineScript(js)}
</script>
`;

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%93%98%3C/text%3E%3C/svg%3E";

const standalone = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" href="${FAVICON}" />
<title>CS2 Final Exam Revision Hub</title>
<meta name="description" content="CS2 Final Exam Revision Hub - Chapters 9-15. 301 practice questions, Java output tracing, exam predictions and a timed mock final." />
<style>
${css}
</style>
<script>${escapeForInlineScript(themeScript)}</script>
</head>
<body>
<div id="root"></div>
<script type="module">
${escapeForInlineScript(js)}
</script>
</body>
</html>
`;

mkdirSync(OUT_DIR, { recursive: true });
const outPath = join(OUT_DIR, bodyOnly ? 'cs2-revision-hub.body.html' : 'cs2-revision-hub.html');
const output = bodyOnly ? inlined : standalone;
writeFileSync(outPath, output, 'utf-8');

const kb = (n: number) => `${(n / 1024).toFixed(0)} kB`;
console.log(`\nSingle-file bundle written`);
console.log(`  ${outPath}`);
console.log(`  css ${kb(css.length)}  js ${kb(js.length)}  total ${kb(output.length)}`);
console.log(`  external requests: 0\n`);

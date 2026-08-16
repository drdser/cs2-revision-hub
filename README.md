# CS2 Final Exam Revision Hub

### ▶ [drdser.github.io/cs2-revision-hub](https://drdser.github.io/cs2-revision-hub/)

An open-source revision website for the CS2 final exam, covering **Chapters 9–15**.
No install, no account — students just open the link.

301 questions across six formats, chapter notes, ranked exam predictions, a timed
mock final, and a condensed cheat sheet. No account, no server, no analytics —
progress lives in the student's own browser.

> This is a **student revision resource**, not an official course document. It was
> built from the course review sheet, the lecture material and previous exam
> papers. The predictions are study priorities, not a guarantee.

---

## What's inside

| Area | What it gives you |
|---|---|
| **Full Revision** | The whole bank in six sections (A–F) by question type, filterable by chapter, difficulty and status |
| **Chapter pages** | Quick revision, key keywords, must-know rules, common mistakes, exam traps and practice for Chapters 9, 10, 11 and 15 |
| **🔥 Expected Final** | Topics ranked Very High / High / Medium with the evidence behind each ranking, plus a 39-question "Most Likely Final Set" |
| **🚨 Must Study** | Every concept ranked Priority A / B / C with the question style it usually takes |
| **🧪 Mock Final** | A 28-question timed paper matching the shape of the review sheet, with score breakdown and answer review |
| **🖥️ Output Practice** | 34 code-tracing questions filterable by topic, each with a step-by-step execution trace |
| **💻 Coding Practice** | 19 programming tasks in three size bands, each gated behind a hint before the solution |
| **⚡ Quick Practice** | 5 / 10 / 20 questions, exam-level only, weak areas, or random output |
| **⭐ Saved / ❌ Mistakes / 📊 Progress** | Bookmarks, a re-drill list of wrong answers, and accuracy by chapter and type |
| **🪤 Exam Traps / 📄 Cheat Sheet** | 26 worked traps and a 12-section sheet you can read in 10–15 minutes |

### Question bank

| Section | Type | Count |
|---|---|---|
| A | Multiple Choice | 104 |
| B | True / False | 86 |
| C | Output / Code Tracing | 34 |
| D | Fill in the Blank | 28 |
| E | Code Completion | 30 |
| F | Programming | 19 |
| | **Total** | **301** |

By chapter: Chapter 9 — 68 · Chapter 10 — 79 · Chapter 11 — 83 · Chapter 15 — 71.

---

## How the content was built

Sources were weighted, not treated equally:

1. **The current final review sheet** is the primary reference for exam style,
   wording, difficulty and the balance between theory and programming.
2. **The lecture decks** for Chapters 9, 10, 11 and 15 are the source of truth for
   technical content.
3. **Previous exam papers and old question collections** are used as evidence of
   repetition, to rank the predictions — never to override the current review sheet.

Two rules shaped what did and did not go in:

- **Nothing was invented for missing chapters.** No lecture material was supplied
  for Chapters 12, 13 or 14, and no question on the review sheet or any past paper
  maps to them. Those chapter pages say so plainly instead of being filled with
  generic Java content.
- **Old answer keys were not trusted blindly.** Where an old solution conflicted
  with the lectures or with actual Java behaviour, it was corrected before the
  concept was used. Old questions that fall outside the current Chapter 9–15 scope
  (linked lists, recursion) were excluded from the bank.

### Answer verification

Every output-tracing question and every programming solution in this repository
**was compiled and executed on JDK 21** while the bank was written. The
`expectedOutput` values are the real console output, not a prediction. The four
questions whose answer is "Compilation error" were confirmed by running `javac`
and reading the reported error.

`npm run validate` enforces the rest: unique ids, in-range MCQ answers, every
`correctAnswer` present in its own `acceptedAnswers`, every prediction pointing at
a question that exists, no near-duplicate prompts, and no "very high" confidence
claim that rests on the lectures alone.

---

## Getting started

Requires **Node.js 20.19+** (or 22.12+).

```bash
git clone https://github.com/drdser/cs2-revision-hub.git
cd cs2-revision-hub
npm install
npm run dev
```

Open the URL that Vite prints (usually <http://localhost:5173>).

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint |
| `npm run validate` | Audit the question bank for integrity errors |
| `npm run check` | `validate` + `lint` + `build` — run this before committing |
| `npm run smoke` | Full browser test of every page and interaction (see below) |
| `npm run bundle` | Inline everything into one self-contained HTML file |
| `npm run verify:single` | Prove that single file works offline with zero requests |

### Running the browser smoke test

The smoke test loads all 24 routes in a real browser, fails on any console error,
and drives the core flows: answering each question type, bookmarking, filtering,
dark mode, the full mock exam, and the mobile layout.

```bash
npm run build
npm run preview -- --port 4319   # in one terminal
npm run smoke                    # in another
```

It uses your system Chrome by default. If you would rather use Playwright's own
browser, run `npx playwright install chromium` and then `SMOKE_CHANNEL=chromium npm run smoke`.

---

## Deployment

The app is a fully static site with no backend. It uses `HashRouter`, so deep
links such as `/#/expected` work on any static host without rewrite rules.

### Vercel

```bash
npm i -g vercel
vercel
```

Vercel detects Vite automatically. `vercel.json` is included with the right build
settings and cache headers. Nothing else to configure.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

`netlify.toml` is included with the build command and publish directory set.

### GitHub Pages

**This repository is already deployed this way** — every push to `main` rebuilds
and republishes automatically.

A workflow at `.github/workflows/deploy.yml` handles it. To set the same thing up
on a fork:

1. Push the repository to GitHub.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow handles the rest.

The base path is handled for you: the workflow sets `VITE_BASE_PATH` to
`/<repo-name>/`, which `vite.config.ts` reads. To build a Pages bundle locally:

```bash
VITE_BASE_PATH=/cs2-revision-hub/ npm run build
```

On Windows, Git Bash rewrites the leading `/` into a Windows path, so prefix the
command with `MSYS_NO_PATHCONV=1` (or use PowerShell: `$env:VITE_BASE_PATH="/cs2-revision-hub/"; npm run build`).
Check `dist/index.html` afterwards — the asset paths should start with your repo name.

Your students then open `https://<username>.github.io/<repo-name>/`.

---

## Project structure

```
src/
  components/
    questions/          McqBody, TrueFalseBody, TextAnswerBody,
                        ProgrammingBody, QuestionCard
    Badges.tsx          Difficulty, chapter, type, confidence, result
    CodeBlock.tsx       Java syntax highlighting, horizontal scroll
    FilterBar.tsx       Chapter / type / difficulty / status / search
    Layout.tsx          Sidebar navigation, theme toggle, mobile drawer
    ui.tsx              Button, Card, PageHeader, ProgressBar, Callout
  data/
    questions/          mcq, trueFalse, output, fillBlank,
                        codeCompletion, programming
    chapters.ts         Notes, keywords, rules, mistakes, traps
    predictions.ts      Ranked predictions + Most Likely Final Set
    mustStudy.ts        Priority A / B / C concepts
    traps.ts            Worked exam traps
    cheatSheet.ts       Condensed study sheet
  hooks/
    useProgress.tsx     localStorage-backed attempts, bookmarks, mocks
    useTheme.tsx        Light / dark preference
  pages/                One file per route
  types/                Question data model
  utils/
    highlight.ts        Display-only Java lexer
    grading.ts          Answer comparison
    filters.ts          Filtering + seeded shuffle
    labels.ts           Display strings
scripts/
  validate-bank.ts      Question-bank integrity check
  smoke-test.ts         Browser end-to-end test
```

### Adding a question

Append it to the matching file in `src/data/questions/`, give it a unique id
following the existing pattern, then run `npm run validate`. The data model is in
`src/types/index.ts`.

For an output question, **run the program first** and paste the real output. The
validator will not catch a wrong expected output — only a human running `javac`
will.

---

## Accessibility and privacy

- Semantic HTML, a skip link, keyboard-navigable controls, `aria-pressed` on
  toggles and `aria-live` on result counts.
- Correct and incorrect are shown with a word and an icon as well as a colour,
  so the result never depends on colour alone.
- Code blocks scroll inside their own container; the page never scrolls sideways.
- No account, no tracking, no analytics, no network requests after load. Progress
  is stored under `cs2hub.progress.v1` in `localStorage` and can be wiped from the
  Progress page.

## Tech stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · React Router 7.
No backend, no database, no runtime dependencies beyond React.

## Contributing

Corrections to questions are especially welcome. If you find an answer that is
wrong, open an issue with the question id (shown in the search index) and the
reasoning. Run `npm run check` before opening a pull request.

## License

[MIT](LICENSE).

Course slides and exam papers belong to their respective authors and are **not**
redistributed here. The questions and summaries in this repository are original
material written from that source, not copies of it.

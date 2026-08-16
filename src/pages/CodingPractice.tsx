import { programmingQuestions } from '../data/questions';
import { SCALE_HINT, SCALE_LABEL } from '../utils/labels';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Callout, PageHeader, SectionHeading } from '../components/ui';

const SCALES = ['short', 'medium', 'full'] as const;

export function CodingPractice() {
  return (
    <>
      <PageHeader
        icon="💻"
        title="Coding Practice"
        subtitle="Exam-style programming tasks, grouped by size. Every solution here was compiled and run, and the expected output is the real console output where the program is deterministic."
      />

      <div className="mb-6">
        <Callout>
          Attempt each task on paper first, then open the hint. The solution stays hidden behind
          its own button so you are not reading the answer before you have tried.
        </Callout>
      </div>

      {SCALES.map((scale) => {
        const items = programmingQuestions.filter((q) => q.scale === scale);
        if (items.length === 0) return null;

        return (
          <section key={scale} aria-labelledby={`scale-${scale}`} className="mb-10">
            <SectionHeading id={`scale-${scale}`} count={items.length}>
              {SCALE_LABEL[scale]}
            </SectionHeading>
            <p className="mb-4 text-sm text-ink-2">{SCALE_HINT[scale]}</p>
            <div className="space-y-4">
              {items.map((q, i) => (
                <QuestionCard key={q.id} question={q} index={i + 1} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

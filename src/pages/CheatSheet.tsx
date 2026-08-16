import { cheatSheet } from '../data/cheatSheet';
import { CodeBlock } from '../components/CodeBlock';
import { Callout, Card, PageHeader } from '../components/ui';

export function CheatSheet() {
  return (
    <>
      <PageHeader
        icon="📄"
        title="Final Cheat Sheet"
        subtitle="Everything condensed into one pass you can read in 10 to 15 minutes: the syntax, the rules that get tested, and the formatting details that decide output questions."
      />

      <div className="mb-6">
        <Callout tone="warn">
          This is a study sheet for revision, not something to take into the exam.
        </Callout>
      </div>

      <div className="space-y-6">
        {cheatSheet.map((section) => (
          <Card key={section.id} as="section" className="p-4 sm:p-5">
            <h2 className="mb-3 text-lg font-semibold text-ink">{section.title}</h2>
            <dl className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-semibold text-ink">{item.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-2">
                    {item.detail}
                    {item.code && <CodeBlock code={item.code} className="mt-2" />}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </>
  );
}

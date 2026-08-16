import { Link } from 'react-router-dom';
import type { MustStudyItem, Priority } from '../types';
import { priorityA, priorityB, priorityC } from '../data/mustStudy';
import { PRIORITY_LABEL, TYPE_LABEL } from '../utils/labels';
import { ChapterBadge } from '../components/Badges';
import { Card, PageHeader, SectionHeading } from '../components/ui';

const GROUPS: { priority: Priority; items: MustStudyItem[]; blurb: string }[] = [
  {
    priority: 'A',
    items: priorityA,
    blurb:
      'On the current review sheet and emphasised in the lectures, or repeated across several previous papers. Do not walk into the exam without these.',
  },
  {
    priority: 'B',
    items: priorityB,
    blurb:
      'Strong supporting evidence from the lectures or the past papers, but not on the current review sheet itself.',
  },
  {
    priority: 'C',
    items: priorityC,
    blurb:
      'Covered in the lectures and worth a quick look if you have the time, but with the weakest exam signal.',
  },
];

const PRIORITY_STYLE: Record<Priority, string> = {
  A: 'border-l-4 border-l-bad',
  B: 'border-l-4 border-l-warn',
  C: 'border-l-4 border-l-brand',
};

function ItemCard({ item }: { item: MustStudyItem }) {
  return (
    <Card as="li" className={`p-4 sm:p-5 ${PRIORITY_STYLE[item.priority]}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <ChapterBadge chapter={item.chapter} />
        <Link
          to={`/chapter/${item.chapter}`}
          className="text-xs font-medium text-brand-text hover:underline"
        >
          Open chapter notes →
        </Link>
      </div>

      <h3 className="text-[15px] font-semibold text-ink sm:text-base">{item.concept}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{item.whyItMatters}</p>

      <p className="mt-3 text-xs text-ink-3">
        <span className="font-semibold uppercase tracking-wide">Likely question styles: </span>
        {item.likelyStyles.map((t) => TYPE_LABEL[t]).join(' • ')}
      </p>
    </Card>
  );
}

export function MustStudy() {
  return (
    <>
      <PageHeader
        icon="🚨"
        title="Must Study Before the Final"
        subtitle="Every concept in the exam scope, ranked by how much evidence there is that it will appear, with the question style it usually takes."
      />

      {GROUPS.map((group) => (
        <section
          key={group.priority}
          aria-labelledby={`priority-${group.priority}`}
          className="mb-10"
        >
          <SectionHeading id={`priority-${group.priority}`} count={group.items.length}>
            {PRIORITY_LABEL[group.priority]}
          </SectionHeading>
          <p className="mb-4 max-w-3xl text-sm text-ink-2">{group.blurb}</p>
          <ul className="grid gap-3 lg:grid-cols-2">
            {group.items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

import { useMemo, useState } from 'react';
import type { Confidence, Prediction } from '../types';
import {
  highPredictions,
  mediumPredictions,
  mostLikelyQuestionIds,
  veryHighPredictions,
} from '../data/predictions';
import { getQuestion } from '../data/questions';
import { CONFIDENCE_LABEL, TYPE_LABEL } from '../utils/labels';
import { ChapterBadge, ConfidenceBadge } from '../components/Badges';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Button, Card, PageHeader, SectionHeading } from '../components/ui';

function PredictionCard({ prediction }: { prediction: Prediction }) {
  const [open, setOpen] = useState(false);
  const questions = useMemo(
    () => prediction.questionIds.map(getQuestion).filter((q) => q !== undefined),
    [prediction.questionIds],
  );

  return (
    <Card as="li" className="p-4 sm:p-5">
      <div className="mb-2.5 flex flex-wrap items-center gap-2">
        <ConfidenceBadge confidence={prediction.confidence} />
        <ChapterBadge chapter={prediction.chapter} />
      </div>

      <h3 className="text-[15px] font-semibold text-ink sm:text-base">{prediction.topic}</h3>

      <dl className="mt-3 space-y-1.5 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-ink-3">Likely question types:</dt>
          <dd className="text-ink-2">
            {prediction.likelyTypes.map((t) => TYPE_LABEL[t]).join(', ')}
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-ink-3">Evidence:</dt>
          <dd className="text-ink-2">{prediction.evidence.join(' • ')}</dd>
        </div>
        <div>
          <dt className="font-medium text-ink-3">Reason:</dt>
          <dd className="mt-0.5 leading-relaxed text-ink-2">{prediction.reason}</dd>
        </div>
      </dl>

      {questions.length > 0 && (
        <>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? 'Hide' : `Practise this (${questions.length})`}
          </Button>

          {open && (
            <div className="animate-reveal mt-4 space-y-4 border-t border-line pt-4">
              {questions.map((q, i) => (
                <QuestionCard key={q.id} question={q} index={i + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
}

const GROUPS: { confidence: Confidence; items: Prediction[]; blurb: string }[] = [
  {
    confidence: 'very-high',
    items: veryHighPredictions,
    blurb:
      'On the current review sheet AND emphasised in the lectures, or repeated across several previous papers. If you study nothing else, study these.',
  },
  {
    confidence: 'high',
    items: highPredictions,
    blurb:
      'Strong candidates with several supporting signals, usually a repeated past-paper question or a heavily emphasised lecture topic.',
  },
  {
    confidence: 'medium',
    items: mediumPredictions,
    blurb:
      'Reasonable possibilities based on how much space the lectures give them, but with no direct evidence from an exam paper.',
  },
];

export function Expected() {
  const mostLikely = useMemo(
    () => mostLikelyQuestionIds.map(getQuestion).filter((q) => q !== undefined),
    [],
  );

  return (
    <>
      <PageHeader
        icon="🔥"
        title="Expected Final Questions"
        subtitle="Topics ranked by how strongly the supplied material points at them. Each card names the evidence behind the ranking and opens into the bank questions that drill it."
      />

      {/* ------------------------------------------------- most likely set */}
      <section aria-labelledby="most-likely-heading" className="mb-10">
        <SectionHeading id="most-likely-heading" count={mostLikely.length}>
          Most Likely Final Set
        </SectionHeading>
        <p className="mb-4 max-w-3xl text-sm text-ink-2">
          The strongest predicted questions, mixed across every question type and sized to be
          worked through in one sitting. This is the page to open the night before the exam.
        </p>
        <div className="space-y-4">
          {mostLikely.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i + 1} />
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- ranked topics */}
      {GROUPS.map((group) => (
        <section
          key={group.confidence}
          aria-labelledby={`group-${group.confidence}`}
          className="mb-10"
        >
          <SectionHeading id={`group-${group.confidence}`} count={group.items.length}>
            {CONFIDENCE_LABEL[group.confidence]} confidence
          </SectionHeading>
          <p className="mb-4 max-w-3xl text-sm text-ink-2">{group.blurb}</p>
          <ul className="space-y-4">
            {group.items.map((p) => (
              <PredictionCard key={p.id} prediction={p} />
            ))}
          </ul>
        </section>
      ))}

      <p className="mt-8 border-t border-line pt-5 text-sm text-ink-3">
        Predictions are based on the provided review material, lecture content, and historical
        exam patterns. They are study priorities, not a guarantee of the actual final exam
        questions.
      </p>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { QuestionCard } from '../components/questions/QuestionCard';
import { Button, EmptyState, PageHeader } from '../components/ui';

export function Saved() {
  const { bookmarkedQuestions } = useProgress();

  return (
    <>
      <PageHeader
        icon="⭐"
        title="Saved Questions"
        subtitle="Everything you flagged with the star. Saved questions stay in this browser until you unstar them or reset your progress."
      />

      {bookmarkedQuestions.length === 0 ? (
        <EmptyState
          title="You have not saved any questions yet."
          hint="Use the ☆ button in the top-right corner of any question card to flag it for later."
        />
      ) : (
        <>
          <div className="mb-4">
            <Link to="/revision">
              <Button variant="secondary" size="sm">
                Find more questions
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {bookmarkedQuestions.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i + 1} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

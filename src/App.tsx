import { Link, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Revision } from './pages/Revision';
import { ChapterPage } from './pages/ChapterPage';
import { Expected } from './pages/Expected';
import { MustStudy } from './pages/MustStudy';
import { Traps } from './pages/Traps';
import { CheatSheet } from './pages/CheatSheet';
import { MockExam } from './pages/MockExam';
import { QuickPractice } from './pages/QuickPractice';
import { OutputPractice } from './pages/OutputPractice';
import { CodingPractice } from './pages/CodingPractice';
import { Saved } from './pages/Saved';
import { Mistakes } from './pages/Mistakes';
import { Progress } from './pages/Progress';
import { Button, EmptyState, PageHeader } from './components/ui';

function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" />
      <EmptyState title="That page does not exist in this hub." />
      <div className="mt-5">
        <Link to="/">
          <Button variant="secondary">Back to the dashboard</Button>
        </Link>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="revision" element={<Revision />} />
        <Route path="revision/:type" element={<Revision />} />
        <Route path="chapter/:n" element={<ChapterPage />} />
        <Route path="expected" element={<Expected />} />
        <Route path="must-study" element={<MustStudy />} />
        <Route path="traps" element={<Traps />} />
        <Route path="cheat-sheet" element={<CheatSheet />} />
        <Route path="mock-exam" element={<MockExam />} />
        <Route path="quick-practice" element={<QuickPractice />} />
        <Route path="output-practice" element={<OutputPractice />} />
        <Route path="coding-practice" element={<CodingPractice />} />
        <Route path="saved" element={<Saved />} />
        <Route path="mistakes" element={<Mistakes />} />
        <Route path="progress" element={<Progress />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

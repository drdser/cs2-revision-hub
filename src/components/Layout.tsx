import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { coveredChapters } from '../data/chapters';
import { CHAPTER_TITLE } from '../utils/labels';

interface NavItem {
  to: string;
  label: string;
  icon?: string;
}

const PRIMARY: NavItem[] = [{ to: '/', label: 'Home', icon: '🏠' }];

const REVISION: NavItem[] = [
  { to: '/revision', label: 'All Questions' },
  { to: '/revision/mcq', label: 'Multiple Choice' },
  { to: '/revision/true-false', label: 'True / False' },
  { to: '/output-practice', label: 'Output Questions' },
  { to: '/revision/code-completion', label: 'Code Completion' },
  { to: '/coding-practice', label: 'Programming' },
];

const STUDY: NavItem[] = [
  { to: '/expected', label: 'Expected Final', icon: '🔥' },
  { to: '/must-study', label: 'Must Study', icon: '🚨' },
  { to: '/traps', label: 'Exam Traps', icon: '🪤' },
  { to: '/cheat-sheet', label: 'Cheat Sheet', icon: '📄' },
];

const PRACTICE: NavItem[] = [
  { to: '/mock-exam', label: 'Mock Final', icon: '🧪' },
  { to: '/quick-practice', label: 'Quick Practice', icon: '⚡' },
  { to: '/saved', label: 'Saved Questions', icon: '⭐' },
  { to: '/mistakes', label: 'My Mistakes', icon: '❌' },
  { to: '/progress', label: 'Progress', icon: '📊' },
];

function linkClass({ isActive }: { isActive: boolean }): string {
  return `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-brand-soft font-semibold text-brand-text'
      : 'text-ink-2 hover:bg-sunken hover:text-ink'
  }`;
}

function NavGroup({
  title,
  items,
  onNavigate,
}: {
  title?: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="mb-4">
      {title && (
        <p className="mb-1.5 px-3 text-xs font-semibold uppercase tracking-wide text-ink-3">
          {title}
        </p>
      )}
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.to === '/'} className={linkClass} onClick={onNavigate}>
              {item.icon && (
                <span aria-hidden="true" className="w-4 text-center">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-lg border border-line px-3 py-1.5 text-sm text-ink-2 transition-colors hover:bg-sunken hover:text-ink"
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
      <span className="ml-1.5 hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer and scroll to top whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const chapterItems: NavItem[] = coveredChapters.map((ch) => ({
    to: `/chapter/${ch}`,
    label: `Chapter ${ch} - ${CHAPTER_TITLE[ch]}`,
  }));

  const close = () => setMenuOpen(false);

  const nav = (
    <nav aria-label="Main navigation" className="px-3 pb-8 pt-4">
      <NavGroup items={PRIMARY} onNavigate={close} />
      <NavGroup title="Revision" items={REVISION} onNavigate={close} />
      <NavGroup title="Chapters" items={chapterItems} onNavigate={close} />
      <NavGroup title="Exam Focus" items={STUDY} onNavigate={close} />
      <NavGroup title="Practice & Progress" items={PRACTICE} onNavigate={close} />
    </nav>
  );

  return (
    <div className="min-h-screen bg-page">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      {/* ------------------------------------------------------------ top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[100rem] items-center gap-3 px-3 sm:px-5">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="sidebar-nav"
            aria-label="Toggle navigation menu"
            className="rounded-lg border border-line px-2.5 py-1.5 text-ink-2 transition-colors hover:bg-sunken lg:hidden"
          >
            <span aria-hidden="true">☰</span>
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span aria-hidden="true" className="text-lg">
              📘
            </span>
            <span className="truncate font-semibold text-ink">CS2 Final Exam Revision Hub</span>
          </Link>

          <span className="ml-auto hidden text-sm text-ink-3 md:inline">Chapters 9–15</span>
          <div className="ml-auto md:ml-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[100rem]">
        {/* ------------------------------------------------------- sidebar */}
        <aside
          id="sidebar-nav"
          className={`fixed inset-y-0 left-0 top-14 z-20 w-72 overflow-y-auto border-r border-line bg-card transition-transform lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {nav}
        </aside>

        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={close}
            className="fixed inset-0 top-14 z-10 bg-black/30 lg:hidden"
          />
        )}

        {/* ---------------------------------------------------------- main */}
        <main id="main-content" className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>

          <footer className="mx-auto mt-16 max-w-5xl border-t border-line pt-6 text-sm text-ink-3">
            <p>
              An open-source student revision resource for the CS2 final exam, covering
              Chapters 9–15. Progress is stored only in this browser.
            </p>
            <p className="mt-1.5">
              Built from the course review sheet, lecture material and previous exam papers.
              Not an official course document.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

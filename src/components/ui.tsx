import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover disabled:bg-brand/50 disabled:hover:bg-brand/50',
  secondary:
    'border border-line-strong bg-card text-ink hover:bg-sunken disabled:opacity-50',
  ghost: 'text-ink-2 hover:bg-sunken hover:text-ink disabled:opacity-50',
  danger: 'border border-bad/40 bg-bad-soft text-bad-text hover:bg-bad/20',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const sizing = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed ${sizing} ${VARIANT[variant]} ${className}`}
    />
  );
}

export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  return (
    <Tag
      className={`rounded-xl border border-line bg-card shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function PageHeader({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {icon && (
          <span aria-hidden="true" className="text-2xl sm:text-3xl">
            {icon}
          </span>
        )}
        {title}
      </h1>
      {subtitle && <p className="mt-2 max-w-3xl text-ink-2">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </header>
  );
}

export function SectionHeading({
  children,
  count,
  id,
}: {
  children: ReactNode;
  count?: number;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="mb-3 flex flex-wrap items-baseline gap-2 text-lg font-semibold text-ink sm:text-xl"
    >
      {children}
      {count !== undefined && (
        <span className="text-sm font-normal text-ink-3">
          {count} question{count === 1 ? '' : 's'}
        </span>
      )}
    </h2>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <Card className="p-8 text-center">
      <p className="font-medium text-ink">{title}</p>
      {hint && <p className="mt-1.5 text-sm text-ink-2">{hint}</p>}
    </Card>
  );
}

export function ProgressBar({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
      className="h-2 w-full overflow-hidden rounded-full bg-sunken"
    >
      <div
        className="h-full rounded-full bg-brand transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn';
  title?: string;
  children: ReactNode;
}) {
  const style =
    tone === 'warn'
      ? 'border-warn/40 bg-warn-soft text-warn-text'
      : 'border-brand/30 bg-brand-soft text-brand-text';
  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${style}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}

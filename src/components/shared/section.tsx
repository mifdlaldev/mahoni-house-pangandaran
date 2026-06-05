// Section: Consistent vertical padding + max-w-7xl container for all page sections.
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

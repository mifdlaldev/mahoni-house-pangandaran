// IconWrapper: Span wrapper that aligns Phosphor icons consistently inside inline layouts.
import { cn } from '@/lib/utils';

type IconProps = {
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
};

export function IconWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export type { IconProps };

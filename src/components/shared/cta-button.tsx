// CtaButton: Polymorphic CTA link with 3 variants × 2 sizes. Always uses Link (or <a> if external).
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  external?: boolean;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-forest-700 text-cream-50 hover:bg-forest-900 active:scale-[0.97]',
  secondary:
    'border border-forest-700/30 bg-cream-50 text-forest-900 hover:border-forest-700 hover:bg-cream-100 active:scale-[0.97]',
  ghost:
    'text-forest-700 underline-offset-4 hover:underline',
};

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function CtaButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  external = false,
  className,
}: CtaButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50',
    'min-h-[44px]',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {withArrow && <ArrowRight size={16} weight="regular" />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow && <ArrowRight size={16} weight="regular" />}
    </Link>
  );
}

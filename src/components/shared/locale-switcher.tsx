'use client';

import { useState } from 'react';
import { Globe } from '@phosphor-icons/react/dist/ssr';
import { usePathname, useRouter, type Locale } from '@/i18n/routing';

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);

  const targetLocale: Locale = currentLocale === 'id' ? 'en' : 'id';

  const handleSwitch = () => {
    setIsPending(true);
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <button
      onClick={handleSwitch}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-cream-50/90 transition-colors hover:bg-cream-50/10 disabled:opacity-50"
      aria-label={`Switch to ${targetLocale === 'id' ? 'Indonesian' : 'English'}`}
    >
      <Globe size={16} weight="regular" aria-hidden="true" />
      <span className="uppercase tracking-wider">{currentLocale}</span>
    </button>
  );
}

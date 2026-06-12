'use client';

import { useTranslations } from 'next-intl';
import {
  GithubLogo,
  LinkedinLogo,
  Briefcase,
  Globe,
} from '@phosphor-icons/react/dist/ssr';

const CONNECT_ICONS = {
  github: GithubLogo,
  linkedin: LinkedinLogo,
  fiverr: Briefcase,
  website: Globe,
} as const;

const connectLinks: {
  id: keyof typeof CONNECT_ICONS;
  label: string;
  href: string;
}[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/mifdlaldev/mahoni-house-pangandaran',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mifdlal-tsaqib-alfarras/',
  },
  {
    id: 'fiverr',
    label: 'Fiverr',
    href: 'https://www.fiverr.com/mifdlal_afs',
  },
  {
    id: 'website',
    label: 'Website',
    href: 'https://www.mtadevworks.web.id/',
  },
];

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="border-t border-forest-900/10 bg-cream-100 px-6 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-1 lg:text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer font-display text-2xl tracking-tight text-forest-900 transition-colors hover:text-forest-700 lg:mx-auto"
            >
              Mahoni House
            </button>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600 lg:mx-auto">
              {t('tagline')}
            </p>
          </div>

          <div className="lg:text-center">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-wood-700">
              {t('contact')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li className="leading-relaxed">Pangandaran, West Java</li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-forest-700"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:mifdlaltsaqibalf26@outlook.com"
                  className="transition-colors hover:text-forest-700"
                >
                  mifdlaltsaqibalf26@outlook.com
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:text-center">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-wood-700">
              {t('connect')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              {connectLinks.map((link) => {
                const Icon = CONNECT_ICONS[link.id];
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-forest-700 lg:justify-center"
                    >
                      <Icon size={16} weight="regular" className="shrink-0 text-forest-700" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </footer>

      <div className="border-t border-forest-900/10 bg-cream-200/60 px-6 py-5 text-center text-xs text-ink-500">
        <p>{t('copyright').replace('2026', String(year))}</p>
        <p className="mt-1">
          Developed by{' '}
          <a
            href="https://www.mtadevworks.web.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-forest-700 transition-colors hover:text-forest-900"
          >
            Mifdlal Tsaqib Alfarras
          </a>
        </p>
      </div>
    </>
  );
}

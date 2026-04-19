import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { getAllServiceSlugs } from '@/lib/data/services';

const STATIC_PATHS = ['', '/services', '/about', '/contact', '/faq'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const buildAlternates = (path: string) => ({
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${base}/${l}${path}`]),
    ),
  });

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/services' ? 0.9 : 0.7,
        alternates: buildAlternates(path),
      });
    }

    for (const slug of getAllServiceSlugs()) {
      const path = `/services/${slug}`;
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: buildAlternates(path),
      });
    }
  }

  return entries;
}

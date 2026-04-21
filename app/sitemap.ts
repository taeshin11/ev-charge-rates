import { MetadataRoute } from 'next';
import networks from '@/data/networks-fallback.json';
import vehicles from '@/data/vehicles-fallback.json';
import states from '@/data/states-fallback.json';

const BASE_URL = 'https://ev-charge-rates.vercel.app';
const LOCALES = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Networks index
    entries.push({
      url: `${BASE_URL}/${locale}/networks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Network detail pages
    for (const network of networks) {
      entries.push({
        url: `${BASE_URL}/${locale}/networks/${network.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    // Vehicles index
    entries.push({
      url: `${BASE_URL}/${locale}/vehicles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Vehicle detail pages
    for (const vehicle of vehicles) {
      entries.push({
        url: `${BASE_URL}/${locale}/vehicles/${vehicle.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // States index
    entries.push({
      url: `${BASE_URL}/${locale}/states`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // State detail pages
    for (const state of states) {
      entries.push({
        url: `${BASE_URL}/${locale}/states/${state.abbr.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // Calculator
    entries.push({
      url: `${BASE_URL}/${locale}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Content pages
    for (const slug of ['about', 'how-to-use', 'privacy', 'terms']) {
      entries.push({
        url: `${BASE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}

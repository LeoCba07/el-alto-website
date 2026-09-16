import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { client } from '@/sanity/lib/client'
import { sitemapLastModifiedQuery } from '@/sanity/lib/queries'

// Rebuilt hourly, so lastModified follows Studio edits without a deploy.
export const revalidate = 3600

type LastModified = Partial<Record<'home' | 'unidades' | 'precios' | 'servicios' | 'faq' | 'config', string | null>>

// The most recent of the given edit dates; undefined when Sanity has none.
function latest(...dates: (string | null | undefined)[]): Date | undefined {
  const times = dates.filter((d): d is string => !!d).map((d) => new Date(d).getTime())
  return times.length ? new Date(Math.max(...times)) : undefined
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.BASE_URL
  const edited = await client.fetch<LastModified>(sitemapLastModifiedQuery).catch((): LastModified => ({}))

  return [
    {
      url: baseUrl,
      lastModified: latest(edited.home, edited.config),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/unidades`,
      lastModified: latest(edited.unidades),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/precios`,
      lastModified: latest(edited.precios),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: latest(edited.servicios, edited.config),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: latest(edited.config),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consultas-frecuentes`,
      lastModified: latest(edited.faq),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/normas`,
      lastModified: latest(edited.config),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacidad`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}

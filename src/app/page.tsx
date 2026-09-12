import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import FeaturedUnidades from '@/components/FeaturedUnidades'
import ServicesHighlights from '@/components/ServicesHighlights'
import LocationTeaser from '@/components/LocationTeaser'
import Testimonials from '@/components/Testimonials'
import VideosSection from '@/components/VideosSection'
import FinalCTA from '@/components/FinalCTA'
import SectionIndicator from '@/components/SectionIndicator'
import { client } from '@/sanity/lib/client'
import { heroSectionQuery, configuracionSitioQuery, unidadesDestacadasQuery, serviciosDestacadosQuery, testimoniosQuery, videosInicioQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { youtubeId, youtubeThumbnail } from '@/lib/youtube'
import { SiteConfig } from '@/lib/types'
import type { TestimonialsProps } from '@/components/Testimonials'

type Testimonio = NonNullable<TestimonialsProps['testimonios']>[number]

// Force dynamic rendering to show Sanity updates immediately
export const dynamic = 'force-dynamic'

interface SanityHeroSection {
  subtitulo?: string
  titulo?: string
  descripcion?: string
  imagenes?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
}

interface SanityUnidadesDestacadas {
  fotos?: Array<{ asset: { _ref: string }; alt?: string }>
  insignia?: string
  tituloPanelInfo?: string
  descripcionPanelInfo?: string
}

interface ServicioDestacado {
  _id: string
  nombre: string
  descripcion: string
  detalle?: string
  imagen?: {
    asset: { _ref: string }
    alt?: string
  }
}

interface SanityVideo {
  _key: string
  titulo?: string
  url?: string
  fechaPublicacion?: string
  descripcion?: string
}

// Each read fails on its own: a hiccup in one section's query shouldn't throw
// the others away and put the whole homepage on its fallbacks.
async function fetchOr<T>(query: string, fallback: T): Promise<T> {
  try {
    return (await client.fetch<T | null>(query)) ?? fallback
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch home data:', error)
    }
    return fallback
  }
}

async function getHomeData() {
  const [heroData, config, unidadesDestacadas, serviciosDestacados, testimonios, videos] = await Promise.all([
    fetchOr<SanityHeroSection | null>(heroSectionQuery, null),
    fetchOr<SiteConfig | null>(configuracionSitioQuery, null),
    fetchOr<SanityUnidadesDestacadas | null>(unidadesDestacadasQuery, null),
    fetchOr<ServicioDestacado[]>(serviciosDestacadosQuery, []),
    fetchOr<Testimonio[]>(testimoniosQuery, []),
    fetchOr<SanityVideo[]>(videosInicioQuery, []),
  ])
  return { heroData, config, unidadesDestacadas, serviciosDestacados, testimonios, videos }
}

export default async function Home() {
  const { heroData, config, unidadesDestacadas, serviciosDestacados, testimonios, videos: sanityVideos } = await getHomeData()

  const heroProps = heroData ? {
    subtitulo: heroData.subtitulo,
    titulo: heroData.titulo,
    descripcion: heroData.descripcion,
    imagenes: heroData.imagenes?.map(img => ({
      // Ask for a landscape crop so Sanity honours each image's hotspot.
      // Without explicit dimensions it returns the full asset and the hotspot
      // is ignored, leaving object-cover to centre-crop portrait shots blindly.
      url: urlFor(img).width(1920).height(1080).fit('crop').url(),
      alt: img.alt
    })),
  } : {}

  const unidadesDestacadasProps = unidadesDestacadas ? {
    // Ask Sanity for the carousel's 16:10 crop. Without dimensions it returns
    // the original -- up to 12000x9000 here -- for Next to resize on every miss.
    fotos: unidadesDestacadas.fotos?.map(img => ({ url: urlFor(img).width(1600).height(1000).fit('crop').url(), alt: img.alt })),
    insignia: unidadesDestacadas.insignia,
    tituloPanelInfo: unidadesDestacadas.tituloPanelInfo,
    descripcionPanelInfo: unidadesDestacadas.descripcionPanelInfo,
  } : {}

  const highlightsProps = serviciosDestacados.length > 0
    ? {
        highlights: serviciosDestacados.map(s => ({
          image: s.imagen ? urlFor(s.imagen).width(800).height(600).url() : '/images/placeholder.jpg',
          title: s.nombre,
          description: s.descripcion,
        })),
      }
    : {}

  // No hardcoded fallback: with nothing in Sanity the section simply isn't rendered.
  const videos = await Promise.all(
    sanityVideos
      .flatMap(v => {
        const id = youtubeId(v.url)
        return id && v.titulo ? [{ id, titulo: v.titulo, descripcion: v.descripcion, fechaPublicacion: v.fechaPublicacion }] : []
      })
      .map(async v => ({ ...v, thumb: await youtubeThumbnail(v.id) }))
  )

  const videosJsonLd = videos.map(v => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.titulo,
    description: v.descripcion || v.titulo,
    thumbnailUrl: v.thumb,
    uploadDate: v.fechaPublicacion,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
  }))

  return (
    <div className="min-h-screen">
      <SectionIndicator hasVideos={videos.length > 0} />
      <section id="hero">
        <Hero {...heroProps} />
      </section>
      <section id="trust-signals">
        <TrustSignals stats={config?.estadisticas} />
      </section>
      <section id="unidades">
        <FeaturedUnidades {...unidadesDestacadasProps} />
      </section>
      <section id="servicios">
        <ServicesHighlights {...highlightsProps} />
      </section>
      <section id="ubicacion">
        <LocationTeaser />
      </section>
      <section id="testimonios">
        <Testimonials testimonios={testimonios} tripAdvisorRating={config?.estadisticas?.tripAdvisorRating} />
      </section>
      {videos.length > 0 && (
        <section id="videos">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(videosJsonLd).replace(/</g, '\\u003c') }}
          />
          <VideosSection videos={videos} channelUrl={config?.redesSociales?.youtube} />
        </section>
      )}
      <section id="contacto">
        <FinalCTA />
      </section>
    </div>
  )
}

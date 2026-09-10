import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import FeaturedUnidades from '@/components/FeaturedUnidades'
import ServicesHighlights from '@/components/ServicesHighlights'
import LocationTeaser from '@/components/LocationTeaser'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import SectionIndicator from '@/components/SectionIndicator'
import { client } from '@/sanity/lib/client'
import { heroSectionQuery, configuracionSitioQuery, unidadesDestacadasQuery, serviciosDestacadosQuery, testimoniosQuery, atraccionesCercanasQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { SiteConfig } from '@/lib/types'
import type { TestimonialsProps } from '@/components/Testimonials'
import type { LocationTeaserProps } from '@/components/LocationTeaser'

type Testimonio = NonNullable<TestimonialsProps['testimonios']>[number]
type Atraccion = NonNullable<LocationTeaserProps['atracciones']>[number]

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

async function getHomeData() {
  try {
    const [heroData, config, unidadesDestacadas, serviciosDestacados, testimonios, atracciones] = await Promise.all([
      client.fetch<SanityHeroSection | null>(heroSectionQuery),
      client.fetch<SiteConfig | null>(configuracionSitioQuery),
      client.fetch<SanityUnidadesDestacadas | null>(unidadesDestacadasQuery),
      client.fetch<ServicioDestacado[]>(serviciosDestacadosQuery),
      client.fetch<Testimonio[]>(testimoniosQuery),
      client.fetch<Atraccion[]>(atraccionesCercanasQuery),
    ])
    return {
      heroData,
      config,
      unidadesDestacadas,
      serviciosDestacados: serviciosDestacados || [],
      testimonios: testimonios || [],
      atracciones: atracciones || [],
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch home data:', error)
    }
    return { heroData: null, config: null, unidadesDestacadas: null, serviciosDestacados: [], testimonios: [], atracciones: [] }
  }
}

export default async function Home() {
  const { heroData, config, unidadesDestacadas, serviciosDestacados, testimonios, atracciones } = await getHomeData()

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

  return (
    <div className="min-h-screen">
      <SectionIndicator />
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
        <LocationTeaser atracciones={atracciones} />
      </section>
      <section id="testimonios">
        <Testimonials testimonios={testimonios} />
      </section>
      <section id="contacto">
        <FinalCTA />
      </section>
    </div>
  )
}

import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import FeaturedUnidades from '@/components/FeaturedUnidades'
import ServicesHighlights from '@/components/ServicesHighlights'
import LocationTeaser from '@/components/LocationTeaser'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import SectionIndicator from '@/components/SectionIndicator'
import { client } from '@/sanity/lib/client'
import { heroSectionQuery, configuracionSitioQuery, unidadesDestacadasQuery, serviciosDestacadosQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { SiteConfig } from '@/lib/types'

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
  fotos?: Array<{ asset: { _ref: string } }>
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
    const [heroData, config, unidadesDestacadas, serviciosDestacados] = await Promise.all([
      client.fetch<SanityHeroSection | null>(heroSectionQuery),
      client.fetch<SiteConfig | null>(configuracionSitioQuery),
      client.fetch<SanityUnidadesDestacadas | null>(unidadesDestacadasQuery),
      client.fetch<ServicioDestacado[]>(serviciosDestacadosQuery),
    ])
    return { heroData, config, unidadesDestacadas, serviciosDestacados: serviciosDestacados || [] }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch home data:', error)
    }
    return { heroData: null, config: null, unidadesDestacadas: null, serviciosDestacados: [] }
  }
}

export default async function Home() {
  const { heroData, config, unidadesDestacadas, serviciosDestacados } = await getHomeData()

  const heroProps = heroData ? {
    subtitulo: heroData.subtitulo,
    titulo: heroData.titulo,
    descripcion: heroData.descripcion,
    imagenes: heroData.imagenes?.map(img => ({
      url: urlFor(img).url(),
      alt: img.alt
    })),
  } : {}

  const unidadesDestacadasProps = unidadesDestacadas ? {
    fotos: unidadesDestacadas.fotos?.map(img => urlFor(img).url()),
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
        <LocationTeaser />
      </section>
      <section id="testimonios">
        <Testimonials />
      </section>
      <section id="contacto">
        <FinalCTA />
      </section>
    </div>
  )
}

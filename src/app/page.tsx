import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import FeaturedCabanas from '@/components/FeaturedCabanas'
import ServicesHighlights from '@/components/ServicesHighlights'
import LocationTeaser from '@/components/LocationTeaser'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import SectionIndicator from '@/components/SectionIndicator'
import { client } from '@/sanity/lib/client'
import { heroSectionQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

interface SanityHeroSection {
  subtitulo?: string
  titulo?: string
  descripcion?: string
  imagenes?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
}

async function getHeroData() {
  try {
    const data = await client.fetch<SanityHeroSection | null>(heroSectionQuery, {}, {
      next: { revalidate: 60 }
    })
    return data
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to fetch hero data:', error)
    }
    return null
  }
}

export default async function Home() {
  const heroData = await getHeroData()

  const heroProps = heroData ? {
    subtitulo: heroData.subtitulo,
    titulo: heroData.titulo,
    descripcion: heroData.descripcion,
    imagenes: heroData.imagenes?.map(img => ({
      url: urlFor(img).url(),
      alt: img.alt
    })),
  } : {}

  return (
    <div className="min-h-screen">
      <SectionIndicator />
      <section id="hero">
        <Hero {...heroProps} />
      </section>
      <section id="trust-signals">
        <TrustSignals />
      </section>
      <section id="cabanas">
        <FeaturedCabanas />
      </section>
      <section id="servicios">
        <ServicesHighlights />
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

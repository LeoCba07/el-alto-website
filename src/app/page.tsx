import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import FeaturedCabanas from '@/components/FeaturedCabanas'
import ServicesHighlights from '@/components/ServicesHighlights'
import LocationTeaser from '@/components/LocationTeaser'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
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
  textoBoton?: string
  linkBoton?: string
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
    textoBoton: heroData.textoBoton,
    linkBoton: heroData.linkBoton,
  } : {}

  return (
    <div className="min-h-screen">
      <Hero {...heroProps} />
      <TrustSignals />
      <FeaturedCabanas />
      <ServicesHighlights />
      <LocationTeaser />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}

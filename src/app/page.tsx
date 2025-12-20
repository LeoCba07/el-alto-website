import Hero from '@/components/Hero'
import TrustSignals from '@/components/TrustSignals'
import FeaturedCabanas from '@/components/FeaturedCabanas'
import ServicesHighlights from '@/components/ServicesHighlights'
import LocationTeaser from '@/components/LocationTeaser'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustSignals />
      <ServicesHighlights />
      <LocationTeaser />
      <FeaturedCabanas />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}

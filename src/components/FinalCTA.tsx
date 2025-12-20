import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

export default function FinalCTA() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/panorama-pileta.jpg"
        alt="Vista del complejo"
        fill
        className="object-cover"
      />
      {/* Overlay - using forest color but lighter than footer */}
      <div className="absolute inset-0 bg-forest/85" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-4">
          Tu escape a las sierras te espera
        </h2>

        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
          Reservá tu estadía y descubrí por qué nuestros huéspedes vuelven año tras año.
        </p>

        <Link
          href="/contacto"
          className="inline-flex items-center justify-center gap-2 bg-amber text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-dark transition-colors"
        >
          <HiOutlineCalendarDays className="w-5 h-5" />
          Consultar disponibilidad
        </Link>

        <p className="mt-6 text-sm text-white/60">
          Respondemos en menos de 2 horas
        </p>
      </div>
    </section>
  )
}

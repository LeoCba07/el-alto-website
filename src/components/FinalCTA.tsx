'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { FadeUp } from './ScrollAnimations'

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/panorama-escaleras-a-pileta.jpg"
        alt="Vista del complejo"
        fill
        className="object-cover"
      />
      {/* Simple dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <FadeUp className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white">
        <p className="text-amber font-medium mb-3 tracking-wide uppercase text-sm">
          Tu próxima escapada
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-4">
          Las sierras te esperan
        </h2>

        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Reservá tu estadía y descubrí por qué nuestros huéspedes vuelven año tras año.
        </p>

        <Link
          href="/contacto"
          className="inline-flex items-center justify-center gap-2 bg-amber text-forest-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-dark transition-all hover:shadow-lg hover:shadow-amber/25 hover:scale-105"
        >
          <HiOutlineCalendarDays className="w-5 h-5" />
          Consultar disponibilidad
        </Link>

        <p className="mt-8 text-sm text-white/60">
          Horarios de atención: 9 a 19 hs
        </p>
      </FadeUp>
    </section>
  )
}

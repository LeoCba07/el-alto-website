'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineFire } from 'react-icons/hi2'
import { FiWifi } from 'react-icons/fi'
import { MdOutlinePool, MdOutlineLocalParking, MdOutlineKitchen, MdOutlineLandscape } from 'react-icons/md'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import { FadeUp, StaggerGrid } from './ScrollAnimations'

const highlights = [
  {
    image: '/images/panorama-pileta.jpg',
    title: 'Pileta al aire libre',
    description: 'Refrescate con vista a las sierras. Climatizada en primavera y otoño.',
    Icon: MdOutlinePool,
  },
  {
    image: '/images/asador.jpg',
    title: 'Quincho con asadores',
    description: 'Espacio común equipado para disfrutar un asado en familia.',
    Icon: HiOutlineFire,
  },
  {
    image: '/images/vista-desde-cabana.jpg',
    title: 'Vistas a la montaña',
    description: 'Predio escalonado con jardín y panorámicas de las sierras.',
    Icon: MdOutlineLandscape,
  },
]

const amenities = [
  { label: 'Wi-Fi gratis', Icon: FiWifi },
  { label: 'Cochera cubierta', Icon: MdOutlineLocalParking },
  { label: 'Cocina equipada', Icon: MdOutlineKitchen },
]

export default function ServicesHighlights() {
  return (
    <section className="bg-forest-dark py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
              Instalaciones
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
              Lo que más disfrutan nuestros huéspedes
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Espacios pensados para tu descanso y disfrute en las sierras
            </p>
          </div>
        </FadeUp>

        {/* Feature Cards */}
        <StaggerGrid className="grid md:grid-cols-3 gap-6 mb-12" staggerDelay={150}>
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <item.Icon className="w-5 h-5 text-amber" />
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <p className="text-sm text-white/90">{item.description}</p>
              </div>
            </div>
          ))}
        </StaggerGrid>

        {/* Amenities Row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80">
              <amenity.Icon className="w-5 h-5 text-amber" />
              <span className="text-sm font-medium">{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-amber transition-colors group"
          >
            Ver todos los servicios
            <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

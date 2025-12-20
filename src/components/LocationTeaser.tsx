'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineMapPin, HiOutlineShoppingBag, HiOutlineBuildingStorefront, HiOutlineSparkles, HiOutlineChevronRight } from 'react-icons/hi2'
import { MdOutlineDirectionsBus, MdOutlinePool, MdOutlineTheaterComedy } from 'react-icons/md'
import { TbMountain, TbTrees } from 'react-icons/tb'
import { IconType } from 'react-icons'
import { FadeUp, StaggerGrid } from './ScrollAnimations'

const conveniences: { place: string; distance: string; Icon: IconType }[] = [
  { place: 'Centro de Tanti', distance: '500 m', Icon: HiOutlineBuildingStorefront },
  { place: 'Villa Carlos Paz', distance: '10 min', Icon: MdOutlineTheaterComedy },
  { place: 'Terminal', distance: '600 m', Icon: MdOutlineDirectionsBus },
  { place: 'Balneario', distance: '5 min', Icon: MdOutlinePool },
]

const nearbyAttractions = [
  {
    name: 'Cascada Los Helechos',
    distance: '2 km',
    image: '/images/cascada-los-helechos.jpg',
    tag: 'Naturaleza',
  },
  {
    name: 'Reserva Los Chorrillos',
    distance: '3.5 km',
    image: '/images/senderismo.jpg',
    tag: 'Aventura',
  },
  {
    name: 'Villa Carlos Paz',
    distance: '10 min',
    image: '/images/villa-carlos-paz.jpg',
    tag: 'Entretenimiento',
  },
  {
    name: 'Los Gigantes',
    distance: '50 min en auto',
    image: '/images/los-gigantes.jpg',
    tag: 'Senderismo',
  },
]

export default function LocationTeaser() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-forest font-medium mb-2 tracking-wide uppercase text-sm">
              Ubicación privilegiada
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-forest-dark mb-3">
              Explorá las sierras
            </h2>
            <p className="text-text-medium max-w-xl mx-auto">
              Todo lo que necesitás cerca, y la naturaleza a tu puerta
            </p>
          </div>
        </FadeUp>

        {/* Conveniences - Compact horizontal strip */}
        <FadeUp delay={100}>
          <div className="bg-forest-dark rounded-2xl p-6 mb-10">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {conveniences.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-amber/20 transition-colors duration-300">
                    <item.Icon className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.distance}</p>
                    <p className="text-white/60 text-xs">{item.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Nearby Attractions - Focus on inspiring exploration */}
        <div className="mb-10">
          <FadeUp delay={200}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <TbMountain className="w-5 h-5 text-forest" />
              <h3 className="text-lg font-bold text-forest-dark font-serif">
                Descubrí la zona
              </h3>
              <TbTrees className="w-5 h-5 text-forest" />
            </div>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={100}>
            {nearbyAttractions.map((attraction, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg cursor-pointer"
              >
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-300" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-medium text-white bg-amber/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    {attraction.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-amber transition-colors duration-300">
                    {attraction.name}
                  </h4>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <HiOutlineMapPin className="w-3 h-3" />
                    {attraction.distance}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full">
                    <HiOutlineSparkles className="w-4 h-4 inline mr-1" />
                    Explorar
                  </span>
                </div>
              </div>
            ))}
          </StaggerGrid>
        </div>

        {/* CTA */}
        <FadeUp delay={400}>
          <div className="text-center">
            <p className="text-forest-dark font-medium text-lg mb-4">
              ¿Listo para explorar?
            </p>
            <Link
              href="/cabanas"
              className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-full font-semibold hover:bg-forest-dark transition-all hover:shadow-lg group"
            >
              Ver cabañas
              <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

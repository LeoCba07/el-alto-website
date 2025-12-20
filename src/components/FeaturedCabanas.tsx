'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineUsers } from 'react-icons/hi2'

const cabinTypes = [
  {
    id: 'duplex',
    name: 'Dúplex',
    capacity: 'Hasta 6 personas',
    units: 2,
    description: 'Dos plantas con living-comedor abajo y dormitorios arriba. Ideal para familias o grupos de amigos.',
    photos: [
      { src: '/images/cabana1-interior.JPG', label: 'Living' },
      { src: '/images/cabana1-cocina.JPG', label: 'Cocina' },
      { src: '/images/cabana1-habitacion.JPG', label: 'Habitación' },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    capacity: '2 a 4 personas',
    units: 4,
    description: 'Espaciosas cabañas de una planta con todo lo necesario para una estadía confortable.',
    photos: [
      { src: '/images/cabana2-interior.JPG', label: 'Living' },
      { src: '/images/cabana2-cocina.JPG', label: 'Cocina' },
      { src: '/images/cabana2-habitacion.JPG', label: 'Habitación' },
    ],
  },
  {
    id: 'compact',
    name: 'Compactas',
    capacity: '2 a 3 personas',
    units: 4,
    description: 'Cabañas funcionales perfectas para estadías cortas o viajes económicos.',
    photos: [
      { src: '/images/cabana3-interior.JPG', label: 'Interior' },
      { src: '/images/cabana-con-vista.JPG', label: 'Vista' },
    ],
  },
  {
    id: 'couple',
    name: 'Parejas',
    capacity: '2 personas',
    units: 2,
    description: 'Cabañas íntimas y románticas con vista privilegiada a las sierras de Tanti.',
    photos: [
      { src: '/images/vista-desde-cabana.JPG', label: 'Terraza' },
      { src: '/images/cabana-con-vista.JPG', label: 'Interior' },
    ],
  },
]

export default function FeaturedCabanas() {
  const [selectedType, setSelectedType] = useState(cabinTypes[0])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const handleTypeSelect = (type: typeof cabinTypes[0]) => {
    setSelectedType(type)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % selectedType.photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + selectedType.photos.length) % selectedType.photos.length)
  }

  return (
    <section id="cabanas" className="bg-cream py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-forest font-medium mb-2 tracking-wide uppercase text-sm">
            Alojamientos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-dark font-serif mb-3">
            Nuestras Cabañas
          </h2>
          <p className="text-text-medium max-w-xl mx-auto">
            12 unidades equipadas con todo lo necesario
          </p>
        </div>

        {/* Cabin Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {cabinTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type)}
              className={`rounded-xl p-4 text-left transition-all border ${
                selectedType.id === type.id
                  ? 'bg-forest-dark text-white border-forest-dark shadow-lg'
                  : 'bg-white text-forest-dark border-sand hover:border-forest hover:shadow-md'
              }`}
            >
              <h3 className="font-bold text-base">{type.name}</h3>
              <div className={`flex items-center gap-1 text-sm mt-1 ${selectedType.id === type.id ? 'text-white/80' : 'text-text-medium'}`}>
                <HiOutlineUsers className="w-4 h-4" />
                <span>{type.capacity}</span>
              </div>
              <p className={`text-xs mt-1 ${selectedType.id === type.id ? 'text-white/60' : 'text-text-light'}`}>{type.units} unidades</p>
            </button>
          ))}
        </div>

        {/* Gallery + Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-forest">
            {selectedType.photos.map((photo, index) => (
              <div
                key={photo.src}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={`${selectedType.name} - ${photo.label}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Navigation */}
            {selectedType.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Anterior"
                >
                  <HiOutlineChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Siguiente"
                >
                  <HiOutlineChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
              {currentPhotoIndex + 1} / {selectedType.photos.length}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col bg-white rounded-xl p-6 border border-sand">
            <h3 className="text-2xl font-bold text-forest-dark font-serif mb-2">
              Cabañas {selectedType.name}
            </h3>
            <div className="flex items-center gap-4 text-text-medium mb-4">
              <div className="flex items-center gap-1">
                <HiOutlineUsers className="w-5 h-5" />
                <span>{selectedType.capacity}</span>
              </div>
              <span className="text-text-light">•</span>
              <span>{selectedType.units} unidades</span>
            </div>
            <p className="text-text-dark leading-relaxed mb-6">
              {selectedType.description}
            </p>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {selectedType.photos.map((photo, index) => (
                <button
                  key={photo.src}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                    index === currentPhotoIndex
                      ? 'ring-2 ring-forest'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 left-1 text-[10px] text-white bg-black/50 px-1.5 py-0.5 rounded">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-forest-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-forest transition-colors w-full"
            >
              Consultar disponibilidad
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineMapPin } from 'react-icons/hi2'

const distances = [
  { place: 'Centro de Tanti', distance: '500 m' },
  { place: 'Villa Carlos Paz', distance: '10 min' },
  { place: 'Terminal de ómnibus', distance: '600 m' },
  { place: 'Balneario El Diquecito', distance: '5 min' },
]

const nearbyAttractions = [
  {
    name: 'Cascada Los Helechos',
    distance: '2 km',
    image: '/images/senderismo.jpg',
  },
  {
    name: 'Reserva Los Chorrillos',
    distance: '3.5 km',
    image: '/images/sierras.jpg',
  },
  {
    name: 'Villa Carlos Paz',
    distance: '10 min',
    image: '/images/villa-carlos-paz.jpg',
  },
  {
    name: 'Los Gigantes',
    distance: 'Excursión',
    image: '/images/los-gigantes.jpg',
  },
]

export default function LocationTeaser() {
  return (
    <section className="bg-forest-dark py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
            Ubicación
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-3">
            En el corazón de las sierras
          </h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Tranquilidad serrana a minutos de todo
          </p>
        </div>

        {/* Distances from El Alto */}
        <div className="mb-12">
          <p className="text-center text-sm text-white/60 mb-4 font-medium">
            Distancias desde El Alto
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {distances.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
              >
                <p className="text-xl md:text-2xl font-bold text-amber">{item.distance}</p>
                <p className="text-white/80 text-sm mt-1">{item.place}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Attractions Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white font-serif mb-5 text-center">
            Qué hacer en la zona
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nearbyAttractions.map((attraction, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm"
              >
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h4 className="font-bold text-sm leading-tight">{attraction.name}</h4>
                  <p className="text-amber text-xs font-medium mt-1">{attraction.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">
            Te damos mapas e info de excursiones en recepción
          </p>
          <Link
            href="/contacto#ubicacion"
            className="inline-flex items-center gap-2 bg-amber text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-dark transition-colors"
          >
            <HiOutlineMapPin className="w-5 h-5" />
            Ver ubicación del complejo
          </Link>
        </div>
      </div>
    </section>
  )
}

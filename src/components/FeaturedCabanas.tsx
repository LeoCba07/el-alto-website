import Image from 'next/image'
import Button from './Button'

const cabanas = [
  {
    id: 1,
    nombre: 'Cabaña 1',
    descripcion: 'Cabaña acogedora con cocina completa y hermosa vista',
    capacidad: 4,
    imagen: '/images/cabana1-interior.JPG',
  },
  {
    id: 2,
    nombre: 'Cabaña 2',
    descripcion: 'Espaciosa cabaña ideal para familias',
    capacidad: 6,
    imagen: '/images/cabana2-interior.JPG',
  },
  {
    id: 3,
    nombre: 'Cabaña 3',
    descripcion: 'Íntima cabaña con todas las comodidades',
    capacidad: 4,
    imagen: '/images/cabana3-interior.JPG',
  },
]

export default function FeaturedCabanas() {
  return (
    <section id="cabanas" className="bg-cream py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-amber font-medium mb-3 tracking-wide uppercase text-sm">
            Alojamientos
          </p>
          <h2 className="mb-4 text-3xl font-bold text-text-dark md:text-4xl font-serif">
            Nuestras Cabañas
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-medium">
            Descubrí el lugar perfecto para tu descanso en las sierras de
            Córdoba
          </p>
        </div>

        {/* Cabañas Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cabanas.map((cabana) => (
            <div
              key={cabana.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg border border-sand transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={cabana.imagen}
                  alt={cabana.nombre}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-text-dark font-serif">
                  {cabana.nombre}
                </h3>
                <p className="mb-4 text-text-medium text-sm">
                  {cabana.descripcion}
                </p>
                <div className="mb-4 flex items-center text-forest">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="font-medium text-sm">
                    Hasta {cabana.capacidad} personas
                  </span>
                </div>
                <Button href={`/cabanas/${cabana.id}`} variant="primary" size="md" className="w-full">
                  Ver Detalles
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Button href="/cabanas" variant="secondary" size="lg">
            Ver Todas las Cabañas
          </Button>
        </div>
      </div>
    </section>
  )
}

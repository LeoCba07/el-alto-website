import Image from 'next/image'

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero banner */}
      <section className="bg-forest-dark text-white py-12 md:py-16 mt-14 md:mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
            Comodidad y tranquilidad
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Servicios e Instalaciones
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Todo lo que necesitás para descansar como en casa
          </p>
        </div>
      </section>

      {/* Main content - consistent width */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Feature photos */}
        <section className="mb-14">
          <h2 className="text-2xl font-serif font-bold text-forest-dark mb-6 text-center">
            Lo que más disfrutan nuestros huéspedes
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <FeatureCard
              image="/images/panorama-pileta.jpg"
              title="Pileta al aire libre"
              description="Vista a las sierras. Climatizada en primavera y otoño."
              note="Horario: 9:30 a 22:00 hs"
            />
            <FeatureCard
              image="/images/asador.jpg"
              title="Quincho con asadores"
              description="Espacio común para disfrutar un asado en familia."
              note="Reservá en recepción"
            />
            <FeatureCard
              image="/images/vista-desde-cabana.JPG"
              title="Vistas a la montaña"
              description="Predio escalonado con jardín y panorámicas."
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-text-dark">
            <svg className="w-5 h-5 text-amber flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <p className="text-base">
              <span className="font-semibold">Atendido por sus dueños</span> — 28 años recibiendo familias con trato personalizado
            </p>
          </div>
        </section>

        {/* Amenities + Optional services */}
        <section>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Included amenities - 2 columns */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <h3 className="text-lg font-serif font-bold text-forest-dark mb-4 pb-2 border-b border-sand">
                  En tu unidad
                </h3>
                <div className="space-y-3">
                  <AmenityRow icon="wifi" label="Wi-Fi gratis" />
                  <AmenityRow icon="kitchen" label="Cocina equipada" pill="horno, microondas, heladera, vajilla" />
                  <AmenityRow icon="bed" label="Ropa de cama y toallas" />
                  <AmenityRow icon="tv" label="TV con cable" />
                  <AmenityRow icon="climate" label="Calefacción y ventiladores" />
                  <AmenityRow icon="safe" label="Caja de seguridad" />
                  <AmenityRow icon="hairdryer" label="Secador de pelo" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-forest-dark mb-4 pb-2 border-b border-sand">
                  En el complejo
                </h3>
                <div className="space-y-3">
                  <AmenityRow icon="car" label="Cochera techada" pill="1 por unidad" />
                  <AmenityRow icon="kids" label="Sala de juegos para chicos" />
                  <AmenityRow icon="gym" label="Gimnasio" />
                  <AmenityRow icon="restaurant" label="Restaurant en el predio" />
                  <AmenityRow icon="map" label="Info turística y excursiones" />
                  <AmenityRow icon="luggage" label="Guardado de equipaje" />
                  <AmenityRow icon="reception" label="Recepción" pill="9 a 19 hs" />
                </div>
              </div>
            </div>

            {/* Optional services - stacked cards */}
            <div>
              <h3 className="text-lg font-serif font-bold text-forest-dark mb-4 pb-2 border-b border-sand">
                Servicios opcionales
              </h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-sand/50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-text-dark">Aire acondicionado</span>
                    <span className="text-xs font-semibold text-amber bg-amber/10 px-2 py-0.5 rounded-full">$2.500/día</span>
                  </div>
                  <p className="text-sm text-text-medium">
                    Opcional para mantener tarifas accesibles.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-sand/50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-text-dark">Desayuno</span>
                    <span className="text-xs font-semibold text-amber bg-amber/10 px-2 py-0.5 rounded-full">Consultar</span>
                  </div>
                  <p className="text-sm text-text-medium">
                    Desayuno seco servido en tu unidad.
                  </p>
                  <p className="text-xs text-text-light mt-1">Disponibilidad limitada</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-sand/50">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-text-dark">Masajes</span>
                    <span className="text-xs font-semibold text-amber bg-amber/10 px-2 py-0.5 rounded-full">Consultar</span>
                  </div>
                  <p className="text-sm text-text-medium">
                    Facial, reflexología, piedras calientes.
                  </p>
                  <p className="text-xs text-text-light mt-1">Disponibilidad limitada</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-text-light">
                No incluimos mucama para mantener tarifas accesibles.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

function FeatureCard({ image, title, description, note }: { image: string; title: string; description: string; note?: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-sm group aspect-[4/3]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg mb-0.5">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
        {note && <p className="text-xs text-white/60 mt-1">{note}</p>}
      </div>
    </div>
  )
}

function AmenityRow({ icon, label, pill, pillVariant }: { icon: string; label: string; pill?: string; pillVariant?: 'default' | 'price' }) {
  const icons: Record<string, React.ReactNode> = {
    wifi: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    ),
    kitchen: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    ),
    bed: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v11a1 1 0 001 1h16a1 1 0 001-1V7M3 7l9-4 9 4M4 11h16M8 11v4m8-4v4" />
    ),
    tv: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    climate: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    ),
    safe: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
    hairdryer: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    ),
    car: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.4 4h11.2a2 2 0 011.9 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" />
    ),
    kids: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    gym: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h1m16 0h1m-15.5 0h-1V8.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V12zm12 0h1v3.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h1a.5.5 0 01.5.5V12zm-9.5 0h9" />
    ),
    restaurant: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-6v2m4-2v2m4-2v2" />
    ),
    map: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    ),
    luggage: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    reception: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    ),
    ac: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    breakfast: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-6v2m4-2v2m4-2v2" />
    ),
    spa: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
  }

  const pillStyles = pillVariant === 'price'
    ? 'text-xs font-semibold text-amber bg-amber/10 px-2 py-0.5 rounded-full leading-none inline-flex items-center'
    : 'text-xs text-text-light bg-sand/70 px-2 py-0.5 rounded-full leading-none inline-flex items-center'

  return (
    <div className="flex items-start gap-3">
      <svg className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icons[icon]}
      </svg>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-base text-text-dark">{label}</span>
        {pill && (
          <span className={pillStyles}>{pill}</span>
        )}
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Consultá disponibilidad y reservá tu estadía en Complejo El Alto, Tanti, Córdoba. Te respondemos por WhatsApp con toda la información.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* Header Section */}
      <section className="bg-forest-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber font-medium mb-3 tracking-wide uppercase text-sm">
            28 años de tradición familiar
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Planificá tu escapada a las sierras
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Completá el formulario y te responderemos por WhatsApp con toda la información que necesites
          </p>
        </div>
      </section>

      {/* Main Content: Info first on mobile, then Form */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Check-in/Check-out Info - Shows first on mobile, right side on desktop */}
            <div className="lg:col-span-2 lg:order-2">
              <div className="bg-forest-dark text-white rounded-2xl p-6 md:p-8 lg:sticky lg:top-24 shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-amber/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Información útil
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Check-in</p>
                      <p className="text-white/80 text-sm">Desde las 13:30 hs</p>
                      <p className="text-white/60 text-xs mt-0.5">Llegada máxima 20:00 hs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Check-out</p>
                      <p className="text-white/80 text-sm">Hasta las 10:00 hs</p>
                      <p className="text-white/60 text-xs mt-0.5">Late check-out hasta 18:00 hs (+50%)</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Seña para reservar</p>
                        <p className="text-white/80 text-sm">30% del total</p>
                        <p className="text-white/60 text-xs mt-0.5">50% para estadías de 2 noches o menos</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Medios de pago</p>
                      <p className="text-white/80 text-sm">Transferencia o Mercado Pago</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <Link
                    href="/preguntas-frecuentes"
                    className="flex items-center justify-between w-full bg-amber/20 hover:bg-amber/30 rounded-xl px-4 py-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Preguntas frecuentes</span>
                    </div>
                    <svg className="w-5 h-5 text-amber/70 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form - Shows second on mobile, left side on desktop */}
            <div className="lg:col-span-3 lg:order-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-sand">
                <h2 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                  Consultá disponibilidad
                </h2>
                <p className="text-text-medium text-sm mb-6">
                  Te responderemos a la brevedad por WhatsApp
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Bar */}
      <section className="py-8 bg-cream-dark border-y border-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
            <div className="flex items-center gap-2 text-text-dark">
              <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span><strong>Cochera:</strong> 1 lugar cubierto por unidad</span>
            </div>

            <div className="flex items-center gap-2 text-text-dark">
              <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span><strong>Llegada nocturna:</strong> Hasta 22:00 hs con aviso</span>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-10 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <p className="text-text-medium text-sm">También podés contactarnos por:</p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+5403541498970"
                className="flex items-center gap-2 text-forest hover:text-forest-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">(03541) 498970</span>
              </a>
              <a
                href="mailto:info@complejoelalto.com.ar"
                className="flex items-center gap-2 text-forest hover:text-forest-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">info@complejoelalto.com.ar</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 md:py-16 bg-forest-dark text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
              Ubicación
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              ¿Dónde estamos?
            </h2>
            <p className="text-white/80">
              Ruta Provincial N°28 y San Martín 1130, Tanti (5155), Córdoba
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8!2d-64.5876!3d-31.3607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDIxJzM4LjUiUyA2NMKwMzUnMTUuNCJX!5e0!3m2!1ses!2sar!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Complejo El Alto"
              />
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              {/* Distance References */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber">10 min</p>
                  <p className="text-sm text-white/70">de Villa Carlos Paz</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber">500 m</p>
                  <p className="text-sm text-white/70">del centro de Tanti</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber">600 m</p>
                  <p className="text-sm text-white/70">del Arroyo Tanti</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber">3 km</p>
                  <p className="text-sm text-white/70">del Balneario El Diquecito</p>
                </div>
              </div>

              {/* Nearby */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-5">
                <h3 className="text-sm font-semibold text-amber mb-3">Cerca del complejo</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-white/80">Despensas a 100 m</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-white/80">Supermercado a 300 m</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-white/80">Terminal a 600 m</span>
                  <span className="bg-white/10 px-3 py-1.5 rounded-full text-white/80">Parada de colectivo a 150 m</span>
                </div>
              </div>

              {/* Directions Link */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=-31.3607,-64.5876"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-dark shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

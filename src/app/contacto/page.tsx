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
    <div className="min-h-screen bg-sand-light pt-20">
      {/* Header Section */}
      <section className="bg-earth-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Consultar Disponibilidad
          </h1>
          <p className="text-xl text-stone-light max-w-2xl mx-auto">
            Completá el formulario con tus fechas y cantidad de personas.
            Te responderemos por WhatsApp a la brevedad.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-earth-dark mb-6">
                ¿Cuándo querés venir?
              </h2>
              <ContactForm />
            </div>

            {/* Info Sidebar */}
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-earth-dark mb-4">
                  Información útil
                </h3>
                <ul className="space-y-4 text-earth-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-terracotta mt-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-medium text-earth-dark">Check-in:</span>{' '}
                      Desde las 13:30 hs (llegada máxima 20:00 hs)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-terracotta mt-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-medium text-earth-dark">Check-out:</span>{' '}
                      Hasta las 10:00 hs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-terracotta mt-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-medium text-earth-dark">Seña:</span>{' '}
                      30% del total (50% para estadías de 2 noches o menos)
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-terracotta mt-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </span>
                    <div>
                      <span className="font-medium text-earth-dark">Pago:</span>{' '}
                      Transferencia bancaria o Mercado Pago
                    </div>
                  </li>
                </ul>
              </div>

              {/* Important Notes */}
              <div className="bg-sand rounded-2xl p-6 md:p-8 border border-stone-light">
                <h3 className="text-xl font-bold text-earth-dark mb-4">
                  Importante
                </h3>
                <ul className="space-y-3 text-earth-medium text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">•</span>
                    <span>No se aceptan mascotas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">•</span>
                    <span>No se permiten visitas externas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">•</span>
                    <span>Los menores (incluidos bebés) cuentan para la capacidad máxima</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-terracotta">•</span>
                    <span>1 cochera cubierta por unidad</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-stone-light">
                  <Link
                    href="/preguntas-frecuentes"
                    className="text-terracotta hover:text-terracotta-dark font-medium text-sm transition-colors"
                  >
                    Ver todas las preguntas frecuentes →
                  </Link>
                </div>
              </div>

              {/* Contact Alternatives */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-earth-dark mb-4">
                  Otras formas de contacto
                </h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="tel:+5493572501030"
                      className="flex items-center gap-3 text-earth-medium hover:text-terracotta transition-colors"
                    >
                      <span className="w-10 h-10 bg-sand-light rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-medium text-earth-dark">(03572) 15-501030</p>
                        <p className="text-sm">Celular / WhatsApp</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+5493541498970"
                      className="flex items-center gap-3 text-earth-medium hover:text-terracotta transition-colors"
                    >
                      <span className="w-10 h-10 bg-sand-light rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-medium text-earth-dark">(03541) 498970</p>
                        <p className="text-sm">Teléfono fijo</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@complejoelalto.com.ar"
                      className="flex items-center gap-3 text-earth-medium hover:text-terracotta transition-colors"
                    >
                      <span className="w-10 h-10 bg-sand-light rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-medium text-earth-dark">info@complejoelalto.com.ar</p>
                        <p className="text-sm">Email</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-earth-dark mb-2">
              ¿Dónde estamos?
            </h2>
            <p className="text-earth-medium">
              Ruta Provincial N°28 y San Martín 1130, Tanti (5155), Córdoba
            </p>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
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
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=-31.3607,-64.5876"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-terracotta hover:text-terracotta-dark font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Cómo llegar
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

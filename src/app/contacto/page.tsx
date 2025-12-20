import { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import {
  HiOutlineClock,
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineBanknotes,
  HiOutlineCreditCard,
  HiOutlineBuildingOffice,
  HiOutlineMoon,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineChevronRight,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
  HiOutlinePlus
} from 'react-icons/hi2'
import { MdOutlineDirectionsBus } from 'react-icons/md'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Consultá disponibilidad y reservá tu estadía en Complejo El Alto, Tanti, Córdoba. Te respondemos por WhatsApp con toda la información.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header Section */}
      <section className="bg-forest-dark text-white py-12 md:py-16 mt-14 md:mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
            28 años de tradición familiar
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Planificá tu escapada a las sierras
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Completá el formulario y te responderemos por WhatsApp con toda la información que necesites
          </p>
        </div>
      </section>

      {/* Main Content: Info first on mobile, then Form */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
            {/* Check-in/Check-out Info - Shows first on mobile, right side on desktop */}
            <div className="lg:col-span-2 lg:order-2">
              <div className="bg-forest-dark text-white rounded-2xl p-6 md:p-8 shadow-xl h-full">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 bg-amber/20 rounded-full flex items-center justify-center">
                    <HiOutlineClock className="w-5 h-5 text-amber" />
                  </span>
                  Información útil
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiOutlineArrowRightOnRectangle className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <p className="font-semibold">Check-in</p>
                      <p className="text-white/80 text-sm">Desde las 13:30 hs</p>
                      <p className="text-white/60 text-xs mt-0.5">Llegada máxima 20:00 hs</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiOutlineArrowLeftOnRectangle className="w-5 h-5 text-amber" />
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
                        <HiOutlineBanknotes className="w-5 h-5 text-amber" />
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
                      <HiOutlineCreditCard className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <p className="font-semibold">Medios de pago</p>
                      <p className="text-white/80 text-sm">Transferencia o Mercado Pago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiOutlineBuildingOffice className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <p className="font-semibold">Cochera</p>
                      <p className="text-white/80 text-sm">1 lugar cubierto por unidad</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HiOutlineMoon className="w-5 h-5 text-amber" />
                    </div>
                    <div>
                      <p className="font-semibold">Llegada nocturna</p>
                      <p className="text-white/80 text-sm">Hasta 22:00 hs con aviso previo</p>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-white/80 text-sm font-medium mb-3">También podés contactarnos</p>
                  <div className="space-y-3">
                    <a href="tel:+5403541498970" className="flex items-center gap-3 text-white hover:text-amber transition-colors">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <HiOutlinePhone className="w-4 h-4 text-amber" />
                      </div>
                      <span>(03541) 498970</span>
                    </a>
                    <a href="mailto:info@complejoelalto.com.ar" className="flex items-center gap-3 text-white hover:text-amber transition-colors">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <HiOutlineEnvelope className="w-4 h-4 text-amber" />
                      </div>
                      <span className="text-sm">info@complejoelalto.com.ar</span>
                    </a>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="mt-5 pt-5 border-t border-white/10">
                  <Link
                    href="/consultas-frecuentes"
                    className="flex items-center justify-between w-full bg-amber/20 hover:bg-amber/30 rounded-xl px-4 py-3 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <HiOutlineChatBubbleBottomCenterText className="w-5 h-5 text-amber" />
                      <span className="font-medium">Preguntas frecuentes</span>
                    </div>
                    <HiOutlineChevronRight className="w-5 h-5 text-amber/70 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form - Shows second on mobile, left side on desktop */}
            <div className="lg:col-span-3 lg:order-1">
              <div className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-sand h-full">
                <h2 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                  Consultá disponibilidad
                </h2>
                <p className="text-text-medium text-sm mb-8">
                  Te responderemos a la brevedad por WhatsApp
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" className="py-12 md:py-16 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-forest font-medium mb-2 tracking-wide uppercase text-sm">
              Ubicación
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-forest-dark mb-3">
              ¿Dónde estamos?
            </h2>
            <p className="text-text-medium">
              Ruta Provincial N°28 y San Martín 1130, Tanti (5155), Córdoba
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Map + Entrance Photo */}
            <div className="flex flex-col gap-4">
              <div className="flex-1 min-h-[200px] rounded-2xl overflow-hidden shadow-lg border border-sand">
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
              <div className="relative aspect-[3/1] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/cartel-entrada.JPG"
                  alt="Entrada a Complejo El Alto"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-3 left-4 text-white text-sm font-medium">
                  Nuestra entrada sobre Ruta 28
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="flex flex-col gap-4">
              {/* Distance References */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 text-center border-t-4 border-t-amber border-x border-b border-sand shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-amber">10 min</p>
                  <p className="text-sm text-text-medium">de Villa Carlos Paz</p>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center border-t-4 border-t-amber border-x border-b border-sand shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-amber">500 m</p>
                  <p className="text-sm text-text-medium">del centro de Tanti</p>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center border-t-4 border-t-amber border-x border-b border-sand shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-amber">600 m</p>
                  <p className="text-sm text-text-medium">del Arroyo Tanti</p>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center border-t-4 border-t-amber border-x border-b border-sand shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-2xl font-bold text-amber">3 km</p>
                  <p className="text-sm text-text-medium">del Balneario El Diquecito</p>
                </div>
              </div>

              {/* Nearby */}
              <div className="bg-white rounded-2xl p-5 border border-sand shadow-sm flex-1">
                <h3 className="text-sm font-semibold text-forest-dark mb-3">Cerca del complejo</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 bg-cream-dark px-3 py-1.5 rounded-full text-text-dark">
                    <HiOutlineShoppingBag className="w-3.5 h-3.5 text-amber" />
                    Despensas 100 m
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-cream-dark px-3 py-1.5 rounded-full text-text-dark">
                    <HiOutlineShoppingCart className="w-3.5 h-3.5 text-amber" />
                    Súper 300 m
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-cream-dark px-3 py-1.5 rounded-full text-text-dark">
                    <MdOutlineDirectionsBus className="w-3.5 h-3.5 text-amber" />
                    Terminal 600 m
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-cream-dark px-3 py-1.5 rounded-full text-text-dark">
                    <HiOutlineMapPin className="w-3.5 h-3.5 text-amber" />
                    Colectivo 150 m
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-cream-dark px-3 py-1.5 rounded-full text-text-dark">
                    <HiOutlinePlus className="w-3.5 h-3.5 text-amber" />
                    Farmacia 400 m
                  </span>
                </div>
              </div>

              {/* Directions Link */}
              <div className="text-center">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-31.3607,-64.5876"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-forest text-white px-8 py-3.5 rounded-full font-semibold hover:bg-forest-dark shadow-md hover:shadow-lg transition-all"
                >
                  <HiOutlineMapPin className="w-5 h-5" />
                  Cómo llegar
                  <HiOutlineChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

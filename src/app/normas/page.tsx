import { Metadata } from 'next'
import Link from 'next/link'
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserMinus,
  HiOutlineSpeakerWave,
} from 'react-icons/hi2'
import { MdOutlinePool, MdOutlineLocalParking, MdOutlineWaterDrop } from 'react-icons/md'
import { PiPawPrint } from 'react-icons/pi'
import { GiTowel } from 'react-icons/gi'
import { client } from '@/sanity/lib/client'
import { normasQuery, configuracionSitioQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Normas del Complejo | El Alto',
  description: 'Normas de convivencia y políticas de reserva de Complejo El Alto, Tanti, Córdoba.',
}

interface SanityNorma {
  _id: string
  titulo: string
  descripcion?: string
  icono: string
  categoria: string
  tipo: string
  horario?: string
  detalle?: string
}

interface SanityConfig {
  horarios?: {
    checkIn?: string
    checkOut?: string
  }
}

async function getNormasData() {
  try {
    const [normas, config] = await Promise.all([
      client.fetch<SanityNorma[]>(normasQuery, {}, { next: { revalidate: 60 } }),
      client.fetch<SanityConfig | null>(configuracionSitioQuery, {}, { next: { revalidate: 60 } })
    ])
    return { normas, config }
  } catch {
    return { normas: null, config: null }
  }
}

export default async function NormasPage() {
  const { config } = await getNormasData()

  // Use config data for check-in/check-out times if available
  const checkInTime = config?.horarios?.checkIn || '13:30'
  const checkOutTime = config?.horarios?.checkOut || '10:00'
  return (
    <div className="min-h-screen bg-cream">
      {/* Header Section */}
      <section className="bg-forest-dark text-white py-12 md:py-16 mt-14 md:mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
            Información importante
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Normas del Complejo
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Para que tu estadía sea perfecta
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-6">

          {/* Horarios */}
          <div className="bg-white rounded-2xl border border-sand overflow-hidden">
            <div className="bg-forest-dark px-6 py-4">
              <h2 className="text-lg font-bold text-white">Horarios</h2>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-cream rounded-xl">
                  <HiOutlineArrowRightOnRectangle className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-2xl font-bold text-forest-dark">{checkInTime.replace(' hs', '')}</p>
                  <p className="text-sm text-text-medium">Check-In</p>
                  <p className="text-sm text-text-light mt-1">Llegada hasta las 20:00</p>
                </div>
                <div className="text-center p-4 bg-cream rounded-xl">
                  <HiOutlineArrowLeftOnRectangle className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-2xl font-bold text-forest-dark">{checkOutTime.replace(' hs', '')}</p>
                  <p className="text-sm text-text-medium">Check-Out</p>
                  <p className="text-sm text-text-light mt-1">Late check-out disponible</p>
                </div>
                <div className="text-center p-4 bg-cream rounded-xl">
                  <MdOutlinePool className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="text-2xl font-bold text-forest-dark">9:30 - 22:00</p>
                  <p className="text-sm text-text-medium">Pileta</p>
                  <p className="text-sm text-text-light mt-1">Niños con adultos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lo que debes saber + Convivencia - Side by side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lo que debes saber */}
            <div className="bg-white rounded-2xl border border-sand overflow-hidden">
              <div className="bg-forest-dark px-6 py-4">
                <h2 className="text-lg font-bold text-white">Lo que debés saber</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <HiOutlineCreditCard className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Pago al llegar</p>
                    <p className="text-text-medium text-sm">El saldo se abona en el check-in.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <HiOutlineUserGroup className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Capacidad máxima</p>
                    <p className="text-text-medium text-sm">Bebés incluidos en el conteo.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <PiPawPrint className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Sin mascotas</p>
                    <p className="text-text-medium text-sm">Para la comodidad de todos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MdOutlineLocalParking className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Una cochera por unidad</p>
                    <p className="text-text-medium text-sm">Primeras 4 para vehículos grandes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Convivencia */}
            <div className="bg-white rounded-2xl border border-sand overflow-hidden">
              <div className="bg-forest-dark px-6 py-4">
                <h2 className="text-lg font-bold text-white">Convivencia</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <HiOutlineUserMinus className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Uso exclusivo huéspedes</p>
                    <p className="text-text-medium text-sm">No se permiten visitas externas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <HiOutlineSpeakerWave className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Volumen moderado</p>
                    <p className="text-text-medium text-sm">Para disfrutar la tranquilidad serrana.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <GiTowel className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Toallones de pileta</p>
                    <p className="text-text-medium text-sm">Disponibles en recepción si los necesitás.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MdOutlineWaterDrop className="w-6 h-6 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-forest-dark">Agua potable</p>
                    <p className="text-text-medium text-sm">Podés tomar del grifo sin problemas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cancelación */}
          <div className="bg-forest-dark text-white rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-bold">Política de Cancelación</h2>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-amber font-medium text-sm mb-2">Temporada Alta/Media</p>
                  <p className="text-2xl font-bold mb-1">30 días</p>
                  <p className="text-sm text-white/70">Reembolso total. Entre 15-29 días se cobra 1 noche.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-amber font-medium text-sm mb-2">Temporada Baja</p>
                  <p className="text-2xl font-bold mb-1">72 hs</p>
                  <p className="text-sm text-white/70">Cancelación gratuita hasta 72 hs antes del check-in.</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-amber font-medium text-sm mb-2">Promociones</p>
                  <p className="text-2xl font-bold mb-1">No reemb.</p>
                  <p className="text-sm text-white/70">Las tarifas promocionales no son reembolsables.</p>
                </div>
              </div>
              <p className="text-white/70 text-xs text-center mt-4">Una vez confirmada la reserva, no se pueden modificar las fechas.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-forest">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-serif mb-4">
            ¿Tenés alguna duda?
          </h2>
          <p className="text-white/80 mb-8">
            Estamos para ayudarte con tu reserva
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-amber text-text-dark px-8 py-4 rounded-full font-semibold hover:bg-amber-dark transition-all hover:shadow-lg hover:shadow-amber/25"
          >
            <HiOutlineChatBubbleLeftRight className="w-5 h-5" />
            Contactanos
          </Link>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import { SiWhatsapp } from 'react-icons/si'
import { OPTIONAL_SERVICES } from '@/lib/constants'
import type { TarifaTemporada, TarifasData } from '@/lib/types'

export interface TarifasTableProps {
  tarifas?: TarifasData | null
  /** The season the prices belong to, e.g. "2025/26", set in the Studio. */
  temporada?: string | null
}

/** Seasonal rate cards. Shared by /precios and anywhere else rates are shown. */
export default function TarifasTable({ tarifas, temporada }: TarifasTableProps) {
  return (
  <section id="tarifas" className="py-12 md:py-16 bg-cream-dark">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-forest-dark font-serif text-center mb-3">
        Tarifas por noche
      </h2>
      {/* The season sits next to the prices in the Studio; with none set the
          line drops it rather than show a stale year. */}
      <p className="text-text-medium text-center mb-8 text-sm">
        {[temporada && `Temporada ${temporada}`, 'Precios en pesos argentinos', 'No incluye desayuno']
          .filter(Boolean)
          .join(' · ')}
      </p>

      {tarifas ? (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(tarifas).map((temporada: TarifaTemporada) => (
              <div
                key={temporada.nombre}
                className="bg-white rounded-2xl border border-sand overflow-hidden"
              >
                <div className={`px-5 py-4 ${
                  temporada.nombre === 'Temporada Alta'
                    ? 'bg-amber text-text-dark'
                    : temporada.nombre === 'Temporada Media'
                    ? 'bg-forest text-white'
                    : 'bg-forest-dark text-white'
                }`}>
                  <h3 className="font-bold font-serif">{temporada.nombre}</h3>
                  <p className="text-xs mt-1 opacity-90">
                    {temporada.periodo}
                  </p>
                </div>
                <div className="p-5 space-y-3">
                  {temporada.precios.map((item: { capacidad: string; precio: number }) => (
                    <div key={item.capacidad} className="flex justify-between items-center">
                      <span className="text-sm text-text-medium">{item.capacidad}</span>
                      <span className="font-semibold text-forest-dark">
                        ${item.precio.toLocaleString('es-AR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-text-medium">
              <span className="font-medium text-forest-dark">Aire acondicionado:</span> {OPTIONAL_SERVICES.acPricePerDay}
            </p>
            <p className="text-sm text-text-light">
              Pileta, quincho y cochera incluidos · Descuentos por pago en efectivo
            </p>
            <p className="text-xs text-text-light mt-4 italic">
              * Precios de referencia, sujetos a confirmación al momento de reservar
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-text-medium">
            Tarifas no disponibles. Consultá por WhatsApp para conocer los precios actuales.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-amber text-text-dark px-6 py-3 rounded-full font-semibold mt-4 hover:bg-amber-dark transition-colors"
          >
            <SiWhatsapp className="w-5 h-5" />
            Consultar tarifas
          </Link>
        </div>
      )}
    </div>
  </section>

  )
}

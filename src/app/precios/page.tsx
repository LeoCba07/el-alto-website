import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { tarifasTemporadaQuery } from '@/sanity/lib/queries'
import TarifasTable from '@/components/TarifasTable'
import ComoReservar from '@/components/ComoReservar'
import PageCTA from '@/components/PageCTA'
import type { TarifasData } from '@/lib/types'

// Force dynamic rendering to show Sanity updates immediately
export const dynamic = 'force-dynamic'

interface SanityTarifasDocument {
  temporadaVigente?: string
  temporadaAlta?: TarifasData['alta']
  temporadaMedia?: TarifasData['media']
  temporadaBaja?: TarifasData['baja']
}

async function getTarifasData(): Promise<{ tarifas: TarifasData | null; temporada: string | null }> {
  try {
    const doc = await client.fetch<SanityTarifasDocument | null>(tarifasTemporadaQuery)
    const temporada = doc?.temporadaVigente?.trim() || null
    if (!doc?.temporadaAlta || !doc?.temporadaMedia || !doc?.temporadaBaja) return { tarifas: null, temporada }
    return { tarifas: { alta: doc.temporadaAlta, media: doc.temporadaMedia, baja: doc.temporadaBaja }, temporada }
  } catch {
    return { tarifas: null, temporada: null }
  }
}

export default async function PreciosPage() {
  const { tarifas, temporada } = await getTarifasData()

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative h-[50vh] min-h-[400px] mt-14 md:mt-16">
        <Image
          src="/images/panorama-pileta.jpg"
          alt="Complejo El Alto en Tanti, Córdoba"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 pb-10 w-full">
            <p className="text-amber font-medium mb-2 tracking-wide uppercase text-sm">
              Alojamiento en Tanti
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-3">
              Precios
            </h1>
            <p className="text-white/90 max-w-xl">
              Cuánto sale por noche, según la temporada y cuántos sean
            </p>
          </div>
        </div>
      </section>

      <TarifasTable tarifas={tarifas} temporada={temporada} />

      <ComoReservar />

      <PageCTA />
    </div>
  )
}

import { client } from '@/sanity/lib/client'
import { cabanasQuery, tarifasTemporadaQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import CabanasClient, { CabanaType, TarifasData } from './CabanasClient'

// Force dynamic rendering to show Sanity updates immediately
export const dynamic = 'force-dynamic'

interface SanityCabana {
  _id: string
  nombre: string
  slug?: { current: string }
  tipo: string
  descripcion: string
  destacado?: string
  capacidadTexto: string
  capacidadMaxima: number
  cantidad: number
  fotos?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
}

interface SanityTarifasDocument {
  temporadaAlta?: { nombre: string; periodo: string; precios: { capacidad: string; precio: number }[] }
  temporadaMedia?: { nombre: string; periodo: string; precios: { capacidad: string; precio: number }[] }
  temporadaBaja?: { nombre: string; periodo: string; precios: { capacidad: string; precio: number }[] }
}

async function getCabanasData() {
  try {
    const cabanas = await client.fetch<SanityCabana[]>(cabanasQuery)
    return cabanas
  } catch {
    return null
  }
}

async function getTarifasData(): Promise<TarifasData | null> {
  try {
    const tarifasDoc = await client.fetch<SanityTarifasDocument | null>(tarifasTemporadaQuery)

    if (!tarifasDoc?.temporadaAlta || !tarifasDoc?.temporadaMedia || !tarifasDoc?.temporadaBaja) {
      return null
    }

    return {
      alta: tarifasDoc.temporadaAlta,
      media: tarifasDoc.temporadaMedia,
      baja: tarifasDoc.temporadaBaja,
    }
  } catch {
    return null
  }
}

export default async function CabanasPage() {
  const [cabanasData, tarifasData] = await Promise.all([
    getCabanasData(),
    getTarifasData()
  ])

  // Fallback photos for each cabin type
  const fallbackPhotos: Record<string, string[]> = {
    duplex: ['/images/cabana1-interior.jpg', '/images/cabana2-interior.jpg', '/images/cabana2-habitacion.jpg'],
    standard: ['/images/cabana2-interior.jpg', '/images/cabana2-cocina.jpg', '/images/cabana2-habitacion.jpg'],
    compact: ['/images/cabana3-interior.jpg', '/images/cabana-con-vista.jpg'],
    couple: ['/images/vista-desde-cabana.jpg', '/images/cabana-con-vista.jpg'],
  }

  const cabanas: CabanaType[] | undefined = cabanasData?.length
    ? cabanasData.map((cabana) => ({
        id: cabana._id,
        tipo: cabana.tipo,
        nombre: cabana.nombre,
        capacidad: cabana.capacidadTexto,
        cantidad: cabana.cantidad,
        descripcion: cabana.descripcion,
        destacado: cabana.destacado || '',
        photos: cabana.fotos?.length
          ? cabana.fotos.map((foto) => urlFor(foto).url())
          : fallbackPhotos[cabana.tipo] || [],
      }))
    : undefined

  return <CabanasClient cabanas={cabanas} tarifas={tarifasData} />
}

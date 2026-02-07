import { client } from '@/sanity/lib/client'
import { unidadesQuery, tarifasTemporadaQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import UnidadesClient, { UnidadType, TarifasData } from './UnidadesClient'

// Force dynamic rendering to show Sanity updates immediately
export const dynamic = 'force-dynamic'

interface SanityUnidad {
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

async function getUnidadesData() {
  try {
    const unidades = await client.fetch<SanityUnidad[]>(unidadesQuery)
    return unidades
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

export default async function UnidadesPage() {
  const [unidadesData, tarifasData] = await Promise.all([
    getUnidadesData(),
    getTarifasData()
  ])

  // Fallback photos for each unit type
  const fallbackPhotos: Record<string, string[]> = {
    duplex: ['/images/cabana1-interior.jpg', '/images/cabana2-interior.jpg', '/images/cabana2-habitacion.jpg'],
    standard: ['/images/cabana2-interior.jpg', '/images/cabana2-cocina.jpg', '/images/cabana2-habitacion.jpg'],
    compact: ['/images/cabana3-interior.jpg', '/images/cabana-con-vista.jpg'],
    couple: ['/images/vista-desde-cabana.jpg', '/images/cabana-con-vista.jpg'],
  }

  const unidades: UnidadType[] | undefined = unidadesData?.length
    ? unidadesData.map((unidad) => ({
        id: unidad._id,
        tipo: unidad.tipo,
        nombre: unidad.nombre,
        capacidad: unidad.capacidadTexto,
        cantidad: unidad.cantidad,
        descripcion: unidad.descripcion,
        destacado: unidad.destacado || '',
        photos: unidad.fotos?.length
          ? unidad.fotos.map((foto) => urlFor(foto).url())
          : fallbackPhotos[unidad.tipo] || [],
      }))
    : undefined

  return <UnidadesClient unidades={unidades} tarifas={tarifasData} />
}

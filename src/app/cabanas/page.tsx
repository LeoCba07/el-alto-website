import { client } from '@/sanity/lib/client'
import { cabanasQuery, tarifasQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import CabanasClient, { CabanaType } from './CabanasClient'

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

interface SanityTarifa {
  _id: string
  nombre: string
  temporada: string
  fechaInicio?: string
  fechaFin?: string
  precios?: Array<{
    tipoCabana: string
    precioNoche: number
  }>
}

async function getCabanasData() {
  try {
    const cabanas = await client.fetch<SanityCabana[]>(cabanasQuery, {}, {
      next: { revalidate: 60 }
    })
    return cabanas
  } catch {
    return null
  }
}

async function getTarifasData() {
  try {
    const tarifas = await client.fetch<SanityTarifa[]>(tarifasQuery, {}, {
      next: { revalidate: 60 }
    })
    return tarifas
  } catch {
    return null
  }
}

export default async function CabanasPage() {
  const [cabanasData, tarifasData] = await Promise.all([
    getCabanasData(),
    getTarifasData()
  ])

  const cabanas: CabanaType[] | undefined = cabanasData?.length
    ? cabanasData.map((cabana) => ({
        id: cabana._id,
        tipo: cabana.tipo,
        nombre: cabana.nombre,
        capacidad: cabana.capacidadTexto,
        cantidad: cabana.cantidad,
        descripcion: cabana.descripcion,
        destacado: cabana.destacado || '',
        photos: cabana.fotos?.map((foto) => urlFor(foto).url()) || [],
      }))
    : undefined

  // Transform tarifas data if available
  // For now, we'll use the default tarifas since the structure is complex
  // and would need specific Sanity data to be populated

  return <CabanasClient cabanas={cabanas} />
}

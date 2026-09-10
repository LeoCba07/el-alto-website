import { client } from '@/sanity/lib/client'
import { unidadesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { DEFAULT_AMENITIES } from '@/lib/constants'
import UnidadesClient, { UnidadType } from './UnidadesClient'

// Force dynamic rendering to show Sanity updates immediately
export const dynamic = 'force-dynamic'

interface SanityUnidad {
  _id: string
  nombre: string
  tipo: string
  descripcion: string
  destacado?: string
  capacidadTexto: string
  cantidad: number
  amenities?: string[]
  fotos?: Array<{
    asset: { _ref: string }
    alt?: string
  }>
}

async function getUnidadesData() {
  try {
    const unidades = await client.fetch<SanityUnidad[]>(unidadesQuery)
    return unidades
  } catch {
    return null
  }
}

export default async function UnidadesPage() {
  const unidadesData = await getUnidadesData()

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
        amenities: unidad.amenities?.length ? unidad.amenities : [...DEFAULT_AMENITIES],
        descripcion: unidad.descripcion,
        destacado: unidad.destacado || '',
        photos: unidad.fotos?.length
          ? unidad.fotos.map((foto) => ({ url: urlFor(foto).url(), alt: foto.alt }))
          : fallbackPhotos[unidad.tipo] || [],
      }))
    : undefined

  return <UnidadesClient unidades={unidades} />
}

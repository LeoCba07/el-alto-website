import { createClient } from '@sanity/client'
import { promises as fs } from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-12-18',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const serviciosDestacados = [
  {
    nombre: 'Pileta al aire libre',
    descripcion: 'Vista a las sierras. Climatizada en primavera y otoño.',
    detalle: 'Horario: 9:30 a 22:00 hs',
    imagePath: 'public/images/panorama-pileta.jpg',
    orden: 1,
  },
  {
    nombre: 'Quincho con asadores',
    descripcion: 'Espacio común para disfrutar un asado en familia.',
    detalle: 'Reservá en recepción',
    imagePath: 'public/images/asador.jpg',
    orden: 2,
  },
  {
    nombre: 'Vistas a la montaña',
    descripcion: 'Predio escalonado con jardín y panorámicas.',
    detalle: '',
    imagePath: 'public/images/vista-desde-cabana.jpg',
    orden: 3,
  },
]

async function uploadImage(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath)
  const imageBuffer = await fs.readFile(fullPath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(filePath),
  })
  return asset._id
}

async function seedServiciosDestacados() {
  console.log('Seeding servicios destacados...\n')

  for (const servicio of serviciosDestacados) {
    console.log(`Creating: ${servicio.nombre}`)

    // Upload image
    const imageAssetId = await uploadImage(servicio.imagePath)
    console.log(`  - Uploaded image: ${imageAssetId}`)

    // Create document
    const doc = await client.create({
      _type: 'servicio',
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      detalle: servicio.detalle || undefined,
      categoria: 'destacado',
      orden: servicio.orden,
      imagen: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      },
    })

    console.log(`  - Created document: ${doc._id}\n`)
  }

  console.log('Done! Created 3 servicios destacados.')
}

seedServiciosDestacados().catch(console.error)

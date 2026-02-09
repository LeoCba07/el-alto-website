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

const fotoPaths = [
  'public/images/cabana1-interior.jpg',
  'public/images/cabana2-interior.jpg',
  'public/images/cabana-con-vista.jpg',
  'public/images/cabana2-cocina.jpg',
  'public/images/cabana3-interior.jpg',
  'public/images/cabana2-habitacion.jpg',
]

async function uploadImage(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath)
  const imageBuffer = await fs.readFile(fullPath)
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(filePath),
  })
  return asset._id
}

async function seedUnidadesDestacadas() {
  console.log('Seeding unidades destacadas...\n')

  // Upload all photos
  const fotoRefs = []
  for (const fotoPath of fotoPaths) {
    console.log(`Uploading: ${fotoPath}`)
    const assetId = await uploadImage(fotoPath)
    fotoRefs.push({
      _type: 'image' as const,
      _key: path.basename(fotoPath, path.extname(fotoPath)),
      asset: {
        _type: 'reference' as const,
        _ref: assetId,
      },
    })
    console.log(`  - Uploaded: ${assetId}`)
  }

  // Create singleton document
  const doc = await client.createOrReplace({
    _id: 'unidadesDestacadas',
    _type: 'unidadesDestacadas',
    fotos: fotoRefs,
    insignia: 'Variedad para todos',
    tituloPanelInfo: 'Confort en las sierras',
    descripcionPanelInfo:
      'Unidades completamente equipadas con cocina, Wi-Fi, cochera cubierta y acceso a pileta y quincho. Opciones para parejas, familias y grupos.',
  })

  console.log(`\nCreated document: ${doc._id}`)
  console.log('Done!')
}

seedUnidadesDestacadas().catch(console.error)

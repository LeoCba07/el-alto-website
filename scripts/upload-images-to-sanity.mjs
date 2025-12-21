// Upload images to Sanity and update documents
// Run with: node scripts/upload-images-to-sanity.mjs

import fs from 'fs'
import path from 'path'

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

// Upload an image and return the asset reference
async function uploadImage(filePath) {
  const fileName = path.basename(filePath)
  const fileBuffer = fs.readFileSync(filePath)

  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/assets/images/${DATASET}?filename=${fileName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: fileBuffer
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to upload ${fileName}: ${await response.text()}`)
  }

  const result = await response.json()
  return result.document._id
}

// Update a document with a patch
async function patchDocument(documentId, patch) {
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({
        mutations: [{ patch: { id: documentId, set: patch } }]
      })
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to patch ${documentId}: ${await response.text()}`)
  }

  return response.json()
}

// Get documents by type
async function getDocuments(type) {
  const query = encodeURIComponent(`*[_type == "${type}"]{_id, nombre, tipo}`)
  const response = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    }
  )
  const data = await response.json()
  return data.result
}

async function main() {
  console.log('Uploading images to Sanity...\n')

  // Image mappings
  const cabanaImages = {
    duplex: ['cabana1-interior.jpg', 'cabana1-cocina.jpg', 'cabana2-habitacion.jpg'],
    standard: ['cabana2-interior.jpg', 'cabana2-cocina.jpg', 'cabana2-habitacion.jpg'],
    compact: ['cabana3-interior.jpg', 'cabana-con-vista.jpg'],
    couple: ['vista-desde-cabana.jpg', 'cabana-con-vista.jpg']
  }

  const servicioImages = {
    'Pileta al aire libre': 'panorama-pileta.jpg',
    'Quincho con asadores': 'asador.jpg',
    'Vistas a la montaña': 'vista-desde-cabana.jpg'
  }

  const heroImages = ['panorama-pileta.jpg', 'vista-desde-cabana.jpg', 'sierras.jpg']

  // Upload and cache image references
  const imageCache = {}

  async function getOrUploadImage(fileName) {
    if (imageCache[fileName]) return imageCache[fileName]

    const filePath = `public/images/${fileName}`
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠ File not found: ${fileName}`)
      return null
    }

    console.log(`  Uploading ${fileName}...`)
    const assetId = await uploadImage(filePath)
    imageCache[fileName] = assetId
    return assetId
  }

  try {
    // 1. Update Hero Section
    console.log('Updating Hero Section...')
    const heroImageRefs = []
    for (const img of heroImages) {
      const assetId = await getOrUploadImage(img)
      if (assetId) {
        heroImageRefs.push({
          _type: 'image',
          _key: img.replace('.jpg', ''),
          asset: { _type: 'reference', _ref: assetId }
        })
      }
    }
    await patchDocument('heroSection', { imagenes: heroImageRefs })
    console.log('✓ Hero section updated\n')

    // 2. Update Cabañas
    console.log('Updating Cabañas...')
    const cabanas = await getDocuments('cabana')
    for (const cabana of cabanas) {
      const images = cabanaImages[cabana.tipo]
      if (images) {
        const photoRefs = []
        for (const img of images) {
          const assetId = await getOrUploadImage(img)
          if (assetId) {
            photoRefs.push({
              _type: 'image',
              _key: img.replace('.jpg', ''),
              asset: { _type: 'reference', _ref: assetId }
            })
          }
        }
        await patchDocument(cabana._id, { fotos: photoRefs })
        console.log(`  ✓ ${cabana.nombre}`)
      }
    }
    console.log('')

    // 3. Update Servicios Destacados
    console.log('Updating Servicios Destacados...')
    const servicios = await getDocuments('servicio')
    for (const servicio of servicios) {
      const imgFile = servicioImages[servicio.nombre]
      if (imgFile) {
        const assetId = await getOrUploadImage(imgFile)
        if (assetId) {
          await patchDocument(servicio._id, {
            imagen: {
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId }
            }
          })
          console.log(`  ✓ ${servicio.nombre}`)
        }
      }
    }

    console.log('\n✅ All images uploaded successfully!')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()

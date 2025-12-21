// Remove deprecated fields from Sanity documents
// Run with: node --env-file=.env.local scripts/cleanup-sanity-fields.mjs

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

async function unsetFields(documentId, fields) {
  const unset = fields.map(f => `"${f}"`)
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      mutations: [{
        patch: {
          id: documentId,
          unset: fields
        }
      }]
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to patch ${documentId}: ${error}`)
  }

  return response.json()
}

async function getDocumentsByType(type) {
  const query = encodeURIComponent(`*[_type == "${type}"]{ _id }`)
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
  console.log('Cleaning up deprecated fields from Sanity...\n')

  // Clean heroSection
  console.log('Cleaning heroSection...')
  try {
    await unsetFields('heroSection', ['linkBoton', 'textoBoton', 'badges'])
    console.log('  ✓ Removed linkBoton, textoBoton, badges')
  } catch (e) {
    console.log('  ⚠ heroSection not found or already clean')
  }

  // Clean cabanas
  console.log('\nCleaning cabanas...')
  const cabanas = await getDocumentsByType('cabana')
  for (const cabana of cabanas) {
    try {
      await unsetFields(cabana._id, ['amenities', 'capacidadMaxima', 'slug', 'precioBase'])
      console.log(`  ✓ ${cabana._id}`)
    } catch (e) {
      console.log(`  ⚠ ${cabana._id}: ${e.message}`)
    }
  }

  // Clean testimonios (old field names if any)
  console.log('\nCleaning testimonios...')
  const testimonios = await getDocumentsByType('testimonio')
  for (const t of testimonios) {
    try {
      await unsetFields(t._id, ['cita', 'autor', 'calificacion', 'fuente', 'fecha', 'destacado'])
      console.log(`  ✓ ${t._id}`)
    } catch (e) {
      console.log(`  ⚠ ${t._id}: ${e.message}`)
    }
  }

  // Clean servicios (old fields)
  console.log('\nCleaning servicios...')
  const servicios = await getDocumentsByType('servicio')
  for (const s of servicios) {
    try {
      await unsetFields(s._id, ['icono', 'precio', 'orden'])
      console.log(`  ✓ ${s._id}`)
    } catch (e) {
      console.log(`  ⚠ ${s._id}: ${e.message}`)
    }
  }

  console.log('\n✅ Cleanup complete!')
}

main()

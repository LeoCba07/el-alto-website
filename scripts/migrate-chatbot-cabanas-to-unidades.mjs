// Migrate chatbot responses from "cabanas" to "unidades"
// Run with: node --env-file=.env.local scripts/migrate-chatbot-cabanas-to-unidades.mjs
//
// This script updates:
// 1. Documents with clave: "cabanas" → clave: "unidades"
// 2. opcionesSeguimiento arrays: "ver_cabanas" → "ver_unidades"

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  console.error('Run with: node --env-file=.env.local scripts/migrate-chatbot-cabanas-to-unidades.mjs')
  process.exit(1)
}

const API_VERSION = 'v2024-01-01'
const QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}`
const MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`

async function fetchChatbotResponses() {
  const query = encodeURIComponent('*[_type == "chatbotRespuesta"]')
  const response = await fetch(`${QUERY_URL}?query=${query}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch chatbot responses: ${await response.text()}`)
  }

  const data = await response.json()
  return data.result
}

async function patchDocument(id, patches) {
  const response = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      mutations: [{
        patch: {
          id,
          ...patches
        }
      }]
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to patch ${id}: ${error}`)
  }

  return response.json()
}

async function main() {
  console.log('🔄 Migrating chatbot responses from cabanas to unidades...\n')

  const responses = await fetchChatbotResponses()
  console.log(`Found ${responses.length} chatbot response(s).\n`)

  let updatedCount = 0

  for (const doc of responses) {
    const patches = {}
    let needsUpdate = false

    // Check if clave needs to be updated
    if (doc.clave === 'cabanas') {
      patches.set = { clave: 'unidades' }
      needsUpdate = true
      console.log(`  • ${doc._id}: clave "cabanas" → "unidades"`)
    }

    // Check if opcionesSeguimiento contains "ver_cabanas"
    if (doc.opcionesSeguimiento?.includes('ver_cabanas')) {
      const newOpciones = doc.opcionesSeguimiento.map(opt =>
        opt === 'ver_cabanas' ? 'ver_unidades' : opt
      )
      patches.set = { ...patches.set, opcionesSeguimiento: newOpciones }
      needsUpdate = true
      console.log(`  • ${doc._id}: opcionesSeguimiento "ver_cabanas" → "ver_unidades"`)
    }

    if (needsUpdate) {
      try {
        await patchDocument(doc._id, patches)
        console.log(`    ✓ Updated`)
        updatedCount++
      } catch (error) {
        console.error(`    ✗ Failed: ${error.message}`)
      }
    }
  }

  if (updatedCount === 0) {
    console.log('No documents needed updating.')
  } else {
    console.log(`\n✅ Updated ${updatedCount} document(s).`)
  }
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})

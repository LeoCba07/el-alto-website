// Migrate documents from _type: "cabana" to _type: "unidad"
// Run with: node --env-file=.env.local scripts/migrate-cabana-to-unidad.mjs
//
// This script:
// 1. Fetches all documents with _type == "cabana"
// 2. Creates new documents with _type == "unidad" (same data)
// 3. Deletes the old "cabana" documents
//
// Note: _type is immutable in Sanity, so we must delete and recreate.

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  console.error('Run with: node --env-file=.env.local scripts/migrate-cabana-to-unidad.mjs')
  process.exit(1)
}

const API_VERSION = 'v2024-01-01'
const QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}`
const MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`

async function fetchCabanas() {
  // Fetch all cabana documents with all their fields
  const query = encodeURIComponent('*[_type == "cabana"]')
  const response = await fetch(`${QUERY_URL}?query=${query}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch cabanas: ${await response.text()}`)
  }

  const data = await response.json()
  return data.result
}

async function deleteDocument(id) {
  const response = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      mutations: [{ delete: { id } }]
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to delete ${id}: ${error}`)
  }

  return response.json()
}

async function createDocument(doc) {
  const response = await fetch(MUTATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      mutations: [{ create: doc }]
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create document: ${error}`)
  }

  return response.json()
}

async function main() {
  console.log('🔄 Migrating cabana documents to unidad...\n')

  // Fetch all cabana documents
  console.log('Fetching cabana documents...')
  const cabanas = await fetchCabanas()

  if (cabanas.length === 0) {
    console.log('No cabana documents found. Migration not needed.')
    return
  }

  console.log(`Found ${cabanas.length} cabana document(s) to migrate.\n`)

  // Prepare new documents (transform _type, remove _rev, generate new _id)
  const newDocuments = cabanas.map(cabana => {
    const { _type, _rev, _id, ...rest } = cabana
    return {
      ...rest,
      _id: `unidad-${_id}`, // New ID to avoid conflicts
      _type: 'unidad',
      _originalId: _id // Keep reference to original ID for tracking
    }
  })

  // Step 1: Create all new unidad documents
  console.log('Step 1: Creating new unidad documents...')
  let createSuccessCount = 0
  for (const doc of newDocuments) {
    try {
      const { _originalId, ...docToCreate } = doc
      await createDocument(docToCreate)
      console.log(`  ✓ Created: ${doc.nombre || doc._id}`)
      createSuccessCount++
    } catch (error) {
      console.error(`  ✗ Failed to create: ${doc.nombre || doc._id} - ${error.message}`)
    }
  }

  // Step 2: Delete old cabana documents
  console.log('\nStep 2: Deleting old cabana documents...')
  let deleteSuccessCount = 0
  for (const cabana of cabanas) {
    try {
      await deleteDocument(cabana._id)
      console.log(`  ✓ Deleted: ${cabana.nombre || cabana._id}`)
      deleteSuccessCount++
    } catch (error) {
      console.error(`  ✗ Failed to delete: ${cabana.nombre || cabana._id} - ${error.message}`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✅ Migration complete!`)
  console.log(`   Created: ${createSuccessCount}/${cabanas.length}`)
  console.log(`   Deleted: ${deleteSuccessCount}/${cabanas.length}`)
}

main().catch(error => {
  console.error('Migration failed:', error)
  process.exit(1)
})

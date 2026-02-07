// Fix chatbot response text that still mentions "cabanas/cabañas"
// Run with: node --env-file=.env.local scripts/fix-chatbot-response-text.mjs

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

const API_VERSION = 'v2024-01-01'
const QUERY_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/query/${DATASET}`
const MUTATE_URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`

async function fetchChatbotResponses() {
  const query = encodeURIComponent('*[_type == "chatbotRespuesta"]{ _id, clave, respuesta }')
  const response = await fetch(`${QUERY_URL}?query=${query}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  })
  const data = await response.json()
  return data.result
}

async function patchDocument(id, newRespuesta) {
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
          set: { respuesta: newRespuesta }
        }
      }]
    })
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json()
}

async function main() {
  console.log('🔄 Fixing chatbot response text...\n')

  const responses = await fetchChatbotResponses()
  let updatedCount = 0

  for (const doc of responses) {
    let newRespuesta = doc.respuesta

    // Replace variations of "cabanas/cabañas"
    newRespuesta = newRespuesta
      .replace(/cabañas/gi, 'unidades')
      .replace(/cabanas/gi, 'unidades')
      .replace(/cabaña/gi, 'unidad')
      .replace(/cabana/gi, 'unidad')

    if (newRespuesta !== doc.respuesta) {
      console.log(`Updating "${doc.clave}":`)
      console.log(`  Old: ${doc.respuesta}`)
      console.log(`  New: ${newRespuesta}`)

      try {
        await patchDocument(doc._id, newRespuesta)
        console.log(`  ✓ Updated\n`)
        updatedCount++
      } catch (error) {
        console.error(`  ✗ Failed: ${error.message}\n`)
      }
    }
  }

  if (updatedCount === 0) {
    console.log('No documents needed updating.')
  } else {
    console.log(`✅ Updated ${updatedCount} document(s).`)
  }
}

main().catch(console.error)

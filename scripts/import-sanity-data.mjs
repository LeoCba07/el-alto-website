// Sanity Data Import Script
// Run with: node scripts/import-sanity-data.mjs

const PROJECT_ID = 'tw1o0dkg'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN environment variable')
  process.exit(1)
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

async function createDocument(doc) {
  const response = await fetch(API_URL, {
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
    throw new Error(`Failed to create ${doc._type}: ${error}`)
  }

  return response.json()
}

// ============ DATA ============

// Configuración del Sitio
const configuracionSitio = {
  _type: 'configuracionSitio',
  _id: 'configuracionSitio',
  numeroWhatsapp: '5493572501030',
  email: 'info@complejoelalto.com.ar',
  telefonoFijo: '+54 3541 498970',
  telefonoMovil: '+54 9 3572 501030',
  horarios: {
    checkIn: '13:30 hs',
    checkOut: '10:00 hs',
    atencionTelefonica: '9 a 19 hs'
  },
  redesSociales: {
    instagram: 'https://instagram.com/complejoelalto',
    facebook: 'https://facebook.com/complejoelalto',
    tripadvisor: 'https://www.tripadvisor.com.ar/Hotel_Review-g1122037-d3439400-Reviews-Complejo_El_Alto-Tanti_Province_of_Cordoba_Central_Argentina.html'
  },
  direccion: {
    calle: 'Ruta Provincial N°28 y San Martín 1130',
    ciudad: 'Tanti',
    provincia: 'Córdoba',
    codigoPostal: '5155',
    ubicacion: {
      lat: -31.3607,
      lng: -64.5876
    }
  }
}

// Hero Section
const heroSection = {
  _type: 'heroSection',
  _id: 'heroSection',
  subtitulo: 'Complejo de cabañas en Tanti, Córdoba',
  titulo: 'El Alto',
  descripcion: 'Tranquilidad serrana con calidez familiar',
  textoBoton: 'Ver alojamientos',
  linkBoton: '/cabanas'
}

// Cabañas
const cabanas = [
  {
    _type: 'cabana',
    nombre: 'Dúplex',
    slug: { _type: 'slug', current: 'duplex' },
    tipo: 'duplex',
    descripcion: 'Dos plantas amplias con living-comedor abajo y dormitorios arriba. Ideales para familias o grupos.',
    destacado: 'Máxima capacidad',
    capacidadTexto: 'Hasta 6',
    capacidadMaxima: 6,
    cantidad: 2,
    orden: 1,
    amenities: ['Wi-Fi', 'Cocina equipada', 'TV cable', 'Calefacción', 'Ropa blanca']
  },
  {
    _type: 'cabana',
    nombre: 'Estándar',
    slug: { _type: 'slug', current: 'standard' },
    tipo: 'standard',
    descripcion: 'Amplias y completas, con todo lo necesario para una estadía confortable.',
    destacado: 'Las más populares',
    capacidadTexto: '2 a 4',
    capacidadMaxima: 4,
    cantidad: 4,
    orden: 2,
    amenities: ['Wi-Fi', 'Cocina equipada', 'TV cable', 'Calefacción', 'Ropa blanca']
  },
  {
    _type: 'cabana',
    nombre: 'Compactas',
    slug: { _type: 'slug', current: 'compact' },
    tipo: 'compact',
    descripcion: 'Funcionales y acogedoras, con excelente relación precio-calidad.',
    destacado: 'Mejor precio',
    capacidadTexto: '2 a 3',
    capacidadMaxima: 3,
    cantidad: 4,
    orden: 3,
    amenities: ['Wi-Fi', 'Cocina equipada', 'TV cable', 'Calefacción', 'Ropa blanca']
  },
  {
    _type: 'cabana',
    nombre: 'Parejas',
    slug: { _type: 'slug', current: 'couple' },
    tipo: 'couple',
    descripcion: 'Íntimas y románticas, perfectas para una escapada en pareja.',
    destacado: 'Románticas',
    capacidadTexto: '2',
    capacidadMaxima: 2,
    cantidad: 2,
    orden: 4,
    amenities: ['Wi-Fi', 'Cocina equipada', 'TV cable', 'Calefacción', 'Ropa blanca']
  }
]

// Servicios Destacados
const serviciosDestacados = [
  {
    _type: 'servicio',
    nombre: 'Pileta al aire libre',
    descripcion: 'Vista a las sierras. Climatizada en primavera y otoño.',
    icono: 'pool',
    categoria: 'destacado',
    detalle: 'Horario: 9:30 a 22:00 hs',
    orden: 1
  },
  {
    _type: 'servicio',
    nombre: 'Quincho con asadores',
    descripcion: 'Espacio común para disfrutar un asado en familia.',
    icono: 'grill',
    categoria: 'destacado',
    detalle: 'Reservá en recepción',
    orden: 2
  },
  {
    _type: 'servicio',
    nombre: 'Vistas a la montaña',
    descripcion: 'Predio escalonado con jardín y panorámicas.',
    icono: 'mountain',
    categoria: 'destacado',
    orden: 3
  }
]

// Servicios en Unidad
const serviciosUnidad = [
  { _type: 'servicio', nombre: 'Wi-Fi gratis', icono: 'wifi', categoria: 'unidad', orden: 1 },
  { _type: 'servicio', nombre: 'Cocina equipada', icono: 'kitchen', categoria: 'unidad', detalle: 'horno, microondas, heladera, vajilla', orden: 2 },
  { _type: 'servicio', nombre: 'Ropa de cama y toallas', icono: 'bed', categoria: 'unidad', orden: 3 },
  { _type: 'servicio', nombre: 'TV con cable', icono: 'tv', categoria: 'unidad', orden: 4 },
  { _type: 'servicio', nombre: 'Calefacción y ventiladores', icono: 'climate', categoria: 'unidad', orden: 5 },
  { _type: 'servicio', nombre: 'Caja de seguridad', icono: 'safe', categoria: 'unidad', orden: 6 },
  { _type: 'servicio', nombre: 'Secador de pelo', icono: 'hairdryer', categoria: 'unidad', orden: 7 }
]

// Servicios en Complejo
const serviciosComplejo = [
  { _type: 'servicio', nombre: 'Cochera techada', icono: 'car', categoria: 'complejo', detalle: '1 por unidad', orden: 1 },
  { _type: 'servicio', nombre: 'Sala de juegos para chicos', icono: 'kids', categoria: 'complejo', orden: 2 },
  { _type: 'servicio', nombre: 'Info turística y excursiones', icono: 'map', categoria: 'complejo', orden: 3 },
  { _type: 'servicio', nombre: 'Guardado de equipaje', icono: 'luggage', categoria: 'complejo', orden: 4 },
  { _type: 'servicio', nombre: 'Recepción', icono: 'reception', categoria: 'complejo', detalle: '9 a 19 hs', orden: 5 }
]

// Servicios Opcionales
const serviciosOpcionales = [
  { _type: 'servicio', nombre: 'Aire acondicionado', descripcion: 'Opcional para mantener tarifas accesibles.', icono: 'ac', categoria: 'opcional', precio: '$2.500/día', orden: 1 },
  { _type: 'servicio', nombre: 'Desayuno', descripcion: 'Desayuno seco servido en tu unidad.', icono: 'breakfast', categoria: 'opcional', precio: 'Consultar', detalle: 'Disponibilidad limitada', orden: 2 }
]

// Testimonios
const testimonios = [
  {
    _type: 'testimonio',
    nombre: 'María L.',
    comentario: 'Excelente atención, muy buena relación precio-calidad. Volvemos siempre!',
    rating: 5,
    ubicacion: 'TripAdvisor',
    orden: 1
  },
  {
    _type: 'testimonio',
    nombre: 'Carlos R.',
    comentario: 'Pileta y quincho espectaculares. La vista a las sierras es hermosa. Muy tranquilo.',
    rating: 5,
    ubicacion: 'TripAdvisor',
    orden: 2
  },
  {
    _type: 'testimonio',
    nombre: 'Ana G.',
    comentario: 'Ubicación ideal, cerca del centro pero con toda la tranquilidad. Muy recomendable.',
    rating: 5,
    ubicacion: 'Google',
    orden: 3
  }
]

// Preguntas Frecuentes
const preguntasFrecuentes = [
  // Reservas
  { _type: 'preguntaFrecuente', pregunta: '¿Cómo hago mi reserva?', respuesta: 'Contactanos por WhatsApp o teléfono. Te tomamos la reserva provisoria y te enviamos los datos bancarios para confirmar con la seña.', categoria: 'reservas', orden: 1 },
  { _type: 'preguntaFrecuente', pregunta: '¿Cuánto es la seña?', respuesta: '30% del total. Para estadías de 2 noches o menos, es el 50%.', categoria: 'reservas', orden: 2 },
  { _type: 'preguntaFrecuente', pregunta: '¿Hay estadía mínima?', respuesta: 'En temporada alta/media sí. En temporada baja podés reservar una sola noche.', categoria: 'reservas', orden: 3 },
  { _type: 'preguntaFrecuente', pregunta: '¿Aceptan tarjeta?', respuesta: 'Sí, todas las tarjetas vía Mercado Pago.', categoria: 'reservas', orden: 4 },
  { _type: 'preguntaFrecuente', pregunta: '¿Puedo cancelar mi reserva?', respuesta: 'Depende de la temporada. En alta/media, hasta 30 días antes para reembolso total (entre 15-29 días se cobra 1 noche). En baja, hasta 72hs antes.', categoria: 'reservas', orden: 5 },
  { _type: 'preguntaFrecuente', pregunta: '¿Puedo modificar las fechas?', respuesta: 'Una vez confirmada la reserva, no es posible modificar las fechas.', categoria: 'reservas', orden: 6 },

  // Horarios
  { _type: 'preguntaFrecuente', pregunta: '¿Check-in y check-out?', respuesta: 'Check-in desde las 13:30 hs. Check-out hasta las 10:00 hs.', categoria: 'horarios', orden: 1 },
  { _type: 'preguntaFrecuente', pregunta: '¿Puedo llegar tarde?', respuesta: 'Hasta las 20:00 sin aviso. Más tarde avisanos porque no hay sereno nocturno.', categoria: 'horarios', orden: 2 },
  { _type: 'preguntaFrecuente', pregunta: '¿Late check-out?', respuesta: 'Sí, hasta las 18:00 con 50% de recargo, sujeto a disponibilidad.', categoria: 'horarios', orden: 3 },
  { _type: 'preguntaFrecuente', pregunta: '¿Dónde dejo el equipaje si me voy tarde?', respuesta: 'En administración, sin cargo, hasta tu partida.', categoria: 'horarios', orden: 4 },
  { _type: 'preguntaFrecuente', pregunta: '¿Horario de la pileta?', respuesta: 'De 9:30 a 22:00 hs. Niños siempre acompañados por un adulto.', categoria: 'horarios', orden: 5 },

  // Servicios
  { _type: 'preguntaFrecuente', pregunta: '¿Qué incluyen las cabañas?', respuesta: 'Cocina equipada, ropa blanca, TV con cable, calefacción y baño privado.', categoria: 'servicios', orden: 1 },
  { _type: 'preguntaFrecuente', pregunta: '¿Tienen aire acondicionado?', respuesta: 'Sí, con costo adicional. La calefacción está incluida.', categoria: 'servicios', orden: 2 },
  { _type: 'preguntaFrecuente', pregunta: '¿Incluye servicio de mucama?', respuesta: 'No, así mantenemos precios competitivos.', categoria: 'servicios', orden: 3 },
  { _type: 'preguntaFrecuente', pregunta: '¿Tienen silla alta para bebé?', respuesta: 'Sí, consultá disponibilidad al reservar.', categoria: 'servicios', orden: 4 },
  { _type: 'preguntaFrecuente', pregunta: '¿Hay Wi-Fi?', respuesta: 'Sí, gratis en todo el predio.', categoria: 'servicios', orden: 5 },
  { _type: 'preguntaFrecuente', pregunta: '¿Hay cochera?', respuesta: 'Sí, una cubierta por unidad.', categoria: 'servicios', orden: 6 },

  // Normas
  { _type: 'preguntaFrecuente', pregunta: '¿Aceptan mascotas?', respuesta: 'No, para garantizar la tranquilidad de todos los huéspedes.', categoria: 'normas', orden: 1 },
  { _type: 'preguntaFrecuente', pregunta: '¿Se permiten visitas?', respuesta: 'No, el complejo es de uso exclusivo para huéspedes.', categoria: 'normas', orden: 2 },
  { _type: 'preguntaFrecuente', pregunta: '¿Hay límite de personas?', respuesta: 'Sí, no podemos exceder la capacidad indicada (bebés incluidos).', categoria: 'normas', orden: 3 },
  { _type: 'preguntaFrecuente', pregunta: '¿Seguro de viajero?', respuesta: 'No es obligatorio, pero la provincia lo recomienda.', categoria: 'normas', orden: 4 },

  // Ubicación
  { _type: 'preguntaFrecuente', pregunta: '¿Están cerca del centro?', respuesta: 'Sí, a 6 cuadras. El río y El Diquecito también están cerca.', categoria: 'ubicacion', orden: 1 },
  { _type: 'preguntaFrecuente', pregunta: '¿Hay supermercados?', respuesta: 'Despensas a 100m, supermercado grande a 3 cuadras.', categoria: 'ubicacion', orden: 2 },
  { _type: 'preguntaFrecuente', pregunta: '¿Cómo llego en colectivo?', respuesta: 'Terminal a 6 cuadras. Parada más cercana a 150m.', categoria: 'ubicacion', orden: 3 },
  { _type: 'preguntaFrecuente', pregunta: '¿A cuánto está Villa Carlos Paz?', respuesta: 'A 10 minutos en auto.', categoria: 'ubicacion', orden: 4 }
]

// ============ IMPORT ============

async function importAll() {
  console.log('Starting Sanity data import...\n')

  try {
    // Config & Hero (singleton documents with fixed IDs)
    console.log('Creating configuración del sitio...')
    await createDocument(configuracionSitio)
    console.log('✓ Configuración del sitio created')

    console.log('Creating hero section...')
    await createDocument(heroSection)
    console.log('✓ Hero section created')

    // Cabañas
    console.log('\nCreating cabañas...')
    for (const cabana of cabanas) {
      await createDocument(cabana)
      console.log(`  ✓ ${cabana.nombre}`)
    }

    // Servicios
    console.log('\nCreating servicios destacados...')
    for (const servicio of serviciosDestacados) {
      await createDocument(servicio)
      console.log(`  ✓ ${servicio.nombre}`)
    }

    console.log('\nCreating servicios en unidad...')
    for (const servicio of serviciosUnidad) {
      await createDocument(servicio)
      console.log(`  ✓ ${servicio.nombre}`)
    }

    console.log('\nCreating servicios en complejo...')
    for (const servicio of serviciosComplejo) {
      await createDocument(servicio)
      console.log(`  ✓ ${servicio.nombre}`)
    }

    console.log('\nCreating servicios opcionales...')
    for (const servicio of serviciosOpcionales) {
      await createDocument(servicio)
      console.log(`  ✓ ${servicio.nombre}`)
    }

    // Testimonios
    console.log('\nCreating testimonios...')
    for (const testimonio of testimonios) {
      await createDocument(testimonio)
      console.log(`  ✓ ${testimonio.nombre}`)
    }

    // FAQs
    console.log('\nCreating preguntas frecuentes...')
    for (const faq of preguntasFrecuentes) {
      await createDocument(faq)
      console.log(`  ✓ ${faq.pregunta.substring(0, 30)}...`)
    }

    console.log('\n✅ All data imported successfully!')

  } catch (error) {
    console.error('\n❌ Import failed:', error.message)
    process.exit(1)
  }
}

importAll()

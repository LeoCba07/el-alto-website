import { groq } from 'next-sanity'

// Hero Section
export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    subtitulo,
    titulo,
    descripcion,
    imagenes[] {
      asset->
    }
  }
`

// Cabañas
export const cabanasQuery = groq`
  *[_type == "cabana"] | order(orden asc) {
    _id,
    nombre,
    slug,
    tipo,
    descripcion,
    destacado,
    capacidadTexto,
    capacidadMaxima,
    cantidad,
    amenities,
    fotos[] {
      asset->,
      alt
    },
    precioBase
  }
`

export const cabanaBySlugQuery = groq`
  *[_type == "cabana" && slug.current == $slug][0] {
    _id,
    nombre,
    slug,
    tipo,
    descripcion,
    destacado,
    capacidadTexto,
    capacidadMaxima,
    cantidad,
    amenities,
    fotos[] {
      asset->,
      alt
    },
    precioBase
  }
`

// Normas
export const normasQuery = groq`
  *[_type == "norma"] | order(categoria asc, orden asc) {
    _id,
    titulo,
    descripcion,
    icono,
    categoria,
    tipo,
    horario,
    detalle
  }
`

export const normasPorCategoriaQuery = groq`
  *[_type == "norma" && categoria == $categoria] | order(orden asc) {
    _id,
    titulo,
    descripcion,
    icono,
    tipo,
    horario,
    detalle
  }
`

// Preguntas Frecuentes
export const preguntasFrecuentesQuery = groq`
  *[_type == "preguntaFrecuente"] | order(categoria asc, orden asc) {
    _id,
    pregunta,
    respuesta,
    categoria
  }
`

export const preguntasPorCategoriaQuery = groq`
  *[_type == "preguntaFrecuente" && categoria == $categoria] | order(orden asc) {
    _id,
    pregunta,
    respuesta
  }
`

// Testimonios
export const testimoniosQuery = groq`
  *[_type == "testimonio"] | order(orden asc) {
    _id,
    nombre,
    ubicacion,
    comentario,
    rating,
    fecha,
    foto {
      asset->,
      alt
    }
  }
`

// Atracciones Cercanas
export const atraccionesCercanasQuery = groq`
  *[_type == "atraccionCercana"] | order(distancia asc) {
    _id,
    nombre,
    descripcion,
    distancia,
    tiempo,
    categoria,
    imagen {
      asset->,
      alt
    }
  }
`

// Tarifas por Temporada (single document with all 3 seasons)
export const tarifasTemporadaQuery = groq`
  *[_type == "tarifaTemporada"][0] {
    temporadaAlta {
      nombre,
      periodo,
      precios[] {
        capacidad,
        precio
      }
    },
    temporadaMedia {
      nombre,
      periodo,
      precios[] {
        capacidad,
        precio
      }
    },
    temporadaBaja {
      nombre,
      periodo,
      precios[] {
        capacidad,
        precio
      }
    }
  }
`

// Configuración del Sitio
export const configuracionSitioQuery = groq`
  *[_type == "configuracionSitio"][0] {
    numeroWhatsapp,
    email,
    telefonoMovil,
    horarios {
      checkIn,
      checkOut,
      lateCheckOut,
      lateCheckOutRecargo,
      llegadaMaxima,
      pileta {
        apertura,
        cierre
      },
      recepcion {
        apertura,
        cierre
      }
    },
    politicasReserva {
      senaPorcentaje,
      senaPorcentajeCorta,
      estadiaCortaMaxNoches,
      cancelacionAltaMedia {
        reembolsoTotalDias,
        reembolsoParcialDias
      },
      cancelacionBaja {
        reembolsoTotalHoras
      }
    },
    estadisticas {
      anosExperiencia,
      tripAdvisorRating,
      tripAdvisorMaxRating,
      cantidadResenas,
      rankingEnTanti
    },
    redesSociales {
      facebook,
      instagram,
      youtube,
      tripadvisor
    }
  }
`

// Chatbot Respuestas
export const chatbotRespuestasQuery = groq`
  *[_type == "chatbotRespuesta"] {
    clave,
    respuesta,
    opcionesSeguimiento
  }
`

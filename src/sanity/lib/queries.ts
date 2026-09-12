import { groq } from 'next-sanity'

// Hero Section
export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    subtitulo,
    titulo,
    descripcion,
    imagenes[] {
      asset->,
      alt
    }
  }
`

// Unidades
export const unidadesQuery = groq`
  *[_type == "unidad"] | order(orden asc) {
    _id,
    nombre,
    tipo,
    descripcion,
    destacado,
    capacidadTexto,
    cantidad,
    fotos[] {
      asset->,
      alt
    },
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

// Testimonios
export const testimoniosQuery = groq`
  *[_type == "testimonio"] | order(orden asc) {
    _id,
    nombre,
    ubicacion,
    comentario,
    rating
  }
`

// Tarifas por Temporada (single document with all 3 seasons)
export const tarifasTemporadaQuery = groq`
  *[_type == "tarifaTemporada"][0] {
    temporadaVigente,
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
      tripAdvisorRating,
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

// Unidades Destacadas (Home)
export const unidadesDestacadasQuery = groq`
  *[_type == "unidadesDestacadas"][0] {
    fotos[] { asset->, alt },
    insignia,
    tituloPanelInfo,
    descripcionPanelInfo
  }
`

// Videos (Home)
export const videosInicioQuery = groq`
  *[_type == "videosInicio"][0].videos[] {
    _key,
    titulo,
    url,
    fechaPublicacion,
    descripcion
  }
`

// Chatbot Respuestas
export const chatbotRespuestasQuery = groq`
  *[_type == "chatbotRespuesta"] {
    clave,
    respuesta
  }
`

// Unidades, as the assistant names them in its answer
export const chatbotUnidadesQuery = groq`
  *[_type == "unidad"] | order(orden asc) {
    nombre,
    capacidadTexto,
    cantidad
  }
`

// Servicios Destacados (feature cards on the homepage and /servicios).
// Every servicio is one of these photo cards.
export const serviciosDestacadosQuery = groq`
  *[_type == "servicio"] | order(orden asc) {
    _id,
    nombre,
    descripcion,
    detalle,
    imagen {
      asset->,
      alt
    }
  }
`

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
    },
    textoBoton,
    linkBoton,
    badges[] {
      texto,
      icono
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

// Servicios
export const serviciosQuery = groq`
  *[_type == "servicio"] | order(categoria asc, orden asc) {
    _id,
    nombre,
    descripcion,
    icono,
    categoria,
    imagen {
      asset->,
      alt
    },
    detalle,
    precio
  }
`

export const serviciosPorCategoriaQuery = groq`
  *[_type == "servicio" && categoria == $categoria] | order(orden asc) {
    _id,
    nombre,
    descripcion,
    icono,
    imagen {
      asset->,
      alt
    },
    detalle,
    precio
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

// Tarifas
export const tarifasQuery = groq`
  *[_type == "tarifa"] | order(orden asc) {
    _id,
    nombre,
    temporada,
    fechaInicio,
    fechaFin,
    precios[] {
      tipoCabana,
      precioNoche,
      precioSemana
    }
  }
`

// Configuración del Sitio
export const configuracionSitioQuery = groq`
  *[_type == "configuracionSitio"][0] {
    numeroWhatsapp,
    email,
    telefonoFijo,
    telefonoMovil,
    horarios {
      checkIn,
      checkOut,
      atencionTelefonica
    },
    redesSociales {
      facebook,
      instagram,
      youtube,
      tripadvisor
    },
    direccion {
      calle,
      ciudad,
      provincia,
      codigoPostal,
      ubicacion {
        lat,
        lng
      }
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

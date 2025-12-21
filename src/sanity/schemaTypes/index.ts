import { type SchemaTypeDefinition } from 'sanity'
import heroSection from './heroSection'
import cabana from './cabana'
import servicio from './servicio'
import testimonio from './testimonio'
import preguntaFrecuente from './preguntaFrecuente'
import chatbotRespuesta from './chatbotRespuesta'
import configuracionSitio from './configuracionSitio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection,
    cabana,
    servicio,
    testimonio,
    preguntaFrecuente,
    chatbotRespuesta,
    configuracionSitio,
  ],
}

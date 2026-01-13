import { type SchemaTypeDefinition } from 'sanity'
import heroSection from './heroSection'
import cabana from './cabana'
import testimonio from './testimonio'
import preguntaFrecuente from './preguntaFrecuente'
import chatbotRespuesta from './chatbotRespuesta'
import configuracionSitio from './configuracionSitio'
import tarifaTemporada from './tarifaTemporada'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection,
    cabana,
    testimonio,
    preguntaFrecuente,
    chatbotRespuesta,
    configuracionSitio,
    tarifaTemporada,
  ],
}

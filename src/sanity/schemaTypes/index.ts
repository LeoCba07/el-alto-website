import { type SchemaTypeDefinition } from 'sanity'
import heroSection from './heroSection'
import unidad from './unidad'
import testimonio from './testimonio'
import preguntaFrecuente from './preguntaFrecuente'
import chatbotRespuesta from './chatbotRespuesta'
import configuracionSitio from './configuracionSitio'
import tarifaTemporada from './tarifaTemporada'
import servicio from './servicio'
import unidadesDestacadas from './unidadesDestacadas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroSection,
    unidad,
    testimonio,
    preguntaFrecuente,
    chatbotRespuesta,
    configuracionSitio,
    tarifaTemporada,
    servicio,
    unidadesDestacadas,
  ],
}

import { type SchemaTypeDefinition } from 'sanity'
import cabana from './cabana'
import tarifa from './tarifa'
import preguntaFrecuente from './preguntaFrecuente'
import testimonio from './testimonio'
import atraccionCercana from './atraccionCercana'
import configuracionSitio from './configuracionSitio'
import servicio from './servicio'
import norma from './norma'
import heroSection from './heroSection'
import chatbotRespuesta from './chatbotRespuesta'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    cabana,
    tarifa,
    preguntaFrecuente,
    testimonio,
    atraccionCercana,
    configuracionSitio,
    servicio,
    norma,
    heroSection,
    chatbotRespuesta,
  ],
}

import { type SchemaTypeDefinition } from 'sanity'
import cabana from './cabana'
import tarifa from './tarifa'
import preguntaFrecuente from './preguntaFrecuente'
import testimonio from './testimonio'
import atraccionCercana from './atraccionCercana'
import configuracionSitio from './configuracionSitio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    cabana,
    tarifa,
    preguntaFrecuente,
    testimonio,
    atraccionCercana,
    configuracionSitio,
  ],
}

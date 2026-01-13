import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tarifaTemporada',
  title: 'Tarifas por Temporada',
  type: 'document',
  fields: [
    defineField({
      name: 'temporadaAlta',
      title: '🔴 Temporada Alta',
      type: 'object',
      fields: [
        defineField({
          name: 'nombre',
          title: 'Nombre',
          type: 'string',
          initialValue: 'Temporada Alta',
        }),
        defineField({
          name: 'periodo',
          title: 'Período',
          type: 'string',
          description: 'Ej: "Dic 28 - Feb, Carnaval, Semana Santa"',
        }),
        defineField({
          name: 'precios',
          title: 'Precios por capacidad',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'capacidad',
                  title: 'Capacidad',
                  type: 'string',
                  description: 'Ej: "2 personas", "2 + 1 menor", "2 a 4 personas"',
                }),
                defineField({
                  name: 'precio',
                  title: 'Precio por noche',
                  type: 'number',
                  description: 'En pesos argentinos',
                }),
              ],
              preview: {
                select: {
                  capacidad: 'capacidad',
                  precio: 'precio',
                },
                prepare({ capacidad, precio }) {
                  return {
                    title: capacidad || 'Sin capacidad',
                    subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : 'Sin precio',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'temporadaMedia',
      title: '🟡 Temporada Media',
      type: 'object',
      fields: [
        defineField({
          name: 'nombre',
          title: 'Nombre',
          type: 'string',
          initialValue: 'Temporada Media',
        }),
        defineField({
          name: 'periodo',
          title: 'Período',
          type: 'string',
          description: 'Ej: "Mar - Nov (excepto feriados largos)"',
        }),
        defineField({
          name: 'precios',
          title: 'Precios por capacidad',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'capacidad',
                  title: 'Capacidad',
                  type: 'string',
                  description: 'Ej: "2 personas", "2 + 1 menor", "2 a 4 personas"',
                }),
                defineField({
                  name: 'precio',
                  title: 'Precio por noche',
                  type: 'number',
                  description: 'En pesos argentinos',
                }),
              ],
              preview: {
                select: {
                  capacidad: 'capacidad',
                  precio: 'precio',
                },
                prepare({ capacidad, precio }) {
                  return {
                    title: capacidad || 'Sin capacidad',
                    subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : 'Sin precio',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'temporadaBaja',
      title: '🟢 Temporada Baja',
      type: 'object',
      fields: [
        defineField({
          name: 'nombre',
          title: 'Nombre',
          type: 'string',
          initialValue: 'Temporada Baja',
        }),
        defineField({
          name: 'periodo',
          title: 'Período',
          type: 'string',
          description: 'Ej: "Lun - Jue (excepto feriados)"',
        }),
        defineField({
          name: 'precios',
          title: 'Precios por capacidad',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'capacidad',
                  title: 'Capacidad',
                  type: 'string',
                  description: 'Ej: "2 personas", "2 + 1 menor", "2 a 4 personas"',
                }),
                defineField({
                  name: 'precio',
                  title: 'Precio por noche',
                  type: 'number',
                  description: 'En pesos argentinos',
                }),
              ],
              preview: {
                select: {
                  capacidad: 'capacidad',
                  precio: 'precio',
                },
                prepare({ capacidad, precio }) {
                  return {
                    title: capacidad || 'Sin capacidad',
                    subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : 'Sin precio',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Tarifas por Temporada',
        subtitle: 'Haz clic para actualizar precios',
      }
    },
  },
})

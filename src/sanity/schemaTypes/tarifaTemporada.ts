import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tarifaTemporada',
  title: 'Tarifas por Temporada',
  type: 'document',
  fields: [
    defineField({
      name: 'temporada',
      title: 'Temporada',
      type: 'string',
      options: {
        list: [
          { title: 'Temporada Alta', value: 'alta' },
          { title: 'Temporada Media', value: 'media' },
          { title: 'Temporada Baja', value: 'baja' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nombre',
      title: 'Nombre para mostrar',
      type: 'string',
      description: 'Ej: "Temporada Alta"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'periodo',
      title: 'Período',
      type: 'string',
      description: 'Ej: "Dic 28 - Feb, Carnaval, Semana Santa"',
      validation: (Rule) => Rule.required(),
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'precio',
              title: 'Precio por noche',
              type: 'number',
              description: 'Precio en pesos argentinos',
              validation: (Rule) => Rule.required().positive(),
            }),
          ],
          preview: {
            select: {
              capacidad: 'capacidad',
              precio: 'precio',
            },
            prepare({ capacidad, precio }) {
              return {
                title: capacidad,
                subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : '',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: '1 = Alta, 2 = Media, 3 = Baja',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Por orden',
      name: 'ordenAsc',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      nombre: 'nombre',
      periodo: 'periodo',
      precios: 'precios',
    },
    prepare({ nombre, periodo, precios }) {
      const precioMin = precios?.length ? Math.min(...precios.map((p: { precio: number }) => p.precio)) : 0
      const precioMax = precios?.length ? Math.max(...precios.map((p: { precio: number }) => p.precio)) : 0
      return {
        title: nombre || 'Sin nombre',
        subtitle: `${periodo} · $${precioMin.toLocaleString('es-AR')} - $${precioMax.toLocaleString('es-AR')}`,
      }
    },
  },
})

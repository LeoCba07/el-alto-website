import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cabana',
  title: 'Cabañas',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: Dúplex, Estándar, Compactas, Parejas',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nombre' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Dúplex', value: 'duplex' },
          { title: 'Estándar', value: 'standard' },
          { title: 'Compactas', value: 'compact' },
          { title: 'Parejas', value: 'couple' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destacado',
      title: 'Texto destacado',
      type: 'string',
      description: 'Ej: "Máxima capacidad", "Las más populares", "Mejor precio", "Románticas"',
    }),
    defineField({
      name: 'capacidadTexto',
      title: 'Capacidad (texto)',
      type: 'string',
      description: 'Ej: "Hasta 6", "2 a 4", "2 a 3", "2"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacidadMaxima',
      title: 'Capacidad máxima',
      type: 'number',
      description: 'Número máximo de personas',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'cantidad',
      title: 'Cantidad de unidades',
      type: 'number',
      description: 'Número de cabañas de este tipo',
      validation: (Rule) => Rule.required().positive().integer(),
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Comodidades y servicios disponibles',
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'precioBase',
      title: 'Precio Base',
      type: 'number',
      description: 'Precio base por noche en ARS',
      validation: (Rule) => Rule.required().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'capacidad',
      media: 'fotos.0',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: subtitle ? `Capacidad: ${subtitle} personas` : '',
        media: selection.media,
      }
    },
  },
})

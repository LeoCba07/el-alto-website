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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'capacidad',
      title: 'Capacidad',
      type: 'number',
      description: 'Número de personas',
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

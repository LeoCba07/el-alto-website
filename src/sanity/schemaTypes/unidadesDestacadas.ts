import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'unidadesDestacadas',
  title: 'Unidades Destacadas (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'fotos',
      title: 'Fotos del carrusel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'insignia',
      title: 'Insignia',
      type: 'string',
      description: 'Texto de la etiqueta destacada (ej: "Variedad para todos")',
    }),
    defineField({
      name: 'tituloPanelInfo',
      title: 'Título del panel informativo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcionPanelInfo',
      title: 'Descripción del panel informativo',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'tituloPanelInfo',
      media: 'fotos.0',
    },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
      description: 'Texto pequeño arriba del título (ej: "Bienvenidos a")',
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'imagenes',
      title: 'Imágenes del carrusel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
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
      name: 'textoBoton',
      title: 'Texto del botón',
      type: 'string',
      initialValue: 'Ver alojamientos',
    }),
    defineField({
      name: 'linkBoton',
      title: 'Link del botón',
      type: 'string',
      initialValue: '/cabanas',
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'texto', type: 'string', title: 'Texto' },
            { name: 'icono', type: 'string', title: 'Icono', options: {
              list: [
                { title: 'Estrella', value: 'star' },
                { title: 'Ubicación', value: 'location' },
                { title: 'Calendario', value: 'calendar' },
              ],
            }},
          ],
        },
      ],
      description: 'Badges que aparecen sobre el hero (ej: rating, ubicación)',
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagenes.0',
    },
  },
})

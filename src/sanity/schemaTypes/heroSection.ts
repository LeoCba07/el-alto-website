import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Página Principal',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
      description: 'Texto pequeño arriba del título',
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
      type: 'string',
      description: 'Frase debajo del título',
    }),
    defineField({
      name: 'imagenes',
      title: 'Imágenes del carrusel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagenes.0',
    },
  },
})

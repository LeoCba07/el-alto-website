import { defineType, defineField, defineArrayMember } from 'sanity'

// Accepts watch, youtu.be, embed and shorts links.
const YOUTUBE_URL = /^https?:\/\/(www\.|m\.)?(youtube\.com\/(watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)[\w-]{11}/

export default defineType({
  name: 'videosInicio',
  title: 'Videos (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Videos de YouTube que se muestran en el inicio, debajo de los testimonios. Si no hay ninguno, la sección no aparece.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'video',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link de YouTube',
              type: 'url',
              description: 'Ej: https://www.youtube.com/watch?v=HoDUt5H_jkI',
              validation: (Rule) =>
                Rule.required().custom((url) =>
                  !url || YOUTUBE_URL.test(url) ? true : 'Tiene que ser un link de YouTube'
                ),
            }),
            defineField({
              name: 'fechaPublicacion',
              title: 'Fecha de publicación',
              type: 'date',
              description: 'La fecha en que se subió a YouTube. Google la pide para mostrar el video en los resultados.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'descripcion',
              title: 'Descripción',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'url' },
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Videos (Home)' }),
  },
})

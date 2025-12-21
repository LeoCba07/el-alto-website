import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonio',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'comentario',
      title: 'Comentario',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ubicacion',
      title: 'Ubicación',
      type: 'string',
      description: 'Ciudad o provincia del huésped',
    }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      description: 'De 1 a 5 estrellas',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición',
    }),
  ],
  preview: {
    select: {
      nombre: 'nombre',
      rating: 'rating',
      comentario: 'comentario',
    },
    prepare(selection) {
      const { nombre, rating, comentario } = selection
      const stars = rating ? `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}` : ''
      const preview = comentario ? ` - ${comentario.substring(0, 50)}...` : ''
      return {
        title: nombre || 'Sin nombre',
        subtitle: `${stars}${preview}`,
      }
    },
  },
})

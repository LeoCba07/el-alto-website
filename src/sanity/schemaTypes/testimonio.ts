import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonio',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'cita',
      title: 'Cita',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'calificacion',
      title: 'Calificación',
      type: 'number',
      description: 'Calificación de 1 a 5 estrellas',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'fuente',
      title: 'Fuente',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Booking.com', value: 'booking' },
          { title: 'Airbnb', value: 'airbnb' },
          { title: 'TripAdvisor', value: 'tripadvisor' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Directo', value: 'directo' },
        ],
      },
      description: 'Plataforma donde se dejó el testimonio',
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha',
      type: 'date',
      description: 'Fecha del testimonio',
    }),
    defineField({
      name: 'destacado',
      title: 'Destacado',
      type: 'boolean',
      description: 'Marcar para mostrar en la página principal',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      autor: 'autor',
      calificacion: 'calificacion',
      cita: 'cita',
    },
    prepare(selection) {
      const { autor, calificacion, cita } = selection
      const stars = calificacion ? `${'★'.repeat(calificacion)}${'☆'.repeat(5 - calificacion)}` : ''
      const citaPreview = cita ? ` - ${cita.substring(0, 60)}...` : ''
      return {
        title: autor || 'Sin autor',
        subtitle: `${stars}${citaPreview}`,
      }
    },
  },
})

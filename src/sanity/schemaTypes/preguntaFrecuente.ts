import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'preguntaFrecuente',
  title: 'Preguntas Frecuentes',
  type: 'document',
  fields: [
    defineField({
      name: 'pregunta',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'respuesta',
      title: 'Respuesta',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Reservas', value: 'reservas' },
          { title: 'Check-in / Check-out', value: 'checkin-checkout' },
          { title: 'Servicios', value: 'servicios' },
          { title: 'Precios', value: 'precios' },
          { title: 'Ubicación', value: 'ubicacion' },
          { title: 'Mascotas', value: 'mascotas' },
          { title: 'Cancelaciones', value: 'cancelaciones' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de visualización (menor número aparece primero)',
      validation: (Rule) => Rule.integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'pregunta',
      categoria: 'categoria',
    },
    prepare(selection) {
      const { title, categoria } = selection
      return {
        title,
        subtitle: categoria,
      }
    },
  },
})

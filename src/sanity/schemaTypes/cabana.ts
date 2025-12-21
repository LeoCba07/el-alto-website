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
      rows: 2,
    }),
    defineField({
      name: 'destacado',
      title: 'Etiqueta',
      type: 'string',
      description: 'Ej: "Máxima capacidad", "Las más populares"',
    }),
    defineField({
      name: 'capacidadTexto',
      title: 'Capacidad',
      type: 'string',
      description: 'Ej: "Hasta 6", "2 a 4"',
    }),
    defineField({
      name: 'cantidad',
      title: 'Cantidad de unidades',
      type: 'number',
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Por orden',
      name: 'orden',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'capacidadTexto',
      media: 'fotos.0',
    },
  },
})

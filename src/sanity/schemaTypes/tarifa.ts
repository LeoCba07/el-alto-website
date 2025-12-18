import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tarifa',
  title: 'Tarifas',
  type: 'document',
  fields: [
    defineField({
      name: 'temporada',
      title: 'Temporada',
      type: 'string',
      options: {
        list: [
          { title: 'Temporada Alta', value: 'alta' },
          { title: 'Temporada Media', value: 'media' },
          { title: 'Temporada Baja', value: 'baja' },
          { title: 'Feriados', value: 'feriados' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cabana',
      title: 'Cabaña',
      type: 'reference',
      to: [{ type: 'cabana' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'number',
      description: 'Precio por noche en ARS',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'notas',
      title: 'Notas',
      type: 'text',
      rows: 3,
      description: 'Información adicional sobre esta tarifa',
    }),
  ],
  preview: {
    select: {
      temporada: 'temporada',
      cabana: 'cabana.nombre',
      precio: 'precio',
    },
    prepare(selection) {
      const { temporada, cabana, precio } = selection
      const temporadaLabels: Record<string, string> = {
        alta: 'Temporada Alta',
        media: 'Temporada Media',
        baja: 'Temporada Baja',
        feriados: 'Feriados',
      }
      return {
        title: `${cabana} - ${temporadaLabels[temporada] || temporada}`,
        subtitle: `$${precio.toLocaleString('es-AR')} ARS por noche`,
      }
    },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'norma',
  title: 'Normas',
  type: 'document',
  fields: [
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
      name: 'icono',
      title: 'Icono',
      type: 'string',
      options: {
        list: [
          { title: 'Check-in', value: 'checkin' },
          { title: 'Check-out', value: 'checkout' },
          { title: 'Pileta', value: 'pool' },
          { title: 'Pago', value: 'payment' },
          { title: 'Grupo', value: 'group' },
          { title: 'Permitido', value: 'allowed' },
          { title: 'No permitido', value: 'notAllowed' },
          { title: 'Mascotas', value: 'pets' },
          { title: 'Silencio', value: 'quiet' },
          { title: 'Estacionamiento', value: 'parking' },
          { title: 'Toallas', value: 'towels' },
          { title: 'Agua', value: 'water' },
          { title: 'Cancelación', value: 'cancel' },
        ],
      },
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Horarios', value: 'horarios' },
          { title: 'Lo que debés saber', value: 'informacion' },
          { title: 'Convivencia', value: 'convivencia' },
          { title: 'Políticas', value: 'politicas' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo de norma',
      type: 'string',
      options: {
        list: [
          { title: 'Permitido', value: 'permitido' },
          { title: 'No permitido', value: 'noPermitido' },
          { title: 'Información', value: 'info' },
        ],
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'horario',
      title: 'Horario',
      type: 'string',
      description: 'Solo para normas de tipo horario (ej: "13:00")',
    }),
    defineField({
      name: 'detalle',
      title: 'Detalle adicional',
      type: 'string',
      description: 'Texto pequeño debajo del horario o norma',
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de visualización dentro de la categoría',
    }),
  ],
  orderings: [
    {
      title: 'Por categoría y orden',
      name: 'categoriaOrden',
      by: [
        { field: 'categoria', direction: 'asc' },
        { field: 'orden', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      categoria: 'categoria',
      tipo: 'tipo',
    },
    prepare(selection) {
      const { title, categoria, tipo } = selection
      const categoriaLabels: Record<string, string> = {
        horarios: 'Horarios',
        informacion: 'Info',
        convivencia: 'Convivencia',
        politicas: 'Políticas',
      }
      const tipoEmoji = tipo === 'permitido' ? '✓' : tipo === 'noPermitido' ? '✗' : 'ℹ'
      return {
        title: `${tipoEmoji} ${title}`,
        subtitle: categoriaLabels[categoria] || categoria,
      }
    },
  },
})

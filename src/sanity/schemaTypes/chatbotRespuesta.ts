import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'chatbotRespuesta',
  title: 'Respuestas del Chatbot',
  type: 'document',
  fields: [
    defineField({
      name: 'clave',
      title: 'Clave',
      type: 'string',
      description: 'Identificador único (ej: servicios, ubicacion)',
      options: {
        // No "tarifas" or "unidades": the assistant builds those answers from
        // the prices and the unit documents.
        list: [
          { title: 'Disponibilidad', value: 'disponibilidad' },
          { title: 'Servicios', value: 'servicios' },
          { title: 'Más servicios', value: 'mas_servicios' },
          { title: 'Ubicación', value: 'ubicacion' },
          { title: 'Cómo llegar', value: 'como_llegar' },
          { title: 'Check-in/Check-out', value: 'checkin' },
          { title: 'Mascotas', value: 'mascotas' },
          { title: 'Formas de pago', value: 'pago' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'respuesta',
      title: 'Respuesta',
      type: 'text',
      rows: 3,
      description: 'Texto que responde el chatbot',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'opcionesSeguimiento',
      title: 'Opciones de seguimiento',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Ver tarifas', value: 'ver_tarifas' },
          { title: 'Ver unidades', value: 'ver_unidades' },
          { title: 'Consultar disponibilidad', value: 'consultar_disponibilidad' },
          { title: 'Otra pregunta', value: 'otra_pregunta' },
          { title: 'Más servicios', value: 'mas_servicios' },
          { title: 'Cómo llegar', value: 'como_llegar' },
          { title: 'Ver en Google Maps', value: 'ver_mapa' },
          { title: 'Iniciar consulta', value: 'iniciar_consulta' },
        ],
      },
      description: 'Botones que aparecen después de la respuesta',
      // No longer read: the buttons are wiring, set per answer in ChatBot.tsx.
      // Hidden rather than removed so the stored values don't show as unknown.
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'clave',
      subtitle: 'respuesta',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title?.charAt(0).toUpperCase() + title?.slice(1).replace(/_/g, ' '),
        subtitle: subtitle?.slice(0, 50) + (subtitle?.length > 50 ? '...' : ''),
      }
    },
  },
})

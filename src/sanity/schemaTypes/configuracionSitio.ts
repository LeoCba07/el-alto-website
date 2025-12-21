import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'configuracionSitio',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'numeroWhatsapp',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Solo números con código de país (ej: 5493572501030)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'telefonoFijo',
      title: 'Teléfono Fijo',
      type: 'string',
      description: 'Número de teléfono fijo (ej: +5403541498970)',
    }),
    defineField({
      name: 'telefonoMovil',
      title: 'Teléfono Móvil',
      type: 'string',
      description: 'Número de celular (ej: +5493572501030)',
    }),
    defineField({
      name: 'horarios',
      title: 'Horarios',
      type: 'object',
      fields: [
        {
          name: 'checkIn',
          title: 'Check-in',
          type: 'string',
          description: 'Hora de entrada (ej: "13:30")',
        },
        {
          name: 'checkOut',
          title: 'Check-out',
          type: 'string',
          description: 'Hora de salida (ej: "10:00")',
        },
        {
          name: 'lateCheckOut',
          title: 'Late Check-out',
          type: 'string',
          description: 'Hora máxima late checkout (ej: "18:00")',
        },
        {
          name: 'lateCheckOutRecargo',
          title: 'Recargo Late Check-out (%)',
          type: 'number',
          description: 'Porcentaje de recargo (ej: 50)',
        },
        {
          name: 'llegadaMaxima',
          title: 'Llegada máxima',
          type: 'string',
          description: 'Hora máxima de llegada (ej: "20:00")',
        },
        {
          name: 'pileta',
          title: 'Horario pileta',
          type: 'object',
          fields: [
            { name: 'apertura', title: 'Apertura', type: 'string', description: 'Ej: "9:30"' },
            { name: 'cierre', title: 'Cierre', type: 'string', description: 'Ej: "22:00"' },
          ],
        },
        {
          name: 'recepcion',
          title: 'Horario recepción',
          type: 'object',
          fields: [
            { name: 'apertura', title: 'Apertura', type: 'string', description: 'Ej: "9:00"' },
            { name: 'cierre', title: 'Cierre', type: 'string', description: 'Ej: "19:00"' },
          ],
        },
      ],
    }),
    defineField({
      name: 'politicasReserva',
      title: 'Políticas de Reserva',
      type: 'object',
      fields: [
        {
          name: 'senaPorcentaje',
          title: 'Seña (%)',
          type: 'number',
          description: 'Porcentaje de seña para reservar (ej: 30)',
        },
        {
          name: 'senaPorcentajeCorta',
          title: 'Seña estadía corta (%)',
          type: 'number',
          description: 'Porcentaje para estadías cortas (ej: 50)',
        },
        {
          name: 'estadiaCortaMaxNoches',
          title: 'Noches máx estadía corta',
          type: 'number',
          description: 'Máximo de noches para estadía corta (ej: 2)',
        },
        {
          name: 'cancelacionAltaMedia',
          title: 'Cancelación Temp. Alta/Media',
          type: 'object',
          fields: [
            { name: 'reembolsoTotalDias', title: 'Días para reembolso total', type: 'number' },
            { name: 'reembolsoParcialDias', title: 'Días para reembolso parcial', type: 'number' },
          ],
        },
        {
          name: 'cancelacionBaja',
          title: 'Cancelación Temp. Baja',
          type: 'object',
          fields: [
            { name: 'reembolsoTotalHoras', title: 'Horas antes para reembolso', type: 'number' },
          ],
        },
        {
          name: 'mediosDePago',
          title: 'Medios de pago',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Ej: Transferencia bancaria, Mercado Pago',
        },
      ],
    }),
    defineField({
      name: 'estadisticas',
      title: 'Estadísticas y Reputación',
      type: 'object',
      fields: [
        {
          name: 'anosExperiencia',
          title: 'Años de experiencia',
          type: 'number',
          description: 'Años desde que inició el complejo',
        },
        {
          name: 'tripAdvisorRating',
          title: 'Rating TripAdvisor',
          type: 'number',
          description: 'Calificación actual (ej: 4.6)',
        },
        {
          name: 'tripAdvisorMaxRating',
          title: 'Rating máximo TripAdvisor',
          type: 'number',
          description: 'Generalmente 5',
        },
        {
          name: 'cantidadResenas',
          title: 'Cantidad de reseñas',
          type: 'number',
        },
        {
          name: 'rankingEnTanti',
          title: 'Ranking en Tanti',
          type: 'number',
          description: 'Posición en ranking de alojamientos',
        },
      ],
    }),
    defineField({
      name: 'redesSociales',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'tripadvisor',
          title: 'TripAdvisor',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'object',
      fields: [
        {
          name: 'calle',
          title: 'Calle',
          type: 'string',
        },
        {
          name: 'ciudad',
          title: 'Ciudad',
          type: 'string',
        },
        {
          name: 'provincia',
          title: 'Provincia',
          type: 'string',
        },
        {
          name: 'codigoPostal',
          title: 'Código Postal',
          type: 'string',
        },
        {
          name: 'ubicacion',
          title: 'Ubicación en mapa',
          type: 'object',
          fields: [
            {
              name: 'lat',
              title: 'Latitud',
              type: 'number',
            },
            {
              name: 'lng',
              title: 'Longitud',
              type: 'number',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Configuración del Sitio',
      }
    },
  },
})

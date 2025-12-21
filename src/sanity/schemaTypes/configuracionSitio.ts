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
      title: 'Horarios de atención',
      type: 'object',
      fields: [
        {
          name: 'checkIn',
          title: 'Check-in',
          type: 'string',
          description: 'Ej: "14:00 hs"',
        },
        {
          name: 'checkOut',
          title: 'Check-out',
          type: 'string',
          description: 'Ej: "10:00 hs"',
        },
        {
          name: 'atencionTelefonica',
          title: 'Atención telefónica',
          type: 'string',
          description: 'Ej: "Lunes a Viernes de 9 a 18 hs"',
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

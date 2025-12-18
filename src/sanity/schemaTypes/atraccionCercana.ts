import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'atraccionCercana',
  title: 'Atracciones Cercanas',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distancia',
      title: 'Distancia',
      type: 'string',
      description: 'Ej: "5 km", "10 minutos en auto"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Naturaleza', value: 'naturaleza' },
          { title: 'Aventura', value: 'aventura' },
          { title: 'Cultura', value: 'cultura' },
          { title: 'Gastronomía', value: 'gastronomia' },
          { title: 'Deportes', value: 'deportes' },
          { title: 'Compras', value: 'compras' },
          { title: 'Relax', value: 'relax' },
          { title: 'Servicios', value: 'servicios' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        },
      ],
    }),
    defineField({
      name: 'ubicacion',
      title: 'Ubicación',
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
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      tipo: 'tipo',
      distancia: 'distancia',
      media: 'imagen',
    },
    prepare(selection) {
      const { title, tipo, distancia } = selection
      return {
        title,
        subtitle: `${tipo} - ${distancia}`,
        media: selection.media,
      }
    },
  },
})

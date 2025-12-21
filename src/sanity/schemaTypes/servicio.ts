import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicio',
  title: 'Servicios Destacados',
  type: 'document',
  description: 'Las 3 tarjetas principales de la página de servicios',
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
      type: 'string',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'detalle',
      title: 'Nota adicional',
      type: 'string',
      description: 'Ej: "Horario: 9:30 a 22:00 hs"',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      initialValue: 'destacado',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'nombre',
      subtitle: 'descripcion',
      media: 'imagen',
    },
  },
})

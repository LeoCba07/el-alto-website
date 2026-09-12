import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicio',
  title: 'Servicios',
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
      rows: 2,
    }),
    defineField({
      // Every servicio is a photo card ("destacado") and the site no longer
      // filters on it. Hidden rather than removed so the value stored on the
      // existing documents doesn't show as an unknown field.
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'detalle',
      title: 'Detalle adicional',
      type: 'string',
      description: 'Texto chico debajo de la descripción, solo en la página de servicios. Ej: "Reservá en recepción"',
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición',
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
      subtitle: 'descripcion',
      media: 'imagen',
    },
  },
})

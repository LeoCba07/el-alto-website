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
      name: 'icono',
      title: 'Icono',
      type: 'string',
      options: {
        list: [
          { title: 'Wi-Fi', value: 'wifi' },
          { title: 'Cocina', value: 'kitchen' },
          { title: 'Cama/Toallas', value: 'bed' },
          { title: 'TV', value: 'tv' },
          { title: 'Clima/Calefacción', value: 'climate' },
          { title: 'Caja fuerte', value: 'safe' },
          { title: 'Secador de pelo', value: 'hairdryer' },
          { title: 'Auto/Cochera', value: 'car' },
          { title: 'Niños/Juegos', value: 'kids' },
          { title: 'Gimnasio', value: 'gym' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Mapa/Turismo', value: 'map' },
          { title: 'Equipaje', value: 'luggage' },
          { title: 'Recepción', value: 'reception' },
          { title: 'Aire acondicionado', value: 'ac' },
          { title: 'Desayuno', value: 'breakfast' },
          { title: 'Spa/Masajes', value: 'spa' },
        ],
      },
      hidden: ({ document }) => document?.categoria === 'destacado' || document?.categoria === 'opcional',
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'En tu unidad', value: 'unidad' },
          { title: 'En el complejo', value: 'complejo' },
          { title: 'Servicios opcionales', value: 'opcional' },
          { title: 'Destacados (fotos)', value: 'destacado' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.categoria !== 'destacado',
      description: 'Solo para servicios destacados',
    }),
    defineField({
      name: 'detalle',
      title: 'Detalle adicional',
      type: 'string',
      description: 'Ej: "horno, microondas, heladera" o "9 a 19 hs"',
    }),
    defineField({
      name: 'precio',
      title: 'Precio',
      type: 'string',
      hidden: ({ document }) => document?.categoria !== 'opcional',
      description: 'Solo para servicios opcionales. Ej: "$2.500/día" o "Consultar"',
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de aparición dentro de su categoría',
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
      title: 'nombre',
      subtitle: 'categoria',
      media: 'imagen',
    },
  },
})

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
          { title: 'Cama', value: 'bed' },
          { title: 'TV', value: 'tv' },
          { title: 'Clima', value: 'climate' },
          { title: 'Caja fuerte', value: 'safe' },
          { title: 'Secador', value: 'hairdryer' },
          { title: 'Auto', value: 'car' },
          { title: 'Niños', value: 'kids' },
          { title: 'Gimnasio', value: 'gym' },
          { title: 'Restaurant', value: 'restaurant' },
          { title: 'Mapa', value: 'map' },
          { title: 'Equipaje', value: 'luggage' },
          { title: 'Recepción', value: 'reception' },
          { title: 'Pileta', value: 'pool' },
          { title: 'Asador', value: 'grill' },
          { title: 'Aire acondicionado', value: 'ac' },
          { title: 'Desayuno', value: 'breakfast' },
          { title: 'Limpieza', value: 'cleaning' },
        ],
      },
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'En la unidad', value: 'unidad' },
          { title: 'En el complejo', value: 'complejo' },
          { title: 'Servicio opcional', value: 'opcional' },
          { title: 'Destacado', value: 'destacado' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
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
      description: 'Solo para servicios opcionales (ej: "$2.500/día")',
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Orden de visualización',
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
      categoria: 'categoria',
      media: 'imagen',
    },
    prepare(selection) {
      const { title, categoria } = selection
      const categoriaLabels: Record<string, string> = {
        unidad: 'En la unidad',
        complejo: 'En el complejo',
        opcional: 'Opcional',
        destacado: 'Destacado',
      }
      return {
        title,
        subtitle: categoriaLabels[categoria] || categoria,
        media: selection.media,
      }
    },
  },
})

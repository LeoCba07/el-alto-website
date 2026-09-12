import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tarifaTemporada',
  title: 'Tarifas por Temporada',
  type: 'document',
  fields: [
    defineField({
      name: 'temporadaVigente',
      title: 'Temporada vigente',
      type: 'string',
      description:
        'Ej: "2025/26". Actualizalo cuando cargues los precios de la temporada nueva. Si queda vacío, la tabla de precios no muestra el año.',
      validation: (Rule) =>
        Rule.regex(/^\d{4}\/\d{2}$/, { name: 'año/año' }).warning('Usá el formato 2025/26'),
    }),
    defineField({
      name: 'temporadaAlta',
      title: '🔴 Temporada Alta',
      type: 'object',
      initialValue: {
        nombre: 'Temporada Alta',
        periodo: 'Dic 28 - Feb, Carnaval, Semana Santa',
        precios: [
          { capacidad: '2 personas', precio: 60000 },
          { capacidad: '2 + 1 menor', precio: 75000 },
          { capacidad: '2 a 4 personas', precio: 90000 },
          { capacidad: '4 a 5 personas', precio: 110000 },
          { capacidad: '5 a 6 personas', precio: 129000 },
        ],
      },
      fields: [
        defineField({
          name: 'nombre',
          title: 'Nombre',
          type: 'string',
          readOnly: true,
          initialValue: 'Temporada Alta',
        }),
        defineField({
          name: 'periodo',
          title: 'Período',
          type: 'string',
          description: 'Ej: "Dic 28 - Feb, Carnaval, Semana Santa"',
        }),
        defineField({
          name: 'precios',
          title: 'Precios por capacidad',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'capacidad',
                  title: 'Capacidad',
                  type: 'string',
                  description: 'Ej: "2 personas", "2 + 1 menor", "2 a 4 personas"',
                }),
                defineField({
                  name: 'precio',
                  title: 'Precio por noche',
                  type: 'number',
                  description: 'En pesos argentinos',
                }),
              ],
              preview: {
                select: {
                  capacidad: 'capacidad',
                  precio: 'precio',
                },
                prepare({ capacidad, precio }) {
                  return {
                    title: capacidad || 'Sin capacidad',
                    subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : 'Sin precio',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'temporadaMedia',
      title: '🟡 Temporada Media',
      type: 'object',
      initialValue: {
        nombre: 'Temporada Media',
        periodo: 'Marzo, Diciembre, fines de semana largos, vacaciones de Julio',
        precios: [
          { capacidad: '2 personas', precio: 55000 },
          { capacidad: '2 + 1 menor', precio: 68000 },
          { capacidad: '2 a 4 personas', precio: 85000 },
          { capacidad: '4 a 5 personas', precio: 90000 },
          { capacidad: '5 a 6 personas', precio: 99000 },
        ],
      },
      fields: [
        defineField({
          name: 'nombre',
          title: 'Nombre',
          type: 'string',
          readOnly: true,
          initialValue: 'Temporada Media',
        }),
        defineField({
          name: 'periodo',
          title: 'Período',
          type: 'string',
          description: 'Ej: "Mar - Nov (excepto feriados largos)"',
        }),
        defineField({
          name: 'precios',
          title: 'Precios por capacidad',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'capacidad',
                  title: 'Capacidad',
                  type: 'string',
                  description: 'Ej: "2 personas", "2 + 1 menor", "2 a 4 personas"',
                }),
                defineField({
                  name: 'precio',
                  title: 'Precio por noche',
                  type: 'number',
                  description: 'En pesos argentinos',
                }),
              ],
              preview: {
                select: {
                  capacidad: 'capacidad',
                  precio: 'precio',
                },
                prepare({ capacidad, precio }) {
                  return {
                    title: capacidad || 'Sin capacidad',
                    subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : 'Sin precio',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'temporadaBaja',
      title: '🟢 Temporada Baja',
      type: 'object',
      initialValue: {
        nombre: 'Temporada Baja',
        periodo: 'Resto del año',
        precios: [
          { capacidad: '2 personas', precio: 49000 },
          { capacidad: '2 + 1 menor', precio: 60000 },
          { capacidad: '2 a 4 personas', precio: 75000 },
          { capacidad: '5 a 6 personas', precio: 89000 },
        ],
      },
      fields: [
        defineField({
          name: 'nombre',
          title: 'Nombre',
          type: 'string',
          readOnly: true,
          initialValue: 'Temporada Baja',
        }),
        defineField({
          name: 'periodo',
          title: 'Período',
          type: 'string',
          description: 'Ej: "Lun - Jue (excepto feriados)"',
        }),
        defineField({
          name: 'precios',
          title: 'Precios por capacidad',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'capacidad',
                  title: 'Capacidad',
                  type: 'string',
                  description: 'Ej: "2 personas", "2 + 1 menor", "2 a 4 personas"',
                }),
                defineField({
                  name: 'precio',
                  title: 'Precio por noche',
                  type: 'number',
                  description: 'En pesos argentinos',
                }),
              ],
              preview: {
                select: {
                  capacidad: 'capacidad',
                  precio: 'precio',
                },
                prepare({ capacidad, precio }) {
                  return {
                    title: capacidad || 'Sin capacidad',
                    subtitle: precio ? `$${precio.toLocaleString('es-AR')}` : 'Sin precio',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { temporada: 'temporadaVigente' },
    prepare({ temporada }) {
      return {
        title: 'Tarifas por Temporada',
        subtitle: temporada ? `Temporada ${temporada}` : 'Haz clic para actualizar precios',
      }
    },
  },
})

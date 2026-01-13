import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton for site configuration
      S.listItem()
        .title('Configuración del Sitio')
        .child(
          S.document()
            .schemaType('configuracionSitio')
            .documentId('configuracionSitio')
        ),
      // Singleton for tarifas
      S.listItem()
        .title('Tarifas por Temporada')
        .child(
          S.document()
            .schemaType('tarifaTemporada')
            .documentId('tarifaTemporada')
        ),
      S.divider(),
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['configuracionSitio', 'tarifaTemporada'].includes(listItem.getId() || '')
      ),
    ])

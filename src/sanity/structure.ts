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
      S.divider(),
      // All other document types
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'configuracionSitio'
      ),
    ])

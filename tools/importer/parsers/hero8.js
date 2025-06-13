/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image and title from the given element
  const img = element.querySelector('img');
  const title = element.querySelector('h5');

  // Assemble the Hero block table per the example: 1 col, 3 rows, header is 'Hero'
  const rows = [
    ['Hero'],
    [img || ''],
    [title || '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

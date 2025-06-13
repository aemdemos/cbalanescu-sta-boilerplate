/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image (if present)
  const img = element.querySelector('img') || '';
  // Extract the heading (if present)
  const heading = element.querySelector('h5') || '';

  // The table should have three rows: header, image, heading
  const cells = [
    ['Hero'],
    [img],
    [heading],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the only .text-image-item
  const item = element.querySelector('.text-image-item');
  if (!item) return;

  // Get the image and the text content
  const img = item.querySelector('.text-image-item__image');
  const content = item.querySelector('.text-image-item__content');

  // Defensive: if either missing, make cell empty
  const row = [content || document.createElement('div'), img || document.createElement('div')];

  const cells = [
    ['Columns (columns21)'],
    row
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

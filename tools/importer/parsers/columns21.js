/* global WebImporter */
export default function parse(element, { document }) {
  // Find the item (should only be one, but support for multiple in future)
  const item = element.querySelector('.text-image-item');
  if (!item) return;

  // For right-aligned image (class contains 'right'), text left, img right
  // Image
  const img = item.querySelector('img');
  // Content
  const content = item.querySelector('.text-image-item__content');

  // If either content or image is missing, place empty string as fallback
  const cells = [
    ['Columns (columns21)'],
    [content || '', img || '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

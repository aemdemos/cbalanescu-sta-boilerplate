/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row that matches the component/block name exactly
  const headerRow = ['Columns (columns16)'];

  // Get the left/content column: .hero-banner-image-descr__content
  const contentCol = element.querySelector('.hero-banner-image-descr__content');
  // Defensive: if not found, use blank placeholder
  const leftCell = contentCol || '';

  // Get the right/image column: desktop image only (not mobile)
  let rightCell = '';
  const imageWrapper = element.querySelector('.hero-banner-image-descr__image-wrapper.desktop-image');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) rightCell = img;
  }

  // Second row as columns
  const columnsRow = [leftCell, rightCell];

  // Compose cells
  const cells = [
    headerRow,
    columnsRow,
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

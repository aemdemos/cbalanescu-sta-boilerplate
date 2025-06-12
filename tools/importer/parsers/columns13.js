/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main wrapper containing the columns
  const wrapper = element.querySelector('.hero-banner-image-descr.wrapper');
  if (!wrapper) return;

  // Left column: text content (reference the direct child of .hero-banner-image-descr__content)
  let leftCell = '';
  const content = wrapper.querySelector('.hero-banner-image-descr__content');
  if (content) {
    // Prefer .hero-banner-image-descr__text if present
    const text = content.querySelector('.hero-banner-image-descr__text');
    leftCell = text || content;
  }

  // Right column: image (reference the img element directly)
  let rightCell = '';
  const imageWrapper = wrapper.querySelector('.hero-banner-image-descr__image-wrapper');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) rightCell = img;
  }

  const cells = [
    ['Columns (columns13)'],
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

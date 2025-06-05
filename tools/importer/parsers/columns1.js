/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main wrapper holding both text and image
  const wrapper = element.querySelector('.hero-banner-image-descr.wrapper');
  if (!wrapper) return;

  // Extract left column: text content
  // This is the .hero-banner-image-descr__text div, which contains h3 (or similar)
  const textContainer = wrapper.querySelector('.hero-banner-image-descr__text');
  // Defensive: If not found, fallback to content div
  const leftCol = textContainer || wrapper.querySelector('.hero-banner-image-descr__content');

  // Extract right column: image
  // This is the .hero-banner-image-descr__image-wrapper div, which contains <img>
  const rightCol = wrapper.querySelector('.hero-banner-image-descr__image-wrapper');

  // If either column is missing, do not create a partial block
  if (!leftCol || !rightCol) return;

  // Prepare cells: first row is the header for Columns block
  const cells = [
    ['Columns (columns1)'],
    [leftCol, rightCol]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the new table
  element.replaceWith(table);
}

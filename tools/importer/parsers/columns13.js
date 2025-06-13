/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main block wrapper inside the section
  const wrapper = element.querySelector('.hero-banner-image-descr.wrapper');
  if (!wrapper) return;

  // Get the content/text and image wrappers as direct children
  const content = wrapper.querySelector('.hero-banner-image-descr__content');
  const imageWrapper = wrapper.querySelector('.hero-banner-image-descr__image-wrapper');

  // Defensive: Only proceed if both content and image exist
  if (!content || !imageWrapper) return;

  // Table header matches the block naming convention
  const headerRow = ['Columns (columns13)'];
  // Each cell is an existing element (no cloning)
  const row = [content, imageWrapper];

  // Build the table as per the block spec
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

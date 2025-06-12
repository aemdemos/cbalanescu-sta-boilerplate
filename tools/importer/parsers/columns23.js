/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Get left column: content area
  const leftCol = container.querySelector(':scope > .hero-banner-image-descr__content');
  // Get right column: image area
  const rightCol = container.querySelector(':scope > .hero-banner-image-descr__image-wrapper');

  // Prepare left column content array
  const leftColParts = [];
  if (leftCol) {
    // Title (h3)
    const title = leftCol.querySelector('.hero-banner-image-descr__title');
    if (title) leftColParts.push(title);
    // Description (text block)
    const descr = leftCol.querySelector('.hero-banner-image-descr__text');
    if (descr) leftColParts.push(descr);
    // Download link (button)
    const btn = leftCol.querySelector('a.button, a.cta-download-link');
    if (btn) leftColParts.push(btn);
  }

  // Prepare right column content
  let rightColContent = null;
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) rightColContent = img;
  }

  // Header row must match example exactly
  const cells = [
    ['Columns block'],
    [leftColParts, rightColContent || '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

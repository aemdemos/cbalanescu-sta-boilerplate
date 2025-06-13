/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section
  const section = element.querySelector('section.hero-banner-image');
  if (!section) return;

  // Get the <img> element for the image row
  const img = section.querySelector('img.hero-banner-image__img');

  // Get the text/title content and preserve its heading level (should be h2 here)
  let heading = '';
  const headingEl = section.querySelector('.hero-banner-image__title');
  if (headingEl) {
    heading = headingEl;
  }

  // Compose the block table: header, image, heading (each in its own row, one column)
  const cells = [
    ['Hero'],
    [img || ''],
    [heading || '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}

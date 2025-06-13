/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section
  const section = element.querySelector('section.hero-banner-image');
  // Find the image (background and <img> are the same)
  const img = section.querySelector('img.hero-banner-image__img');
  // Find the heading
  let heading = '';
  const titleDiv = section.querySelector('.hero-banner-image__text');
  if (titleDiv) {
    const h2 = titleDiv.querySelector('h2.hero-banner-image__title');
    if (h2) {
      // Use h1 as in the example, reparent existing content
      const h1 = document.createElement('h1');
      h1.innerHTML = h2.innerHTML;
      heading = h1;
    }
  }
  // Build the table: header, image, heading - each as a separate row
  const rows = [
    ['Hero'],
    [img ? img : ''],
    [heading ? heading : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

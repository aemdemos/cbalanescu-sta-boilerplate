/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section
  const section = element.querySelector('section.hero-banner-image');
  // Get the image element
  const img = section ? section.querySelector('img.hero-banner-image__img') : null;
  // Get the text block
  const textBlock = section ? section.querySelector('.hero-banner-image__text') : null;

  // Extract title
  let h1 = null;
  if (textBlock) {
    const title = textBlock.querySelector('.hero-banner-image__title');
    if (title) {
      h1 = document.createElement('h1');
      h1.innerHTML = title.innerHTML.trim();
    }
  }
  
  // Extract description
  let descP = null;
  if (textBlock) {
    const desc = textBlock.querySelector('.hero-banner-image__desc p');
    if (desc) {
      descP = document.createElement('p');
      descP.innerHTML = desc.innerHTML.trim();
    }
  }

  // Compose content cell for row 3 (headline/subhead)
  const contentCell = document.createElement('div');
  if (h1) contentCell.appendChild(h1);
  if (descP) contentCell.appendChild(descP);

  // Build table rows as in the example: header, image, headline/subhead
  const rows = [
    ['Hero'],
    [img || ''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the two columns inside this section.
  // Structure is:
  // section > div.container > [div.hero-banner-image-descr__content, div.hero-banner-image-descr__image-wrapper]
  const container = element.querySelector(':scope > .container');
  let leftCol, rightCol;
  if (container) {
    leftCol = container.querySelector('.hero-banner-image-descr__content');
    rightCol = container.querySelector('.hero-banner-image-descr__image-wrapper');
  }
  // Fallback: get direct children
  if ((!leftCol || !rightCol) && container) {
    const divs = container.querySelectorAll(':scope > div');
    if (!leftCol && divs.length > 0) leftCol = divs[0];
    if (!rightCol && divs.length > 1) rightCol = divs[1];
  }

  // Defensive fallback if container is missing (should not happen with provided HTML)
  if ((!leftCol || !rightCol)) {
    const divs = element.querySelectorAll(':scope > div');
    if (!leftCol && divs.length > 0) leftCol = divs[0];
    if (!rightCol && divs.length > 1) rightCol = divs[1];
  }

  // 2. Compose the table structure for the block
  const headerRow = ['Columns (columns22)'];
  // Each cell gets the referenced original element (not cloned)
  const row = [leftCol, rightCol];
  const cells = [headerRow, row];

  // 3. Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

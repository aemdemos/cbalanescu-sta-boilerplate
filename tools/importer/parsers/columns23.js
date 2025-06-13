/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers
  const container = element.querySelector(':scope > .container');
  let leftCol = [], rightCol = [];
  if (container) {
    const contentDiv = container.querySelector('.hero-banner-image-descr__content');
    if (contentDiv) {
      leftCol = Array.from(contentDiv.children);
    }
    const imageWrapper = container.querySelector('.hero-banner-image-descr__image-wrapper');
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) rightCol.push(img);
    }
  }
  // Table structure: 1 header cell with exact text, 1 row with 2 columns
  const cells = [
    ['Columns (columns23)'],
    [leftCol, rightCol],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

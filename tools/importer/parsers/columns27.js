/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the direct child with a specific class
  function findDirectChildByClass(parent, className) {
    return Array.from(parent.children).find(el => el.classList.contains(className));
  }

  // For this HTML, both hero-banner-video and hero-banner-video__text are direct children of 'element'
  const heroVideo = findDirectChildByClass(element, 'hero-banner-video');
  const heroText = findDirectChildByClass(element, 'hero-banner-video__text');

  // Defensive fallback
  const leftCol = heroVideo || document.createElement('div');
  const rightCol = heroText || document.createElement('div');

  const cells = [
    ['Columns (columns27)'],
    [leftCol, rightCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const container = element.querySelector('.container');
  if (!container) return;

  const left = container.querySelector('.hero-banner-image-descr__content');
  const right = container.querySelector('.hero-banner-image-descr__image-wrapper');

  const leftCell = [];
  if (left) {
    Array.from(left.children).forEach((child) => leftCell.push(child));
  }

  const rightCell = [];
  if (right) {
    const img = right.querySelector('img');
    if (img) rightCell.push(img);
  }

  // Header row must have two columns: header text and empty string for alignment
  const cells = [
    ['Columns (columns23)', ''],
    [leftCell, rightCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block
  const block = element.querySelector('.tree-column-teaser-block');
  if (!block) return;
  const columns = block.querySelectorAll(':scope > .simple-teaser-item');
  // Use only if there are at least two columns
  if (columns.length < 2) return;

  // Build the cells array: header row is single cell, content row is two columns
  const cells = [
    ['Columns (columns28)'],
    [columns[0], columns[1]]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

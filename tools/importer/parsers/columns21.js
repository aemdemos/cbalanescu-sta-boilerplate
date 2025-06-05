/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, as in the example
  const headerRow = ['Columns (columns21)'];

  // Get all immediate .teaser-icon-item children (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > .teaser-icon-item'));

  // Build the cells array: first row single header cell, second row N columns
  const contentRow = columns.map((col) => {
    const img = col.querySelector('.teaser-icon-item__icon');
    const desc = col.querySelector('.teaser-icon-item__desc');
    // Compose cell content referencing existing elements
    const cellFragment = document.createElement('div');
    if (img) cellFragment.appendChild(img);
    if (desc) cellFragment.appendChild(desc);
    // If only one child, just return that node
    if (cellFragment.childNodes.length === 1) return cellFragment.firstChild;
    return cellFragment;
  });

  const cells = [
    headerRow,     // single header cell
    contentRow     // one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

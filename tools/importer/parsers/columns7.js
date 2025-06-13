/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the columns
  const teaserBlock = element.querySelector(':scope > .tree-column-teaser-block');
  let columns = [];

  if (teaserBlock) {
    columns = Array.from(teaserBlock.querySelectorAll(':scope > .simple-teaser-item'));
  } else {
    columns = Array.from(element.querySelectorAll(':scope > .simple-teaser-item'));
  }

  // Defensive: if still empty, fallback to direct children
  if (!columns.length) {
    columns = Array.from(element.children);
  }

  // Remove any columns that are empty (no child nodes and no text)
  columns = columns.filter(col => col && (col.textContent.trim() || col.querySelector('*')));

  // The header row must be an array with a single string cell (exactly)
  const headerRow = ['Columns (columns7)'];

  // The second row must be an array with each column as a separate cell (must be an array!)
  const dataRow = columns;

  // Final cells array for the table: rows of arrays
  const cells = [headerRow, dataRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

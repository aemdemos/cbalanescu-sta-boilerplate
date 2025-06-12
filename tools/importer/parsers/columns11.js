/* global WebImporter */
export default function parse(element, { document }) {
  // 1. The header row must be a single column, matching the example exactly
  const headerRow = ['Columns (columns11)'];

  // 2. Get all the columns: .teaser-icon-item elements inside .icon-block__items
  const itemsContainer = element.querySelector('.icon-block__items');
  let columns = [];
  if (itemsContainer) {
    columns = Array.from(itemsContainer.querySelectorAll(':scope > .teaser-icon-item'));
  }

  // 3. Only create a table if there is at least one column
  if (columns.length > 0) {
    // Build the rows array for createTable: [[header], [col1, col2, ...]]
    const rows = [headerRow, columns];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}

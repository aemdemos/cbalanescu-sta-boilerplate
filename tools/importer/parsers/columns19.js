/* global WebImporter */
export default function parse(element, { document }) {
  // Get all column wrappers
  const cols = Array.from(element.querySelectorAll(':scope > .two-column-icon-item__col'));

  // For each col, extract its .icon-item content (reference the element directly for robust parsing)
  const cells = cols.map(col => {
    // Use the .icon-item directly if available, fall back to col
    const iconItem = col.querySelector('.icon-item');
    return iconItem || col;
  });

  // Compose table: header, then one row of columns
  const tableArray = [
    ['Columns (columns19)'],
    cells
  ];

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > .two-column-icon-item__col'));
  // If not found, fallback to all immediate div children (for robustness)
  const cols = columns.length ? columns : Array.from(element.querySelectorAll(':scope > div'));

  // For each column, get its icon-item element as the main content (preserving DOM reference)
  const contentRow = cols.map(col => {
    const iconItem = col.querySelector('.icon-item');
    return iconItem || col;
  });

  // Do NOT create empty content rows
  if (contentRow.length === 0) return;

  // The header row must have exactly one column (the block name), not one per column
  const headerRow = ['Columns (columns19)'];

  // Prepare the cells for createTable: header is a single cell, then the contentRow
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

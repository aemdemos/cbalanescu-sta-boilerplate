/* global WebImporter */
export default function parse(element, { document }) {
  // Find all column elements
  let columns = Array.from(element.querySelectorAll(':scope > .two-column-icon-item__col'));
  if (!columns.length) {
    columns = Array.from(element.children).filter((c) => c.classList && c.classList.contains('two-column-icon-item__col'));
  }

  // Prepare the table rows
  // Header row: exactly one column as per requirements
  const headerRow = ['Columns (columns19)'];

  // Content row: as many columns as found in the DOM
  const contentRow = columns.map((col) => {
    // If multiple children, return as array, else single child or fallback to col
    if (col.children.length === 1) {
      return col.firstElementChild;
    } else if (col.children.length > 1) {
      return Array.from(col.children);
    } else {
      return col;
    }
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const columnsBlock = element.querySelector('.tree-column-teaser-block');
  let columnDivs = [];
  if (columnsBlock) {
    columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > .simple-teaser-item'));
  }

  // Defensive: only use meaningful columns
  const bodyRow = columnDivs.length ? columnDivs : [element];
  const colCount = bodyRow.length;

  // Build the table using createTable, then fix the header row colspan
  const cells = [
    ['Columns (columns7)'],
    bodyRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row: set colspan on the first <th> if needed
  const headerTh = table.querySelector('tr:first-child th');
  if (headerTh && colCount > 1) {
    headerTh.setAttribute('colspan', String(colCount));
  }
  // Remove any extra th in the header row, if present
  const headerRow = table.querySelector('tr:first-child');
  while (headerRow.children.length > 1) {
    headerRow.removeChild(headerRow.lastChild);
  }

  // Replace the original element
  element.replaceWith(table);
}

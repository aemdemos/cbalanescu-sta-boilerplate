/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the block name, per spec
  const headerRow = ['Columns (columns8)'];

  // Collect all immediate column divs
  const colDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each cell in the content row is the referenced column div
  const contentRow = colDivs.map(colDiv => colDiv);

  // Table data: first row is the single-cell header row, second row has N cells (one per column)
  const tableData = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}

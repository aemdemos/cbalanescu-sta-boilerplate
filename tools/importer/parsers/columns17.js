/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the example exactly
  const headerRow = ['Columns (columns17)'];

  // Extract the direct children of the element
  // For this HTML, it's an icon (img) and a heading (h5)
  const img = element.querySelector('img');
  const h5 = element.querySelector('h5');

  // Defensive: Only add nodes that exist
  const cellContent = [];
  if (img) cellContent.push(img);
  if (h5) cellContent.push(h5);

  // Build cells: single row, single column in this case
  const tableData = [
    headerRow,
    [cellContent]
  ];

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}

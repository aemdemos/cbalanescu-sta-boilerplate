/* global WebImporter */
export default function parse(element, { document }) {
  // The header row: must match the example exactly
  const headerRow = ['Columns (columns22)'];

  // Get all direct column divs - should be all .teaser-icon-item children
  const columns = Array.from(element.querySelectorAll(':scope > .teaser-icon-item'));

  // For each .teaser-icon-item, extract the image and the description
  const contentRow = columns.map(col => {
    const cellContent = [];
    const img = col.querySelector('img');
    if (img) cellContent.push(img);
    const desc = col.querySelector('.teaser-icon-item__desc');
    if (desc) cellContent.push(desc);
    return cellContent.length ? cellContent : '';
  });

  // Compose table rows as specified by the requirements
  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

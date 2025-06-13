/* global WebImporter */
export default function parse(element, { document }) {
  // Get all teaser-icon-item elements (each is a column)
  const items = Array.from(element.querySelectorAll(':scope > .teaser-icon-item'));

  // For each item/column, include image (if any) and description (if any)
  const columns = items.map((item) => {
    const colContent = [];
    const img = item.querySelector('img');
    if (img) colContent.push(img);
    const desc = item.querySelector('.teaser-icon-item__desc');
    if (desc) {
      // Get all child nodes of desc (usually it's just a <p>)
      colContent.push(...desc.childNodes);
    }
    if (colContent.length === 1) return colContent[0];
    if (colContent.length > 1) return colContent;
    return '';
  });

  // The header row must be a single cell
  const headerRow = ['Columns (columns22)'];
  // The content row should have as many cells as columns/items
  const tableRows = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // The header row as per block name
  const headerRow = ['Columns (columns22)'];

  // All direct children are .teaser-icon-item columns
  const items = Array.from(element.querySelectorAll(':scope > .teaser-icon-item'));

  // Each item becomes one column/cell in the second row
  const columnsRow = items.map(item => {
    const colContent = [];
    // Get the icon image
    const icon = item.querySelector('.teaser-icon-item__icon');
    if (icon) colContent.push(icon.cloneNode(true));
    // Get the description paragraph
    const desc = item.querySelector('.teaser-icon-item__desc p');
    if (desc && desc.textContent.trim()) colContent.push(desc.cloneNode(true));
    // If no content at all, return empty string for that cell
    if (colContent.length === 1) return colContent[0];
    if (colContent.length > 1) return colContent;
    return '';
  });

  if (columnsRow.length === 0) return;

  // Table: first row = header, second row = columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}

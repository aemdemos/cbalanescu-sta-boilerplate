/* global WebImporter */
export default function parse(element, { document }) {
  // Find all the direct teaser-icon-item children (each is a column)
  const items = Array.from(element.querySelectorAll(':scope > .teaser-icon-item'));

  // Header row: exactly one column, per example
  const headerRow = ['Columns (columns22)'];

  // Content row: each cell is one column
  const contentRow = items.map((item) => {
    const cellContent = [];
    const icon = item.querySelector('.teaser-icon-item__icon');
    if (icon) cellContent.push(icon);
    const desc = item.querySelector('.teaser-icon-item__desc');
    if (desc && desc.textContent.trim()) {
      // Use the first <p> or the desc div
      const p = desc.querySelector('p');
      if (p) {
        cellContent.push(p);
      } else {
        cellContent.push(desc);
      }
    }
    // Fallback: If no content, just empty string
    return cellContent.length ? cellContent : '';
  });

  // Compose the cells array
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

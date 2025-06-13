/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be exactly one cell
  const headerRow = ['Columns (columns11)'];

  // Find the icon items container
  const itemsContainer = element.querySelector('.icon-block__items');
  if (!itemsContainer) return;

  // Each column is a .teaser-icon-item
  const teaserItems = Array.from(itemsContainer.children).filter(child => child.classList.contains('teaser-icon-item'));

  // For each item, extract the img and h4 and put them into an array for the cell
  const contentRow = teaserItems.map(item => {
    const cellContent = [];
    const img = item.querySelector('img');
    const title = item.querySelector('h4');
    if (img) cellContent.push(img);
    if (title) cellContent.push(title);
    return cellContent.length ? cellContent : '';
  });

  // Only proceed if at least one column is present
  if (contentRow.length === 0) return;

  // Compose the table: header row (one cell), second row (N cells, one for each column)
  const cells = [
    headerRow,
    contentRow,
  ];

  // Use the WebImporter utility to create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

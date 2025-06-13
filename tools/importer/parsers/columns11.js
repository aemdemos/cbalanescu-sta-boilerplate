/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required: one cell only
  const headerRow = ['Columns (columns11)'];

  // Extract the icon items from the HTML
  const itemsContainer = element.querySelector('.icon-block__items');
  let columns = [];
  if (itemsContainer) {
    const items = Array.from(itemsContainer.children).filter(child => child.classList.contains('teaser-icon-item'));
    columns = items.map(item => {
      // Construct cell content: icon (img) and title (h4)
      const img = item.querySelector('img');
      const h4 = item.querySelector('h4');
      const cellContent = [];
      if (img) cellContent.push(img);
      if (h4) cellContent.push(h4);
      return cellContent.length === 1 ? cellContent[0] : cellContent;
    });
  }
  // Only add the header row (single cell) and content row (one cell per column)
  const cells = [
    headerRow,
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

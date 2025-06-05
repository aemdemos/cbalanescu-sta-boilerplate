/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .icon-block__items container
  const iconBlockItems = element.querySelector('.icon-block__items');
  let columns = [];
  if (iconBlockItems) {
    // Each teaser-icon-item is a column
    const items = Array.from(iconBlockItems.querySelectorAll(':scope > .teaser-icon-item'));
    columns = items.map(item => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      const content = [];
      if (img) content.push(img);
      if (title) content.push(title);
      return content;
    });
  }
  if (columns.length === 0) {
    columns = [['']];
  }
  // IMPORTANT: to match the required structure, header row is a single cell (array of 1),
  // content row is an array with one item per column
  const cells = [
    ['Columns (columns11)'], // header row (1 cell)
    columns                 // content row (n cells)
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

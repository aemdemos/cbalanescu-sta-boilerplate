/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header must be exactly one column, text exactly as required
  const cells = [['Columns (columns11)']];

  // 2. Get the items container and its children (columns)
  const itemsContainer = element.querySelector('.icon-block__items');
  if (!itemsContainer) return;
  const items = Array.from(itemsContainer.children);

  // 3. Each item becomes a column: collect image and heading
  const columns = items.map(item => {
    const img = item.querySelector('img');
    const heading = item.querySelector('h4');
    const parts = [];
    if (img) parts.push(img);
    if (heading) parts.push(heading);
    return parts.length ? parts : '';
  });

  // 4. Add a single content row containing all columns as cells
  cells.push(columns);

  // 5. Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

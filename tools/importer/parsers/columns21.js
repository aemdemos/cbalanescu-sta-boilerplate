/* global WebImporter */
export default function parse(element, { document }) {
  // Find the text-image-item inside the block (should be only one)
  const item = element.querySelector('.text-image-item');
  if (!item) return;

  // Get the image element from the item (if any)
  const img = item.querySelector('img');

  // Get the content container (text side of the column)
  const content = item.querySelector('.text-image-item__content');

  // Ensure fallback to empty div if content/image missing, to always create two columns in the data row
  const col1 = content || document.createElement('div');
  const col2 = img || document.createElement('div');

  // Create header row with EXACTLY ONE COLUMN, as required
  const headerRow = ['Columns (columns21)'];
  // Create data row with two columns (content and image)
  const dataRow = [col1, col2];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,    // one column only
    dataRow       // two columns for the columns layout
  ], document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}

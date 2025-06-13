/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .text-image-item block (should only be one per block)
  const item = element.querySelector('.text-image-item');
  if (!item) return;

  // Get the image (should be the first child)
  const img = item.querySelector('img');
  // Get the content div (should contain the text)
  const content = item.querySelector('.text-image-item__content');

  // Defensive: If both elements are missing, do nothing
  if (!img && !content) return;

  // Table header as in the block spec
  const headerRow = ['Columns (columns21)'];
  // Build the columns: text (content) and image. If either is missing, cell will be empty.
  const row = [content || '', img || ''];
  
  // Build and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}

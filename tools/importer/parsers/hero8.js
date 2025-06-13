/* global WebImporter */
export default function parse(element, { document }) {
  // Get the image and the title elements (not cloning, using references)
  const img = element.querySelector('img');
  const title = element.querySelector('h5');

  // Use the title as a heading. If it's not present, leave undefined
  // Reference the existing h5 element (do not create new one) for semantic preservation
  // Compose the cell contents
  let heroContent = [];
  if (img) heroContent.push(img);
  if (title) heroContent.push(title);
  if (!img && !title) heroContent = '';

  // Build cells as per block structure
  const cells = [
    ['Hero (hero8)'],
    [heroContent.length > 1 ? heroContent : heroContent[0] || '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Hero (hero8)'];

  // Get the image and the heading inside the main element
  const img = element.querySelector('img');
  const heading = element.querySelector('h5');

  // Prepare content for the content row
  const content = document.createElement('div');
  if (img) content.appendChild(img);
  if (heading) {
    // Use the existing h5 as the heading; do not change its level
    content.appendChild(heading);
  }

  // Only add content row if either img or heading exists
  const contentRow = [content.childNodes.length > 0 ? [content] : ['']];

  // Assemble cells
  const cells = [headerRow, ...contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}

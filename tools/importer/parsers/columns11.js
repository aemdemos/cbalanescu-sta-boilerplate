/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly matching the example
  const headerRow = ['Columns (columns11)'];

  // Extract relevant child elements dynamically
  const items = Array.from(element.querySelectorAll('.teaser-icon-item'));

  // Parse each item combining the image and associated text into a single cell
  const rows = items.map((item) => {
    const img = item.querySelector('img');
    const title = item.querySelector('h4');

    // Create a single cell combining image and text
    const cellContent = document.createElement('div');
    if (img) cellContent.appendChild(img);
    if (title) cellContent.appendChild(title);

    return [cellContent];
  });

  // Create the block table using the WebImporter helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the newly created block table
  element.replaceWith(table);
}
/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero6)'];

  // Extract relevant elements
  const image = element.querySelector('.hero-banner-image__img');
  const title = element.querySelector('.hero-banner-image__title');
  const description = element.querySelector('.hero-banner-image__desc');

  // Combine content into a single cell to match the example structure
  const contentRow = [
    [image, title, description] // Combine all content into one cell
  ];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the block name
  const headerRow = ['Columns (columns16)'];

  // Extract the content and text elements
  const contentDiv = element.querySelector('.hero-banner-image-descr__content');
  const textDiv = contentDiv.querySelector('.hero-banner-image-descr__text');

  // Extract image elements dynamically
  const imageWrappers = element.querySelectorAll('.hero-banner-image-descr__image-wrapper');
  const images = Array.from(imageWrappers).map(wrapper => wrapper.querySelector('img'));

  // Construct the cells array for the table
  const cells = [
    headerRow,
    [textDiv, images]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
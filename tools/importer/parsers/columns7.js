/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns7)'];

  // Validate header row matches example exactly and contains exactly one column
  if (headerRow.length !== 1 || headerRow[0] !== 'Columns (columns7)') {
    console.error('Header row does not match the expected format or has more than one column.');
    return;
  }

  // Get all immediate child div elements
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Check for missing or empty child elements
  if (children.length < 2) {
    console.error('Insufficient child elements found in the block.');
    return;
  }

  // First column: Extract text content dynamically
  const textContent = children[0];

  // Check if textContent is valid
  if (!textContent || !textContent.textContent.trim()) {
    console.error('Text content is missing or empty in the first column.');
    return;
  }

  // Second column: Extract image and link dynamically
  const mediaContent = children[1];

  const image = mediaContent.querySelector('img');

  // Check if the image is missing
  if (!image) {
    console.error('Image element missing in the second column.');
    return;
  }

  // Handle elements with a 'src' attribute, excluding images
  const nonImageSrcElements = Array.from(mediaContent.querySelectorAll('[src]:not(img)'));
  const convertedLinks = nonImageSrcElements.map(el => {
    const link = document.createElement('a');
    link.href = el.getAttribute('src');
    link.textContent = 'Link';
    return link;
  });

  const link = mediaContent.querySelector('a');

  // Check if the link is missing or invalid
  if (!link || !link.hasAttribute('href')) {
    console.error('Link element missing or invalid in the second column.');
    return;
  }

  const cells = [
    headerRow,
    [textContent, [image, link, ...convertedLinks]],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new structure
  element.replaceWith(blockTable);
}
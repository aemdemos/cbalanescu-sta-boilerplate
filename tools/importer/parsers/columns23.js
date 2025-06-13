/* global WebImporter */
export default function parse(element, { document }) {
  // Get the container that holds the columns
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the two column wrappers
  // Left: content, Right: image
  const contentCol = container.querySelector('.hero-banner-image-descr__content');
  const imageCol = container.querySelector('.hero-banner-image-descr__image-wrapper');

  // Assemble left column: reference all present elements
  const leftCol = document.createElement('div');
  if (contentCol) {
    Array.from(contentCol.childNodes).forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      ) {
        leftCol.appendChild(node);
      }
    });
  }

  // Right column: reference the whole image wrapper so it includes the image
  let rightCol = null;
  if (imageCol) {
    rightCol = imageCol;
  } else {
    rightCol = document.createElement('div');
  }

  // --- CRITICAL FIX: Header row text is EXACTLY as in the prompt example
  const tableRows = [
    ['Columns (columns23)'], // Header row must match the example exactly
    [leftCol, rightCol]      // Content row as two columns
  ];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}

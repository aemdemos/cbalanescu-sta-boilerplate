/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content and image wrappers
  const wrapper = element.querySelector('.hero-banner-image-descr.wrapper');
  if (!wrapper) return;

  // --- LEFT COLUMN: TEXT CONTENT ---
  // Get the main content area (includes heading, p, list)
  const content = wrapper.querySelector('.hero-banner-image-descr__content');
  let leftCol = null;
  if (content) {
    // reference the DIV directly (contains all the text, p, list)
    leftCol = content;
  }

  // --- RIGHT COLUMN: IMAGE ---
  // Prefer desktop image, fallback to mobile
  let rightCol = null;
  let imgDiv = wrapper.querySelector('.hero-banner-image-descr__image-wrapper.desktop-image');
  if (!imgDiv) {
    imgDiv = wrapper.querySelector('.hero-banner-image-descr__image-wrapper.mobile-image');
  }
  if (imgDiv) {
    const img = imgDiv.querySelector('img');
    if (img) {
      rightCol = img;
    }
  }

  // Table header must exactly match spec
  const headerRow = ['Columns (columns16)'];
  // Only include columns if they exist
  const contentRow = [];
  if (leftCol) contentRow.push(leftCol);
  if (rightCol) contentRow.push(rightCol);
  if (contentRow.length === 0) return; // Avoid creating empty block

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
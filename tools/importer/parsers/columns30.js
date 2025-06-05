/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content wrapper
  const wrapper = element.querySelector('.hero-banner-image-descr.wrapper');
  if (!wrapper) return;

  // Left column: textual content
  const content = wrapper.querySelector('.hero-banner-image-descr__content');
  let leftCell = null;
  if (content) {
    leftCell = content;
  }

  // Right column: prefer desktop over mobile image
  let rightCell = null;
  const desktopImage = wrapper.querySelector('.hero-banner-image-descr__image-wrapper.desktop-image img');
  const mobileImage = wrapper.querySelector('.hero-banner-image-descr__image-wrapper.mobile-image img');
  if (desktopImage) {
    rightCell = desktopImage;
  } else if (mobileImage) {
    rightCell = mobileImage;
  }

  // The header must be a single cell (not matching columns count)
  const cells = [
    ['Columns (columns30)'], // header row: one cell
    [leftCell, rightCell]    // data row: two columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

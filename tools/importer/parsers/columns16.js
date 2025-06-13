/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find all top-level hero banner columns: text and image
  // The block is structured: left (text) and right (image)

  // Get the text content column
  const contentCol = element.querySelector('.hero-banner-image-descr__content');
  // Find the desktop image (prefer desktop over mobile)
  let img = null;
  const desktopImgWrap = element.querySelector('.hero-banner-image-descr__image-wrapper.desktop-image');
  if (desktopImgWrap) {
    img = desktopImgWrap.querySelector('img');
  } else {
    const mobileImgWrap = element.querySelector('.hero-banner-image-descr__image-wrapper.mobile-image');
    if (mobileImgWrap) img = mobileImgWrap.querySelector('img');
  }

  // Build cells array for WebImporter.DOMUtils.createTable
  const cells = [
    ['Columns (columns16)'], // exact header required
    [contentCol, img]        // left cell: content, right cell: image
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

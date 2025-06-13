/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main column wrapper in the block
  const wrapper = element.querySelector('.hero-banner-image-descr.wrapper');

  // Get text content block (left column)
  const contentDiv = wrapper && wrapper.querySelector('.hero-banner-image-descr__content .hero-banner-image-descr__text');

  // Get the desktop and/or mobile image (right column)
  let image = null;
  let imageDiv = null;
  // Prefer desktop image, fallback to mobile
  imageDiv = wrapper && wrapper.querySelector('.hero-banner-image-descr__image-wrapper.desktop-image');
  if (!imageDiv) {
    imageDiv = wrapper && wrapper.querySelector('.hero-banner-image-descr__image-wrapper.mobile-image');
  }
  if (imageDiv) {
    image = imageDiv.querySelector('img');
  }

  // Prepare the columns block table
  const headerRow = ['Columns (columns16)'];
  // Each cell is either the content block or image element, or null if not found
  const contentRow = [contentDiv || '', image || ''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

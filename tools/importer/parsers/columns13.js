/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the hero-banner-image-descr wrapper
  const wrapper = element.querySelector('.hero-banner-image-descr');
  if (!wrapper) return;

  // Left column: text block
  let textCell = null;
  const content = wrapper.querySelector('.hero-banner-image-descr__content');
  if (content) {
    // Use the content div, which contains the text container
    textCell = content;
  } else {
    // fallback: just use whatever text block can be found
    textCell = wrapper.querySelector('.hero-banner-image-descr__text') || document.createElement('div');
  }

  // Right column: image block
  let imageCell = null;
  const imageWrapper = wrapper.querySelector('.hero-banner-image-descr__image-wrapper');
  if (imageWrapper) {
    imageCell = imageWrapper;
  } else {
    // fallback: just the image
    imageCell = wrapper.querySelector('img') || document.createElement('div');
  }

  const headerRow = ['Columns (columns13)'];
  const contentRow = [textCell, imageCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

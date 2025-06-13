/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main two-column layout inside the section
  const wrapper = element.querySelector('.hero-banner-image-descr');
  if (!wrapper) return;

  // Get left/text column: typically a div containing a heading with the tip
  let leftContent = '';
  const contentDiv = wrapper.querySelector('.hero-banner-image-descr__content');
  if (contentDiv) {
    // Prefer the nested text div if present
    const textDiv = contentDiv.querySelector('.hero-banner-image-descr__text');
    leftContent = textDiv ? textDiv : contentDiv;
  }

  // Get right/image column: the img itself
  let rightContent = '';
  const imageDiv = wrapper.querySelector('.hero-banner-image-descr__image-wrapper');
  if (imageDiv) {
    const img = imageDiv.querySelector('img');
    rightContent = img ? img : imageDiv;
  }

  // Build the columns block table exactly as in the example
  const cells = [
    ['Columns (columns13)'],
    [leftContent, rightContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
  return table;
}

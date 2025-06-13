/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Cards (cards26)'];

  // Get all card elements (direct children of .swiper-wrapper)
  const wrapper = element.querySelector('.swiper-wrapper');
  if (!wrapper) {
    // No cards found, replace with empty table
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }
  const cardEls = wrapper.querySelectorAll(':scope > .teaser-item');

  const rows = [headerRow];
  cardEls.forEach(card => {
    // Get the image element (must be first cell)
    const img = card.querySelector('img');

    // Get the content element (second cell)
    // Prefer the element containing the description
    let content = card.querySelector('.teaser-item__content');
    if (!content) {
      // fallback to the whole card if content not found
      content = card;
    }
    rows.push([img, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

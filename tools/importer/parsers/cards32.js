/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are working with the correct carousel wrapper
  const headerRow = ['Cards (cards32)'];
  const wrapper = element.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  // Each card corresponds to a '.teaser-item' direct child
  const cardEls = Array.from(wrapper.children).filter(child => child.classList.contains('teaser-item'));

  const rows = cardEls.map(card => {
    // First cell: image element
    const img = card.querySelector('img');
    // Second cell: description (keep as is, referencing the element)
    const desc = card.querySelector('.teaser-item__desc');
    // Fallback for missing image/desc: use empty string
    return [img || '', desc || ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

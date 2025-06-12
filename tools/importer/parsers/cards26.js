/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per requirements
  const headerRow = ['Cards (cards26)'];

  // Get all card elements (direct children of .swiper-wrapper)
  const swiperWrapper = element.querySelector(':scope > .swiper-wrapper');
  if (!swiperWrapper) {
    // If somehow no cards, just replace with the header table
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  const cards = swiperWrapper.querySelectorAll(':scope > .teaser-item');
  const rows = Array.from(cards).map(card => {
    // image in first cell
    const img = card.querySelector('img');
    // text content in second cell
    // We'll reference the paragraph within .teaser-item__desc
    let desc = card.querySelector('.teaser-item__desc');
    // Fallback: if no desc, use .teaser-item__content or card itself
    if (!desc) {
      desc = card.querySelector('.teaser-item__content') || card;
    }
    // For robustness: handle missing image or desc
    return [img || document.createTextNode(''), desc || document.createTextNode('')];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

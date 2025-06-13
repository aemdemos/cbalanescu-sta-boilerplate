/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header EXACTLY matches example
  const headerRow = ['Cards (cards26)'];

  // 2. Get all card elements
  // Handles cases where structure could be slightly different
  let cardEls;
  // Try standard .swiper-wrapper > .teaser-item
  cardEls = element.querySelectorAll(':scope > .swiper-wrapper > .teaser-item, :scope > .teaser-item');
  // Fallback if there was no wrapper (robustness)
  if (!cardEls.length) {
    cardEls = element.querySelectorAll(':scope > div');
  }

  const rows = Array.from(cardEls).map(card => {
    // Get image (first image inside the card, or empty string if missing)
    const img = card.querySelector('img');
    const image = img || '';
    // Get content: the .teaser-item__desc (contains a <p> normally), fallback to second div if needed
    let textContent = card.querySelector('.teaser-item__desc');
    if (!textContent) {
      // fallback: get the second div inside card
      const divs = card.querySelectorAll(':scope > div');
      textContent = divs[1] || divs[0] || '';
    }
    return [image, textContent];
  });

  // Compose table
  const tableArr = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}

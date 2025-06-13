/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Cards (cards17)'];

  // Get all card-like direct descendant elements (cards are .teaser-item or .swiper-slide)
  const cardNodes = element.querySelectorAll(':scope > .teaser-item, :scope > .swiper-slide');

  const rows = Array.from(cardNodes).map(card => {
    // Get the image element
    const img = card.querySelector('img');
    // Get the text content element
    const desc = card.querySelector('.teaser-item__desc');
    // Fallback for robustness if .teaser-item__desc not found
    const textElem = desc || card;
    return [img, textElem];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
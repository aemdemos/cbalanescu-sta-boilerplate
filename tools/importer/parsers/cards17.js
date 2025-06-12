/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row exactly as in the block description
  const headerRow = ['Cards (cards17)'];
  const rows = [];

  // Find all direct card elements
  const cardDivs = element.querySelectorAll(':scope .swiper-wrapper > .teaser-item');

  cardDivs.forEach(card => {
    // Find the image in the card (if present)
    const img = card.querySelector('img');
    // Find the text content
    const desc = card.querySelector('.teaser-item__desc');
    // Edge case: if .teaser-item__desc or img is missing, gracefully degrade
    const imgCell = img ? img : '';
    const descCell = desc ? desc : '';
    rows.push([imgCell, descCell]);
  });

  // Compose table: header then all card rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}

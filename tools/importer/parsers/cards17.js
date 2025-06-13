/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as shown in the example, exact match
  const headerRow = ['Cards (cards17)'];
  // Find all card elements
  const cards = element.querySelectorAll(':scope .swiper-wrapper > .teaser-item');
  const rows = [headerRow];
  cards.forEach(card => {
    // Get the image (mandatory)
    const img = card.querySelector('img');
    // Get the descriptive content (mandatory)
    const desc = card.querySelector('.teaser-item__desc');
    // Handle missing img or desc edge cases
    rows.push([
      img || document.createTextNode(''),
      desc || document.createTextNode(''),
    ]);
  });
  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
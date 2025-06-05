/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matching the block name and variant exactly
  const headerRow = ['Cards (cards25)'];
  // Get all immediate card elements
  const cards = Array.from(element.querySelectorAll('.swiper-wrapper > .teaser-item'));
  const rows = cards.map((card) => {
    // Image in first cell, if present
    const img = card.querySelector('img');
    // Text content in second cell
    // This may be a <div class="teaser-item__desc"> or similar
    const desc = card.querySelector('.teaser-item__desc');
    // If desc is missing, fallback to .teaser-item__content or the card itself
    return [img, desc || card];
  });
  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace original element
  element.replaceWith(table);
}

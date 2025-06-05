/* global WebImporter */
export default function parse(element, { document }) {
  // Table Header - must match exactly as per the block name/variant
  const headerRow = ['Cards (cardsNoImages13)'];

  // Select all direct child cards (icon-item)
  const cards = Array.from(element.querySelectorAll(':scope > .icon-item'));

  // Each card's content (the p, which may contain strong, br, sup)
  const rows = cards.map(card => {
    // Reference the .icon-item__content directly
    const content = card.querySelector('.icon-item__content');
    // Defensive: if not found, return an empty div
    return [content || document.createElement('div')];
  });

  // Compose the table: header row + one row per card
  const cells = [headerRow, ...rows];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

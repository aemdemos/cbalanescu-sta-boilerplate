/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cardsNoImages3)'];
  // Get all direct icon-item children (cards)
  const cardEls = Array.from(element.querySelectorAll(':scope > .icon-item'));
  const rows = [headerRow];
  cardEls.forEach((card) => {
    // The visible content for each card is in .icon-item__content (already formatted)
    const content = card.querySelector('.icon-item__content');
    // If .icon-item__content is missing, skip this card
    if (!content) return;
    // Reference the content element directly so formatting (strong, sup, br) is preserved
    rows.push([content]);
  });
  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

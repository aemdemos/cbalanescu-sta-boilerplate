/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as required
  const headerRow = ['Cards (cardsNoImages3)'];
  const rows = [headerRow];
  // Find all direct children representing cards
  const cards = Array.from(element.querySelectorAll(':scope > .icon-item'));
  if (cards.length === 0) return;
  cards.forEach((card) => {
    // Get the icon wrapper (contains the <img>)
    const iconWrapper = card.querySelector('.icon-item__title-wrapper');
    // Get the content div (contains text, <p>, etc.)
    const content = card.querySelector('.icon-item__content');
    // Compose the cell contents: icon above, content below
    const cell = [];
    if (iconWrapper) cell.push(iconWrapper);
    if (content) cell.push(content);
    rows.push([cell]);
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

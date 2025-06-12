/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cardsNoImages3)'];
  const rows = [headerRow];
  // Get all card divs (immediate children)
  const cardDivs = element.querySelectorAll(':scope > .icon-item');
  cardDivs.forEach((cardDiv) => {
    // For each card, use the content div (which contains the text)
    const contentDiv = cardDiv.querySelector('.icon-item__content');
    // Defensive: if there is no content, skip this card
    if (contentDiv) {
      // Use the contentDiv directly (references existing element, preserves strong, sup, br, etc)
      rows.push([contentDiv]);
    }
  });
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

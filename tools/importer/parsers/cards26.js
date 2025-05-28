/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards26)']; // Matches the example header

  // Extracting cards dynamically from the provided HTML structure
  const cards = Array.from(element.querySelectorAll(':scope > div > div.teaser-item')).map((card) => {
    const img = card.querySelector('img'); // Extract image element
    const description = card.querySelector('.teaser-item__desc > p'); // Extract description element

    return [
      img, // Reference existing image element directly
      description ? description : '' // Handle missing description gracefully
    ];
  });

  const cells = [
    headerRow, // Add header row
    ...cards   // Add card rows
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document); // Create table block dynamically

  element.replaceWith(block); // Replace original element with new block
}
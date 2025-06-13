/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per the example
  const headerRow = ['Cards (cardsNoImages3)'];

  // Find all card containers
  const cardElements = Array.from(element.querySelectorAll(':scope > .icon-item'));

  // Each card: include both the icon and the content in cell
  const rows = cardElements.map(card => {
    // get the image/icon and content
    const icon = card.querySelector('.icon-item__title-wrapper');
    const content = card.querySelector('.icon-item__content');
    // put both in the cell, in order
    return [[icon, content]];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}

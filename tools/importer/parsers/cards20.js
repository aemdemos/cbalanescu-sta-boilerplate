/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards20)'];

  // Find the container with the icons/cards
  const iconsBlockItem = element.querySelector('.icons-block-item');
  if (!iconsBlockItem) return;
  const cards = iconsBlockItem.querySelectorAll('.icon-item');

  const rows = [];

  cards.forEach(card => {
    // First cell: the icon image
    const image = card.querySelector('.icon-item__icon');
    // Second cell: Title as <h5> (or heading), plus description
    const title = card.querySelector('.icon-item__title');
    const desc = card.querySelector('.icon-item__content');

    // Build the content cell by referencing existing elements only
    const cellChildren = [];
    if (title) cellChildren.push(title);
    if (desc) cellChildren.push(desc);

    rows.push([image, cellChildren]);
  });

  // Compose the block table
  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}

/* global WebImporter */
 export default function parse(element, { document }) {
  // Define header row as per example markdown
  const headerRow = ['Cards (cards17)'];

  // Extract all the child elements of the given element using ':scope > div > div.teaser-item'
  const cards = element.querySelectorAll(':scope > div > div.teaser-item');

  // Map each card to a row in the table
  const rows = Array.from(cards).map((card) => {
    const img = card.querySelector('.teaser-item__image');
    const desc = card.querySelector('.teaser-item__desc');

    // Safely handle cases where the image or description might be missing
    const imageElement = img ? img.cloneNode(true) : document.createElement('div');
    const descriptionElement = desc ? desc.cloneNode(true) : document.createElement('div');

    return [imageElement, descriptionElement];
  });

  // Combine header row with rows extracted from the element
  const tableData = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
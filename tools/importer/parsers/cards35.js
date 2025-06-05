/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards35)'];
  const cells = [headerRow];

  // Find all card items
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (itemsWrapper) {
    const cardItems = Array.from(itemsWrapper.children);
    cardItems.forEach((card) => {
      // First cell: image (reference the actual <img> node)
      const img = card.querySelector('img');
      // Second cell: text content (reference the actual content block)
      const content = card.querySelector('.teaser-item__content');
      // Only include cards that have both an image and content
      if (img && content) {
        cells.push([img, content]);
      }
    });
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

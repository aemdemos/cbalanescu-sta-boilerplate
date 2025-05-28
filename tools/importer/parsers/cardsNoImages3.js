/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages3)'];

  // Extract all child divs of the main container
  const items = element.querySelectorAll(':scope > div');

  const rows = Array.from(items).map((item) => {
    const iconImg = item.querySelector('.icon-item__title-wrapper img');
    const content = item.querySelector('.icon-item__content');

    const cardContent = [];

    // Include the image if present
    if (iconImg) {
      cardContent.push(iconImg);
    }

    // Include the textual content
    if (content) {
      cardContent.push(content);
    }

    return [cardContent];
  });

  const tableData = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
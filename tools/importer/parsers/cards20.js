/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards20)']; // Matches example block name structure
  const rows = [];

  // Select all card items within the section
  const cards = element.querySelectorAll('.icon-item');

  cards.forEach((card) => {
    const img = card.querySelector('img');
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt;

    const title = card.querySelector('.icon-item__title');
    const content = card.querySelector('.icon-item__content');

    const textCellContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent.trim();
      textCellContent.push(titleElement);
    }
    if (content) {
      content.querySelectorAll('p').forEach((paragraph) => {
        textCellContent.push(paragraph.cloneNode(true));
      });
    }

    rows.push([imgElement, textCellContent]);
  });

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
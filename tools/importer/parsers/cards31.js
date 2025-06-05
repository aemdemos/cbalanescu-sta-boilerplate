/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match the example: Cards (cards31)
  const headerRow = ['Cards (cards31)'];
  const rows = [];

  // Get all immediate card items
  const cardDivs = element.querySelectorAll(':scope > div.icon-item');

  cardDivs.forEach(cardDiv => {
    // First cell: the icon image
    let img = null;
    const iconWrapper = cardDiv.querySelector(':scope > .icon-item__title-wrapper');
    if (iconWrapper) {
      img = iconWrapper.querySelector('img');
    }
    // Second cell: text/description
    let contentDiv = cardDiv.querySelector(':scope > .icon-item__content');
    // Defensive: if missing, insert an empty div
    if (!contentDiv) {
      contentDiv = document.createElement('div');
    }
    rows.push([
      img,
      contentDiv
    ]);
  });

  // Final block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

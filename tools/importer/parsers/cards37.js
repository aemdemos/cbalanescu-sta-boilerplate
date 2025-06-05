/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const rows = [['Cards (cards37)']];

  // Find the wrapper containing the cards
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (!itemsWrapper) {
    // If not found, do nothing
    return;
  }
  // For each card in the teaser block
  const cards = Array.from(itemsWrapper.children);
  cards.forEach(card => {
    // First cell: image
    const img = card.querySelector('img');

    // Second cell: text content
    const textCellElements = [];
    const content = card.querySelector('.teaser-item__content');
    if (content) {
      // Title wrapper may contain subtitle and title
      const titleWrapper = content.querySelector('.teaser-item__title-wrapper');
      if (titleWrapper) {
        const subtitle = titleWrapper.querySelector('.teaser-item__subtitle');
        const title = titleWrapper.querySelector('.teaser-item__title');
        if (subtitle) {
          const strong = document.createElement('strong');
          strong.textContent = subtitle.textContent.trim() + ' ';
          textCellElements.push(strong);
        }
        if (title) {
          const strong = document.createElement('strong');
          strong.textContent = title.textContent.trim();
          textCellElements.push(strong);
        }
      }
      // Description (if any)
      const desc = content.querySelector('.teaser-item__desc');
      if (desc && desc.textContent.trim().length > 0) {
        // Use the paragraph directly if available
        const para = desc.querySelector('p');
        if (para) {
          textCellElements.push(para);
        } else {
          // fallback to div
          textCellElements.push(desc);
        }
      }
      // CTA link (if any)
      const cta = content.querySelector('a.button, a.cta-link');
      if (cta) {
        textCellElements.push(cta);
      }
    }
    // Add the row: [image, text cell (array)]
    rows.push([img, textCellElements]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

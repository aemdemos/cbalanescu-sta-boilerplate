/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header EXACTLY as required
  const headerRow = ['Cards (cards36)'];
  const rows = [];

  // 2. Find all immediate card elements
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (!itemsWrapper) return;
  const cardEls = itemsWrapper.querySelectorAll(':scope > .teaser-item');

  cardEls.forEach((card) => {
    // IMAGE (first cell)
    const img = card.querySelector('img');
    // only reference existing img
    const imgEl = img || '';

    // TEXT (second cell)
    const textParts = [];
    // Title: always bold in example, so use <strong>
    const title = card.querySelector('.teaser-item__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textParts.push(strong);
    }
    // Description
    const descP = card.querySelector('.teaser-item__desc p');
    if (descP && descP.textContent.trim()) {
      if (textParts.length) textParts.push(document.createElement('br'));
      textParts.push(descP);
    }
    // CTA button
    const cta = card.querySelector('a.button');
    if (cta && cta.textContent.trim()) {
      if (textParts.length) textParts.push(document.createElement('br'));
      // reference existing <a> instead of creating new
      textParts.push(cta);
    }
    // If no text, use an empty string so the cell is not empty
    if (!textParts.length) textParts.push('');

    rows.push([imgEl, textParts]);
  });

  // 3. Create and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  element.replaceWith(table);
}

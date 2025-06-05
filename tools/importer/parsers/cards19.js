/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all card elements in order
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (!itemsWrapper) return;
  const cardEls = Array.from(itemsWrapper.children).filter(e => e.classList.contains('teaser-item'));

  cardEls.forEach(cardEl => {
    // First cell: the image (reference the existing <img> element)
    const img = cardEl.querySelector('img');

    // Second cell: All text content, in correct order, referencing existing elements
    const content = cardEl.querySelector('.teaser-item__content');
    const pieces = [];

    // Subtitle (if present)
    const subtitle = content.querySelector('.teaser-item__subtitle');
    if (subtitle && subtitle.textContent.trim()) {
      const subtitleEl = document.createElement('div');
      subtitleEl.textContent = subtitle.textContent;
      pieces.push(subtitleEl);
    }

    // Title (mandatory, styled strong)
    const title = content.querySelector('.teaser-item__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      pieces.push(strong);
    }

    // Description (all <p> elements, maintain order)
    const desc = content.querySelector('.teaser-item__desc');
    if (desc) {
      desc.querySelectorAll('p').forEach(p => {
        pieces.push(p);
      });
    }

    // CTA link (if present)
    const cta = content.querySelector('a');
    if (cta) {
      pieces.push(cta);
    }

    // Push the row (reference existing img and other elements)
    rows.push([
      img,
      pieces
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

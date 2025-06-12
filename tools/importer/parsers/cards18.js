/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Each card is a '.teaser-icon-item'
  const cardEls = element.querySelectorAll(':scope > .teaser-icon-item');
  cardEls.forEach(card => {
    // Image/Icon (first cell)
    const img = card.querySelector('img.teaser-icon-item__icon');
    // Use the actual image element from the document (do not clone)
    let imgCell = img;

    // Text content (second cell)
    const cellContent = [];
    // Title (strong)
    const title = card.querySelector('.teaser-icon-item__title');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }
    // Description
    const desc = card.querySelector('.teaser-icon-item__desc');
    if (desc) {
      // Preserve all children (could be <p> or text nodes)
      Array.from(desc.childNodes).forEach(node => {
        cellContent.push(node);
      });
    }
    // CTA button (as a span, since it opens a popup, not a URL)
    const ctaBtn = card.querySelector('.teaser-icon-item__cta .button');
    if (ctaBtn) {
      cellContent.push(document.createElement('br'));
      const span = document.createElement('span');
      span.textContent = ctaBtn.textContent.trim();
      span.className = 'cta';
      cellContent.push(span);
    }
    
    rows.push([
      imgCell,
      cellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

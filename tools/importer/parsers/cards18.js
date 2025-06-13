/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];
  // Select all card elements
  const cardEls = element.querySelectorAll(':scope > .teaser-icon-item');
  cardEls.forEach(card => {
    // First cell: image/icon (reference original element)
    const imageEl = card.querySelector('.teaser-icon-item__icon');
    // Second cell: Collect text content and CTA, stacked (NO <br> tags)
    const cellContent = [];
    // Title as <strong>
    const titleEl = card.querySelector('.teaser-icon-item__title');
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      cellContent.push(strong);
    }
    // Description (all <p> inside desc)
    const desc = card.querySelector('.teaser-icon-item__desc');
    if (desc) {
      desc.querySelectorAll('p').forEach(p => {
        cellContent.push(p);
      });
    }
    // CTA as <a class="button"> with text, if present
    const ctaBtn = card.querySelector('.teaser-icon-item__cta button');
    if (ctaBtn && ctaBtn.textContent.trim()) {
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'button';
      a.textContent = ctaBtn.textContent.trim();
      cellContent.push(a);
    }
    rows.push([imageEl, cellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
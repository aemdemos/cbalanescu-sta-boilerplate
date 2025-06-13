/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];
  // Get all card elements
  const cardEls = element.querySelectorAll(':scope > .teaser-icon-item');
  cardEls.forEach(card => {
    // First cell: the icon/image element
    const img = card.querySelector('.teaser-icon-item__icon');
    // Second cell: wrapper for title, description, and CTA
    const cellContent = [];
    // Title
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
      desc.childNodes.forEach(node => {
        cellContent.push(node);
      });
    }
    // CTA Button (as link, not span)
    const ctaBtn = card.querySelector('.teaser-icon-item__cta .cta-link');
    if (ctaBtn && ctaBtn.textContent.trim()) {
      cellContent.push(document.createElement('br'));
      const ctaLink = document.createElement('a');
      ctaLink.textContent = ctaBtn.textContent.trim();
      ctaLink.href = '#';
      cellContent.push(ctaLink);
    }
    rows.push([img, cellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

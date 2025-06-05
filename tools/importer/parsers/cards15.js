/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];
  // Find the cards container
  const itemsContainer = element.querySelector('.teaser-block__items');
  if (itemsContainer) {
    const cards = itemsContainer.querySelectorAll(':scope > .teaser-item');
    cards.forEach((card) => {
      // First cell: image
      const img = card.querySelector('img');
      // Second cell: content
      const contentEls = [];

      // Title (as <strong>)
      const titleEl = card.querySelector('.teaser-item__title');
      if (titleEl) {
        const strong = document.createElement('strong');
        strong.textContent = titleEl.textContent.trim();
        contentEls.push(strong);
        contentEls.push(document.createElement('br'));
      }
      // Description (prefer <p>)
      const desc = card.querySelector('.teaser-item__desc');
      if (desc) {
        const p = desc.querySelector('p');
        if (p) {
          contentEls.push(p);
        } else if (desc.textContent.trim()) {
          contentEls.push(document.createTextNode(desc.textContent.trim()));
        }
      }
      // CTA (button/link)
      const cta = card.querySelector('a.cta-link');
      if (cta) {
        contentEls.push(document.createElement('br'));
        contentEls.push(cta);
      }
      // Add the row, referencing existing elements directly
      rows.push([img, contentEls]);
    });
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

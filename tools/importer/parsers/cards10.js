/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct .teaser-item children
  const items = element.querySelectorAll(':scope > .teaser-item');
  items.forEach(item => {
    // Image for first cell (reference the DOM node directly)
    const img = item.querySelector('img');

    // Text content for second cell
    const content = item.querySelector('.teaser-item__content');
    const cellContent = [];

    // Title (as <strong> for heading style per example)
    const titleEl = content && content.querySelector('.teaser-item__title');
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }
    // Description (keep all child nodes, reference if possible)
    const descEl = content && content.querySelector('.teaser-item__desc');
    if (descEl) {
      descEl.childNodes.forEach(node => {
        // Only include non-empty text or element nodes
        if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          cellContent.push(node);
        }
      });
      cellContent.push(document.createElement('br'));
    }
    // CTA link, referenced directly
    const ctaEl = content && content.querySelector('a');
    if (ctaEl) {
      cellContent.push(ctaEl);
    }

    rows.push([
      img,
      cellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

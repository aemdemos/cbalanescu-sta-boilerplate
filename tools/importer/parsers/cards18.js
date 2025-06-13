/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Find each card container
  const cards = element.querySelectorAll(':scope > .teaser-icon-item');
  cards.forEach(card => {
    // First cell: the icon image element
    const img = card.querySelector('.teaser-icon-item__icon');

    // Second cell: content (title, description, CTA)
    const content = [];
    // Title as <h4> or whatever is in the source (reference the node itself)
    const title = card.querySelector('.teaser-icon-item__title');
    if (title) {
      content.push(title);
    }
    // Description (reference the div or its children)
    const desc = card.querySelector('.teaser-icon-item__desc');
    if (desc) {
      Array.from(desc.childNodes).forEach(node => {
        if ((node.nodeType === 1 || node.nodeType === 3) && (node.textContent && node.textContent.trim() !== '')) {
          content.push(node);
        }
      });
    }
    // CTA Button (reference the main button, use its text)
    const ctaBtn = card.querySelector('.teaser-icon-item__cta .button');
    if (ctaBtn) {
      // Only add if there is a visible label
      if (ctaBtn.textContent && ctaBtn.textContent.trim().length > 0) {
        // Add a <br> before for separation if there is already content
        if (content.length > 0) content.push(document.createElement('br'));
        content.push(ctaBtn);
      }
    }
    rows.push([
      img,
      content
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

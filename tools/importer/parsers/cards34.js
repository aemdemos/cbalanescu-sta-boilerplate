/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block table: Header, then one row per card, each row two columns (img, text block)
  const rows = [];
  rows.push(['Cards (cards34)']); // Header row must match block name

  // Select all direct children .teaser-icon-item as cards
  const cards = element.querySelectorAll(':scope > .teaser-icon-item');

  cards.forEach(card => {
    // First cell: Icon/Image
    const img = card.querySelector('.teaser-icon-item__icon');

    // Second cell: Title, description, CTA (all as individual elements)
    const textEls = [];
    const title = card.querySelector('.teaser-icon-item__title');
    if (title) textEls.push(title);

    const desc = card.querySelector('.teaser-icon-item__desc');
    if (desc) {
      // Only take element nodes (skip text nodes)
      Array.from(desc.childNodes).forEach(n => {
        if (n.nodeType === 1) textEls.push(n);
      });
    }

    // CTA: use the button as-is (reference, don't clone)
    const ctaBtn = card.querySelector('.teaser-icon-item__cta .button');
    if (ctaBtn) {
      textEls.push(document.createElement('br'));
      textEls.push(ctaBtn);
    }

    rows.push([img, textEls]);
  });

  // Build block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

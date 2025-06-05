/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (as in the example)
  const rows = [
    ['Cards (cards5)']
  ];

  // Get all card containers
  const cards = Array.from(element.querySelectorAll(':scope > .teaser-item'));

  cards.forEach(card => {
    // First cell: image element as-is
    const img = card.querySelector('img');

    // Second cell: text content
    const contentDiv = card.querySelector('.teaser-item__content');
    const parts = [];

    // Title (strong, as in example)
    const titleDiv = contentDiv && contentDiv.querySelector('.teaser-item__title');
    if (titleDiv && titleDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      parts.push(strong);
    }
    // Description (if present)
    const descDiv = contentDiv && contentDiv.querySelector('.teaser-item__desc');
    if (descDiv && descDiv.textContent.trim()) {
      // Add a <br> between title and desc if both exist
      if (parts.length > 0) parts.push(document.createElement('br'));
      // Insert all child nodes of descDiv to preserve <p> etc.
      descDiv.childNodes.forEach(node => {
        parts.push(node);
      });
    }
    // CTA (link) if present
    const cta = contentDiv && contentDiv.querySelector('a.button, a.cta-link');
    if (cta) {
      // Add a <br> if there's already content before the link
      if (parts.length > 0) parts.push(document.createElement('br'));
      parts.push(cta);
    }

    rows.push([
      img,
      parts
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

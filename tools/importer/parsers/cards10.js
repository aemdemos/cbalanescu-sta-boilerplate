/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const rows = [['Cards (cards10)']];

  // Find all direct card items
  const items = element.querySelectorAll(':scope > .teaser-item');
  items.forEach(item => {
    // First column: image (mandatory)
    const img = item.querySelector('img');

    // Second column: composite text cell
    const content = item.querySelector('.teaser-item__content');
    const cellContent = [];

    // Title (styled as heading or bold)
    const title = content.querySelector('.teaser-item__title');
    if (title && title.textContent.trim()) {
      // Use <strong> to convey importance as in the example
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }

    // Description (optional, below heading)
    const desc = content.querySelector('.teaser-item__desc');
    if (desc && desc.textContent.trim()) {
      // Preserve paragraphs if present, else just the text
      desc.childNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          cellContent.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) { // Text node
          const span = document.createElement('span');
          span.textContent = node.textContent;
          cellContent.push(span);
        }
      });
      cellContent.push(document.createElement('br'));
    }

    // CTA (optional, at the bottom)
    const cta = content.querySelector('a');
    if (cta) {
      cellContent.push(cta);
    }

    // Remove trailing <br> if present (and not followed by CTA)
    if (
      cellContent.length &&
      cellContent[cellContent.length - 1].tagName === 'BR' &&
      !(cellContent.length > 1 && cellContent[cellContent.length - 2].tagName === 'A')
    ) {
      cellContent.pop();
    }

    rows.push([
      img,
      cellContent
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

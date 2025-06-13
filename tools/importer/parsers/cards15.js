/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const headerRow = ['Cards (cards15)'];
  const rows = [];
  // Select all immediate card items
  const items = element.querySelectorAll(':scope > div.text-image-item');
  items.forEach(item => {
    // First cell: image element
    const img = item.querySelector('img');
    // Second cell: text content
    const content = item.querySelector('.text-image-item__content');
    const textCell = [];
    if (content) {
      // Title as strong (following the markdown example)
      const title = content.querySelector('.text-image-item__title');
      if (title && title.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCell.push(strong);
      }
      // Description: append each of its child nodes
      const desc = content.querySelector('.text-image-item__description');
      if (desc) {
        Array.from(desc.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            textCell.push(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            // Wrap stray text in a span to keep formatting
            const span = document.createElement('span');
            span.textContent = node.textContent;
            textCell.push(span);
          }
        });
      }
    }
    rows.push([img, textCell]);
  });
  // Create the table with header and all rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
  return table;
}

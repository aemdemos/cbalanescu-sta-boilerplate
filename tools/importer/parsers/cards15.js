/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards15)'];
  // Select all direct card items
  const items = element.querySelectorAll(':scope > div');
  const rows = Array.from(items).map((item) => {
    // Image is always present in the card
    const img = item.querySelector('img');
    // Card text content
    const content = item.querySelector('.text-image-item__content');
    let textCellContent = [];
    if (content) {
      // Title as <strong>
      const title = content.querySelector('.text-image-item__title');
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCellContent.push(strong);
      }
      // Description (<p> is inside .text-image-item__description)
      const desc = content.querySelector('.text-image-item__description');
      if (desc) {
        // Add line break if title exists
        if (textCellContent.length > 0) {
          textCellContent.push(document.createElement('br'));
        }
        // Reference the <p> directly if present, otherwise the full desc
        const p = desc.querySelector('p');
        if (p) {
          textCellContent.push(p);
        } else {
          textCellContent.push(desc);
        }
      }
    }
    // If textCellContent is empty (bad HTML), just leave cell blank
    return [img, textCellContent.length > 0 ? textCellContent : ''];
  });
  // Build the full table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

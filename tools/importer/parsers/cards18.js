/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // Each card is a direct child .text-image-item
  const items = element.querySelectorAll(':scope > div.text-image-item');
  items.forEach((item) => {
    // Get the image element (reference, not clone)
    const img = item.querySelector('img');

    // Get the content container
    const content = item.querySelector('.text-image-item__content');
    let textCellContent = [];
    if (content) {
      // Title
      const titleDiv = content.querySelector('.text-image-item__title');
      if (titleDiv) {
        // Use <strong> to represent the bold title (matches markdown)
        const strong = document.createElement('strong');
        strong.textContent = titleDiv.textContent.trim();
        textCellContent.push(strong);
      }
      // Description
      const descDiv = content.querySelector('.text-image-item__description');
      if (descDiv) {
        // If there is a title, add a space (or br) between title and description
        if (titleDiv) {
          textCellContent.push(document.createElement('br'));
        }
        // Push all child nodes of the description (preserves <p>, <sup>, etc.)
        descDiv.childNodes.forEach((node) => {
          textCellContent.push(node);
        });
      }
    }
    rows.push([img, textCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
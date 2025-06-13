/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly as in example
  const headerRow = ['Cards (cards15)'];
  const rows = [];

  // Select all direct card items
  const items = element.querySelectorAll(':scope > .text-image-item');
  items.forEach((item) => {
    // Image element - referenced directly
    const img = item.querySelector('img');

    // Content block
    const contentBlock = item.querySelector('.text-image-item__content');
    // Compose content cell: title (strong), then description
    const cellContent = [];
    if (contentBlock) {
      const title = contentBlock.querySelector('.text-image-item__title');
      if (title) {
        // Use <strong> to match bolded headings in example
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        cellContent.push(strong);
      }
      const desc = contentBlock.querySelector('.text-image-item__description');
      if (desc) {
        // If there is a title, add a <br> before description
        if (title) {
          cellContent.push(document.createElement('br'));
        }
        // Add all children of description, preserving HTML (e.g. <p>, <sup>)
        Array.from(desc.childNodes).forEach((node) => cellContent.push(node));
      }
    }
    // Always provide two cells: [image, content]
    rows.push([
      img || '',
      cellContent.length ? cellContent : '',
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  element.replaceWith(table);
  return table;
}

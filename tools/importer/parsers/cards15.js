/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];
  // Get all immediate card items (div.text-image-item under the block container)
  const cards = element.querySelectorAll(':scope > div.text-image-item');
  cards.forEach((card) => {
    // Image
    const img = card.querySelector('img');
    // Content
    const content = card.querySelector('.text-image-item__content');
    let textCellContent = [];
    if (content) {
      // Title
      const title = content.querySelector('.text-image-item__title');
      if (title) {
        // Using strong to match the visual example (bolded title)
        const strong = document.createElement('strong');
        strong.innerHTML = title.innerHTML;
        textCellContent.push(strong);
        textCellContent.push(document.createElement('br'));
      }
      // Description
      const desc = content.querySelector('.text-image-item__description');
      if (desc) {
        Array.from(desc.childNodes).forEach((node) => {
          textCellContent.push(node);
        });
      }
    }
    rows.push([img, textCellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

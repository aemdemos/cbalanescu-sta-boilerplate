/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [['Cards (cards14)']];
  const itemsContainer = element.querySelector('.teaser-block__items');
  if (!itemsContainer) return;
  const items = itemsContainer.querySelectorAll('.teaser-item');

  items.forEach(item => {
    const img = item.querySelector('img');
    const content = item.querySelector('.teaser-item__content');
    const cellContent = [];

    const title = content.querySelector('.teaser-item__title');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      cellContent.push(strong, document.createElement('br'));
    }
    const desc = content.querySelector('.teaser-item__desc');
    if (desc) {
      // Instead of using Node constants, just push child elements and text
      Array.from(desc.childNodes).forEach(node => {
        if (node.nodeType === 1) { // ELEMENT_NODE
          cellContent.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) { // TEXT_NODE
          cellContent.push(document.createTextNode(node.textContent));
        }
      });
    }
    const cta = content.querySelector('a');
    if (cta) {
      cellContent.push(document.createElement('br'));
      cellContent.push(cta);
    }
    rows.push([
      img,
      cellContent
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

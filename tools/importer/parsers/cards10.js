/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all card items (direct children)
  const cards = element.querySelectorAll(':scope > .teaser-item');

  cards.forEach(card => {
    // First column: the image (mandatory)
    const img = card.querySelector('img');

    // Second column: text content (title, description, CTA)
    const content = card.querySelector('.teaser-item__content');
    const cellContent = [];

    // Title (styled as bold)
    const titleDiv = content && content.querySelector('.teaser-item__title');
    if (titleDiv) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }

    // Description
    const descDiv = content && content.querySelector('.teaser-item__desc');
    if (descDiv) {
      // If a <p> child is present, use it, else use textContent
      const paragraph = descDiv.querySelector('p');
      if (paragraph) {
        cellContent.push(paragraph);
      } else if (descDiv.textContent.trim()) {
        cellContent.push(document.createTextNode(descDiv.textContent.trim()));
      }
      cellContent.push(document.createElement('br'));
    }

    // CTA (link at the bottom)
    const cta = content && content.querySelector('a');
    if (cta) {
      cellContent.push(cta);
    }

    // Clean up any leading/trailing <br>s
    while (cellContent[0] && cellContent[0].nodeType === 1 && cellContent[0].tagName === 'BR') cellContent.shift();
    while (cellContent[cellContent.length-1] && cellContent[cellContent.length-1].nodeType === 1 && cellContent[cellContent.length-1].tagName === 'BR') cellContent.pop();

    rows.push([
      img,
      cellContent
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

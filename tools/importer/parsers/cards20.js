/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards20)'];

  // Find the block containing the cards: .icons-block-item
  const iconsBlock = element.querySelector('.icons-block-item');
  if (!iconsBlock) return;

  // Select all cards inside the block
  const cardNodes = iconsBlock.querySelectorAll('.icon-item');
  const rows = [headerRow];

  cardNodes.forEach(card => {
    // First column: icon (img)
    const img = card.querySelector('.icon-item__icon');

    // Second column: title (h5) + content
    const title = card.querySelector('.icon-item__title');
    const content = card.querySelector('.icon-item__content');

    // Compose the text cell, referencing existing elements directly
    const textCell = document.createElement('div');
    if (title) {
      // Use existing title element, promote to strong for visual hierarchy as in the example
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textCell.appendChild(strong);
      // Add line break if there is content after title
      if (content) textCell.appendChild(document.createElement('br'));
    }
    if (content) {
      // Append all original child nodes (e.g., paragraphs, lists)
      Array.from(content.childNodes).forEach(node => {
        textCell.appendChild(node);
      });
    }

    rows.push([
      img,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

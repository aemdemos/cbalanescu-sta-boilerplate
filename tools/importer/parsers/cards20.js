/* global WebImporter */
export default function parse(element, { document }) {
  // Cards header as per requirements
  const headerRow = ['Cards (cards20)'];

  // Find the block containing card items
  const iconsBlock = element.querySelector('.icons-block-item');
  if (!iconsBlock) return;
  const cardItems = iconsBlock.querySelectorAll('.icon-item');

  const rows = [headerRow];

  cardItems.forEach((card) => {
    // The image/icon on the left
    const img = card.querySelector('img');
    // The text cell on the right
    const title = card.querySelector('h5');
    const content = card.querySelector('.icon-item__content');

    // For the text cell, we create a fragment to preserve all semantics
    const fragment = document.createDocumentFragment();
    if (title) {
      // Use <strong> as in the example, and add line break after
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      fragment.appendChild(strong);
      fragment.appendChild(document.createElement('br'));
    }
    if (content) {
      Array.from(content.childNodes).forEach((node) => {
        // Directly append the existing node (do not clone)
        fragment.appendChild(node);
      });
    }

    // Add row: [image, text cell fragment]
    rows.push([img, fragment]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

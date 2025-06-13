/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards20) block: 2 columns - image/icon, and text content (with heading/desc)
  const headerRow = ['Cards (cards20)'];

  // Find the programme card block (the right column, cards list)
  const iconsBlock = element.querySelector('.icons-block-item__icons');
  if (!iconsBlock) return;

  // Find all card elements
  const cardElements = Array.from(iconsBlock.children).filter(e => e.classList.contains('icon-item'));

  // Build card rows
  const rows = cardElements.map(card => {
    // First cell: icon image (reference existing img node)
    const img = card.querySelector('img');

    // Second cell: text content: h5 (title) + paragraphs (description)
    // Use a DocumentFragment to gather the heading and all text block children
    const frag = document.createDocumentFragment();
    const title = card.querySelector('h5');
    if (title) frag.appendChild(title);
    const content = card.querySelector('.icon-item__content');
    if (content) {
      // Preserve all content (paragraphs, superscripts, etc)
      content.childNodes.forEach(node => {
        frag.appendChild(node);
      });
    }
    return [img, frag];
  });

  // Only proceed if there are cards
  if (rows.length === 0) return;

  // Compose the table for the block
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}

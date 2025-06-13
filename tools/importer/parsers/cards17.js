/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards17)'];

  // Get all card items (teaser-item direct children of .swiper-wrapper)
  const wrapper = element.querySelector('.swiper-wrapper');
  if (!wrapper) {
    // Fallback: if not found, remove the original element and return
    element.remove();
    return;
  }
  const cardEls = wrapper.querySelectorAll(':scope > .teaser-item');

  const rows = Array.from(cardEls).map(card => {
    // Image (mandatory)
    const img = card.querySelector('img');
    // Text: gather the card content block (usually a .teaser-item__desc)
    // If the .teaser-item__desc is missing, fallback to .teaser-item__content or all text nodes
    let textCell = null;
    let desc = card.querySelector('.teaser-item__desc');
    if (desc) {
      textCell = desc;
    } else {
      // fallback: whole .teaser-item__content
      let content = card.querySelector('.teaser-item__content');
      if (content) {
        textCell = content;
      } else {
        // fallback: just all text
        textCell = document.createElement('div');
        textCell.textContent = card.textContent.trim();
      }
    }
    return [img, textCell];
  });

  const tableArray = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
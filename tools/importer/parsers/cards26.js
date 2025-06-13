/* global WebImporter */
export default function parse(element, { document }) {
  // Header must match example exactly
  const headerRow = ['Cards (cards26)'];

  // Get all card elements (direct children of .swiper-wrapper)
  const wrapper = element.querySelector('.swiper-wrapper');
  const items = wrapper ? Array.from(wrapper.children) : [];

  const rows = items.map((item) => {
    // First cell: image element (if present)
    const img = item.querySelector('img');
    // Second cell: all descriptive content under .teaser-item__content
    // (If not present, fallback to content in .teaser-item__desc or the item itself)
    let textContent = item.querySelector('.teaser-item__content');
    if (!textContent) {
      textContent = item.querySelector('.teaser-item__desc') || item;
    }
    return [img, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
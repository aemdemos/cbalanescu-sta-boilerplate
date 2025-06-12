/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards1)'];

  // Find all card containers
  const itemsContainer = element.querySelector('.teaser-block__items');
  if (!itemsContainer) return;
  const itemNodes = Array.from(itemsContainer.children).filter(e => e.classList.contains('teaser-item'));

  // Build table rows for each card
  const rows = itemNodes.map(card => {
    // First cell: image
    const img = card.querySelector('img') || '';
    // Second cell: content
    const content = card.querySelector('.teaser-item__content');
    const contentElems = [];
    if (content) {
      const titleWrapper = content.querySelector('.teaser-item__title-wrapper');
      if (titleWrapper) {
        const subtitle = titleWrapper.querySelector('.teaser-item__subtitle');
        const title = titleWrapper.querySelector('.teaser-item__title');
        if (subtitle && title) {
          // Place subtitle and title wrapped in a div to preserve structure
          const wrapper = document.createElement('div');
          wrapper.appendChild(subtitle);
          wrapper.appendChild(title);
          contentElems.push(wrapper);
        } else if (title) {
          contentElems.push(title);
        }
      }
      // Description
      const desc = content.querySelector('.teaser-item__desc');
      if (desc) {
        contentElems.push(desc);
      }
      // CTA
      const cta = content.querySelector('a.button');
      if (cta) {
        contentElems.push(cta);
      }
    }
    return [img, contentElems];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

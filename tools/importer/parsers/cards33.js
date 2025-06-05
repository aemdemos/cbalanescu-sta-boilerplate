/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Cards (cards33)'];
  const cells = [headerRow];

  // Find all card items (handle case where .teaser-block__items may be missing)
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (!itemsWrapper) {
    // No items found: replace with block header only
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }
  const items = itemsWrapper.querySelectorAll(':scope > .teaser-item');

  items.forEach((item) => {
    // First column: image (if present)
    const img = item.querySelector('.teaser-item__image') || '';

    // Second column: text cell
    const textContent = [];
    const content = item.querySelector('.teaser-item__content');

    if (content) {
      // Title handling (subtitle + title or just title)
      const titleWrapper = content.querySelector('.teaser-item__title-wrapper');
      if (titleWrapper) {
        const subtitle = titleWrapper.querySelector('.teaser-item__subtitle');
        const title = titleWrapper.querySelector('.teaser-item__title');
        if (subtitle) {
          const strong = document.createElement('strong');
          strong.textContent = subtitle.textContent.trim() + ' ';
          // If there's a title after subtitle, append it in strong too
          if (title) {
            strong.append(title.textContent.trim());
          }
          textContent.push(strong);
          textContent.push(document.createElement('br'));
        } else if (title) {
          const strong = document.createElement('strong');
          strong.textContent = title.textContent.trim();
          textContent.push(strong);
          textContent.push(document.createElement('br'));
        }
      }

      // Description (may have <p> or other elements)
      const desc = content.querySelector('.teaser-item__desc');
      if (desc) {
        Array.from(desc.childNodes).forEach((node) => {
          // Reference the existing node (not clone)
          textContent.push(node);
        });
        textContent.push(document.createElement('br'));
      }

      // CTA button, if present
      const cta = content.querySelector('a.button');
      if (cta) {
        textContent.push(cta);
      }
    }

    // If textContent is empty, fallback to empty string to preserve structure
    cells.push([
      img,
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create and replace element with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

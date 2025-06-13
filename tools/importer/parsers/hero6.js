/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section
  const section = element.querySelector('.hero-banner-image');

  // Header row: exactly as in the example
  const headerRow = ['Hero'];

  // Image row: just the image element
  let imageEl = section && section.querySelector('img');
  const imageRow = [imageEl || ''];

  // Text row: headline and description, as a single cell
  let textCellContent = [];
  if (section) {
    const textContainer = section.querySelector('.hero-banner-image__text');
    if (textContainer) {
      const headline = textContainer.querySelector('.hero-banner-image__title');
      if (headline && headline.textContent.trim()) {
        // Use <h1> for semantic match with markdown example
        const h1 = document.createElement('h1');
        h1.textContent = headline.textContent.trim();
        textCellContent.push(h1);
      }
      const desc = textContainer.querySelector('.hero-banner-image__desc');
      if (desc) {
        Array.from(desc.childNodes).forEach((node) => {
          textCellContent.push(node.cloneNode(true));
        });
      }
    }
  }
  if (textCellContent.length === 0) textCellContent = [''];
  const textRow = [textCellContent];

  // Compose the 3-row, 1-column table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  const cells = [headerRow];

  // Find card container
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (!itemsWrapper) return;
  const cards = Array.from(itemsWrapper.children).filter(
    c => c.classList.contains('teaser-item')
  );

  cards.forEach(card => {
    // Get the image (first img)
    const img = card.querySelector('img');
    // Build the text content cell
    const content = card.querySelector('.teaser-item__content');
    const textElements = [];

    // Title: check if subtitle exists (subtitle is rendered as <strong> with a <br> in example)
    const titleWrapper = content && content.querySelector('.teaser-item__title-wrapper');
    if (titleWrapper) {
      const subtitle = titleWrapper.querySelector('.teaser-item__subtitle');
      const title = titleWrapper.querySelector('.teaser-item__title');
      if (subtitle) {
        // Subtitle styled as <strong>
        const strong = document.createElement('strong');
        strong.textContent = subtitle.textContent.trim();
        textElements.push(strong);
        textElements.push(document.createElement('br'));
      }
      if (title) {
        // Title: regular text, always NOT in <strong> (even if no subtitle)
        // (matches visual example)
        textElements.push(document.createTextNode(title.textContent.trim()));
      }
    }
    // Description
    const desc = content && content.querySelector('.teaser-item__desc');
    if (desc) {
      const p = desc.querySelector('p') || desc;
      textElements.push(p);
    }
    // CTA (a.button)
    const cta = content && content.querySelector('a.button');
    if (cta) textElements.push(cta);

    // Remove empty text nodes and falsey elements
    const filteredTextElements = textElements.filter(Boolean);

    cells.push([
      img,
      filteredTextElements
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

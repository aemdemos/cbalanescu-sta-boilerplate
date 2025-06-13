/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards1)'];
  const itemsWrapper = element.querySelector('.teaser-block__items');
  if (!itemsWrapper) return;
  const cards = Array.from(itemsWrapper.children);
  const rows = [headerRow];
  cards.forEach(card => {
    // IMAGE
    const img = card.querySelector('img');
    const imgCell = img || '';
    // TEXT
    const content = card.querySelector('.teaser-item__content');
    if (!content) {
      rows.push([imgCell, '']);
      return;
    }
    const cellParts = [];
    // Title/subtitle formatting as in the markdown example
    const titleWrap = content.querySelector('.teaser-item__title-wrapper');
    if (titleWrap) {
      const subtitle = titleWrap.querySelector('.teaser-item__subtitle');
      const title = titleWrap.querySelector('.teaser-item__title');
      if (subtitle && title) {
        // <strong>subtitle</strong><br><strong>title</strong>
        const strongSubtitle = document.createElement('strong');
        strongSubtitle.textContent = subtitle.textContent.trim();
        const br = document.createElement('br');
        const strongTitle = document.createElement('strong');
        strongTitle.textContent = title.textContent.trim();
        cellParts.push(strongSubtitle, br, strongTitle);
      } else if (title) {
        // Only title
        const strongTitle = document.createElement('strong');
        strongTitle.textContent = title.textContent.trim();
        cellParts.push(strongTitle);
      }
    }
    // Description (as block, no extra <br>)
    const desc = content.querySelector('.teaser-item__desc');
    if (desc) cellParts.push(desc);
    // CTA (as is, no extra <br>)
    const cta = content.querySelector('a.button');
    if (cta) cellParts.push(cta);
    rows.push([imgCell, cellParts]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

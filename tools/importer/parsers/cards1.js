/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards1)'];
  const cells = [headerRow];

  const itemsContainer = element.querySelector('.teaser-block__items');
  if (!itemsContainer) return;
  const items = Array.from(itemsContainer.children);

  items.forEach(item => {
    // Image in first cell
    const img = item.querySelector('img');

    // Prepare right cell content
    const content = item.querySelector('.teaser-item__content');
    const rightParts = [];
    if (content) {
      // Compose single <strong> heading (subtitle and/or title)
      const titleWrapper = content.querySelector('.teaser-item__title-wrapper');
      let subtitleText = '';
      let titleText = '';
      if (titleWrapper) {
        const subtitle = titleWrapper.querySelector('.teaser-item__subtitle');
        if (subtitle) subtitleText = subtitle.textContent.trim();
        const title = titleWrapper.querySelector('.teaser-item__title');
        if (title) titleText = title.textContent.trim();
        if (subtitleText || titleText) {
          const strong = document.createElement('strong');
          if (subtitleText && titleText) {
            strong.innerHTML = `${subtitleText} <br> ${titleText}`;
          } else if (titleText) {
            strong.textContent = titleText;
          } else if (subtitleText) {
            strong.textContent = subtitleText;
          }
          rightParts.push(strong);
        }
      }
      // Description (only the inner contents of the .teaser-item__desc, not the div itself)
      const desc = content.querySelector('.teaser-item__desc');
      if (desc) {
        if (rightParts.length) rightParts.push(document.createElement('br'));
        // Push only children, not the container div or its class
        Array.from(desc.childNodes).forEach(n => rightParts.push(n.cloneNode(true)));
      }
      // CTA
      const cta = content.querySelector('a');
      if (cta) {
        if (rightParts.length) rightParts.push(document.createElement('br'));
        rightParts.push(cta);
      }
    }
    cells.push([
      img,
      rightParts
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

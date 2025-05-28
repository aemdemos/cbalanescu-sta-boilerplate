/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];
  const headerRow = ['Cards (cards1)'];
  cells.push(headerRow);

  const teaserItems = element.querySelectorAll(':scope > div > div.teaser-block__items > div.teaser-item');

  teaserItems.forEach((teaserItem) => {
    const img = teaserItem.querySelector('img');
    const title = teaserItem.querySelector('.teaser-item__title');
    const subtitle = teaserItem.querySelector('.teaser-item__subtitle');
    const desc = teaserItem.querySelector('.teaser-item__desc');
    const cta = teaserItem.querySelector('a');

    const imageCell = img;

    const textContent = [];

    if (subtitle) {
      const subtitleElement = document.createElement('p');
      subtitleElement.innerHTML = subtitle.innerHTML;
      textContent.push(subtitleElement);
    }

    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.innerHTML = title.innerHTML;
      textContent.push(titleElement);
    }

    if (desc) {
      textContent.push(desc);
    }

    if (cta) {
      const ctaElement = document.createElement('p');
      const link = document.createElement('a');
      link.href = cta.href;
      link.innerHTML = cta.innerHTML;
      ctaElement.appendChild(link);
      textContent.push(ctaElement);
    }

    cells.push([imageCell, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
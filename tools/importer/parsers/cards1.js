/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  const items = element.querySelectorAll('.teaser-block__items > .teaser-item');
  items.forEach((item) => {
    // First cell: image (reference directly)
    const img = item.querySelector('img');

    // Second cell: Flattened content (subtitle/title as <strong>, description <p>, CTA <a>)
    const cellContent = [];
    // Subtitle and Title
    const titleWrapper = item.querySelector('.teaser-item__title-wrapper');
    let hasPrevStrong = false;
    if (titleWrapper) {
      const subtitle = titleWrapper.querySelector('.teaser-item__subtitle');
      if (subtitle && subtitle.textContent.trim()) {
        const subtitleElem = document.createElement('strong');
        subtitleElem.textContent = subtitle.textContent.trim() + ' ';
        cellContent.push(subtitleElem);
        hasPrevStrong = true;
      }
      const title = titleWrapper.querySelector('.teaser-item__title');
      if (title && title.textContent.trim()) {
        const titleElem = document.createElement('strong');
        titleElem.textContent = title.textContent.trim();
        cellContent.push(titleElem);
        hasPrevStrong = true;
      }
    }
    // Add <br> if at least one <strong> was added
    if (hasPrevStrong) {
      cellContent.push(document.createElement('br'));
    }
    // Description (try <p> inside desc, else plain desc)
    let descElem = item.querySelector('.teaser-item__desc p');
    if (!descElem) {
      descElem = item.querySelector('.teaser-item__desc');
    }
    if (descElem && descElem.textContent.trim()) {
      // If it's not a <p>, wrap in <p>
      if (descElem.tagName.toLowerCase() !== 'p') {
        const p = document.createElement('p');
        p.textContent = descElem.textContent.trim();
        cellContent.push(p);
      } else {
        cellContent.push(descElem);
      }
    }
    // CTA (optional)
    const cta = item.querySelector('a.button');
    if (cta) {
      // Add <br> before CTA if something above exists
      if (cellContent.length > 0) {
        cellContent.push(document.createElement('br'));
      }
      cellContent.push(cta);
    }
    // Add row, using the reference to the <img> and the flattened array as the second cell
    rows.push([img, cellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

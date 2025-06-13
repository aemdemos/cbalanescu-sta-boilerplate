/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image for its own row
  let backgroundElem = '';
  const bgDiv = element.querySelector('.text-with-bg__bg');
  if (
    bgDiv &&
    typeof bgDiv.style === 'object' &&
    typeof bgDiv.style.backgroundImage === 'string' &&
    bgDiv.style.backgroundImage
  ) {
    const match = bgDiv.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (match) {
      let bgImgUrl = match[1];
      // Only attempt to make absolute if needed and possible
      if (bgImgUrl && !/^https?:/i.test(bgImgUrl)) {
        if (bgImgUrl.startsWith('/')) {
          // Root-relative: leave as is
          // Do nothing
        } else if (
          typeof document.baseURI === 'string' &&
          document.baseURI &&
          document.baseURI !== 'null'
        ) {
          // Relative, and baseURI available: resolve relative to baseURI
          try {
            bgImgUrl = new URL(bgImgUrl, document.baseURI).toString();
          } catch (e) {
            // fallback, leave as is
          }
        }
      }
      const img = document.createElement('img');
      img.src = bgImgUrl;
      img.alt = '';
      backgroundElem = img;
    }
  }

  // Extract title (h4)
  let headingElem = '';
  const title = element.querySelector('h4');
  if (title) {
    const h1 = document.createElement('h1');
    h1.innerHTML = title.innerHTML;
    headingElem = h1;
  }

  // Extract logo image (optional)
  const logoImg = element.querySelector('.text-with-bg__logo');

  // Extract description paragraphs
  let descElems = [];
  const descDiv = element.querySelector('.text-with-bg__desc');
  if (descDiv) {
    descElems = Array.from(descDiv.children);
  }

  // Extract CTA button (optional)
  const cta = element.querySelector('a.button');

  // Compose third row content: logo (optional), heading, desc, cta (if present)
  const contentElems = [];
  if (logoImg) contentElems.push(logoImg);
  if (headingElem) contentElems.push(headingElem);
  if (descElems.length) contentElems.push(...descElems);
  if (cta) contentElems.push(cta);

  // Strictly match the example: 3 rows, 1 column, header row is ['Hero'] exactly
  const cells = [
    ['Hero'],
    [backgroundElem || ''],
    [contentElems.length === 1 ? contentElems[0] : contentElems],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

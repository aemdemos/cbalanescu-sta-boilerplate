/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section for content extraction
  const section = element.querySelector('section.hero-banner-image');
  if (!section) return;

  // Title extraction (mandatory), prefer first heading inside text container
  let titleElem = section.querySelector('.hero-banner-image__title');
  if (!titleElem) {
    // Fallback: any heading
    titleElem = section.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Background image extraction: prefer <img> with known class, fallback to background-image style
  let imgElem = section.querySelector('img.hero-banner-image__img');
  if (!imgElem) {
    const style = section.getAttribute('style');
    if (style) {
      const match = style.match(/background-image:\s*url\(([^)]+)\)/);
      if (match && match[1]) {
        const img = document.createElement('img');
        img.src = match[1];
        img.alt = titleElem ? titleElem.textContent.trim() : '';
        imgElem = img;
      }
    }
  }

  // Compose content cell in correct order: image then title
  const cellContent = [];
  if (imgElem) cellContent.push(imgElem);
  if (titleElem) cellContent.push(titleElem);

  // Table header as per block name in example, exactly
  const cells = [
    ['Hero (hero9)'],
    [cellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

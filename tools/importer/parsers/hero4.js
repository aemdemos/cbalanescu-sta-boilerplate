/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block
  const headerRow = ['Hero (hero4)'];

  // Get the <section> with class 'hero-banner-image'
  const heroSection = element.querySelector('section.hero-banner-image');

  // Defensive check in case structure varies
  let img = null;
  let title = null;
  if (heroSection) {
    img = heroSection.querySelector('img.hero-banner-image__img');
    title = heroSection.querySelector('.hero-banner-image__title');
  } else {
    img = element.querySelector('img.hero-banner-image__img');
    title = element.querySelector('.hero-banner-image__title');
  }

  const content = [];
  if (img) content.push(img);
  if (title) content.push(title);

  // Prevent empty blocks if content is missing
  if (content.length === 0) {
    // fallback: place all element's children in the cell
    content.push(...element.children);
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [content],
  ], document);

  element.replaceWith(table);
}

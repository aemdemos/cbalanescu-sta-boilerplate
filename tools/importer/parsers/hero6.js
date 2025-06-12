/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero section within the imported block
  const heroSection = element.querySelector('section.hero-banner-image');
  if (!heroSection) return;

  // Find the headline (should be a heading)
  const title = heroSection.querySelector('.hero-banner-image__title');

  // Find the description (optional)
  const desc = heroSection.querySelector('.hero-banner-image__desc');

  // Find the visual image (background image and <img>, but use the <img> for accessibility)
  const img = heroSection.querySelector('img.hero-banner-image__img');

  // Compose the content cell: order is [img, title, desc]
  const content = [];
  if (img) content.push(img);
  if (title) content.push(title);
  if (desc) content.push(desc);

  // Compose the hero block table
  const table = WebImporter.DOMUtils.createTable([
    ['Hero (hero6)'],
    [content]
  ], document);

  element.replaceWith(table);
}

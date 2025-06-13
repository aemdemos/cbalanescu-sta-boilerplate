/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section inside the container
  const section = element.querySelector('section.hero-banner-image');
  if (!section) return;

  // Find the hero image (visible img tag)
  const img = section.querySelector('img.hero-banner-image__img');

  // Find the hero text and heading
  const heading = section.querySelector('.hero-banner-image__text h1, .hero-banner-image__text h2, .hero-banner-image__text h3, .hero-banner-image__text h4, .hero-banner-image__text h5, .hero-banner-image__text h6');

  // Compose the cell content: image and heading if available
  const cellContent = [];
  if (img) cellContent.push(img);
  if (heading) cellContent.push(heading);

  // If there is no heading and no image, don't replace
  if (cellContent.length === 0) return;

  // Table structure: header then cell content
  const cells = [
    ['Hero (hero4)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}

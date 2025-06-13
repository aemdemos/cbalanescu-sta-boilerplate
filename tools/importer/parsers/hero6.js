/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the hero block
  const heroSection = element.querySelector('section.hero-banner-image');
  if (!heroSection) return;

  // Get the hero image (decorative background image)
  const heroImg = heroSection.querySelector('img.hero-banner-image__img');

  // Get the text container (title, subheading, cta)
  const textContainer = heroSection.querySelector('.hero-banner-image__text');
  const cellsContent = [];

  // Include the decorative image if present
  if (heroImg) {
    cellsContent.push(heroImg);
  }

  // Title (mandatory)
  if (textContainer) {
    const title = textContainer.querySelector('.hero-banner-image__title');
    if (title) {
      cellsContent.push(title);
    }
    // Subheading/desc (optional)
    const desc = textContainer.querySelector('.hero-banner-image__desc');
    if (desc) {
      // If desc is a <div> containing a <p>, include the <p> not the <div>
      const descP = desc.querySelector('p');
      if (descP) {
        cellsContent.push(descP);
      } else {
        cellsContent.push(desc);
      }
    }
  }

  // Compose the table as specified
  const cells = [
    ['Hero (hero6)'],
    [cellsContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

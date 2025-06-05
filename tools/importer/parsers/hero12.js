/* global WebImporter */
export default function parse(element, { document }) {
  // Get the hero section (should be unique inside the element)
  const heroSection = element.querySelector('section.hero-banner-image');
  if (!heroSection) return;

  // Background image: prefer the <img>, fallback to background-image in style
  let heroImg = heroSection.querySelector('img.hero-banner-image__img');
  if (!heroImg) {
    // Try to use background-image as fallback (very rare)
    const bgStyle = heroSection.style.backgroundImage || '';
    const urlMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
    if (urlMatch && urlMatch[1]) {
      heroImg = document.createElement('img');
      heroImg.src = urlMatch[1];
      heroImg.alt = '';
    }
  }

  // Title (mandatory): h2.hero-banner-image__title
  const title = heroSection.querySelector('.hero-banner-image__title');
  // Subheading (optional): .hero-banner-image__desc
  const desc = heroSection.querySelector('.hero-banner-image__desc');
  // There is no CTA in the sample, but if there is a button/link, include it
  let cta = null;
  if (heroSection) {
    cta = heroSection.querySelector('a, button');
  }

  // Compose content for the cell
  const cellContent = [];
  if (heroImg) cellContent.push(heroImg);
  if (title) cellContent.push(title);
  if (desc) cellContent.push(desc);
  if (cta) cellContent.push(cta);

  // Always create the correct block table structure
  const table = WebImporter.DOMUtils.createTable([
    ['Hero (hero12)'],
    [cellContent]
  ], document);

  element.replaceWith(table);
}

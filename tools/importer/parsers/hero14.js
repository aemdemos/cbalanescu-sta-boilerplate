/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main title (h4)
  const title = element.querySelector('h4');

  let heading = null;
  if (title) {
    // Always create a new h1, move over the content and className
    heading = document.createElement('h1');
    heading.innerHTML = title.innerHTML;
    heading.className = title.className;
  }

  // Get .text-with-bg block
  const heroBlock = element.querySelector('.text-with-bg');

  // Find the desktop background style
  let bgUrl = null;
  if (heroBlock) {
    const bgDiv = heroBlock.querySelector('.text-with-bg__bg:not(.mobile)');
    if (bgDiv && bgDiv.style.backgroundImage) {
      // background-image: url('/path/to/img');
      const match = bgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        bgUrl = match[1];
      }
    }
  }

  // If background image, create an <img> element
  let bgImgEl = null;
  if (bgUrl) {
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgUrl;
    bgImgEl.alt = '';
  }

  // Get the logo img if present (reference existing element)
  let logoImg = heroBlock ? heroBlock.querySelector('img.text-with-bg__logo') : null;

  // Get the main content (description paragraphs)
  let descBlock = null;
  if (heroBlock) {
    const descDiv = heroBlock.querySelector('.text-with-bg__desc');
    if (descDiv) {
      descBlock = descDiv; // Reference existing element
    }
  }

  // Get the call-to-action button (reference existing element)
  let cta = heroBlock ? heroBlock.querySelector('a.button') : null;

  // Assemble the cell content in order: bgImg, logo, heading, description, cta
  // Only include an element if it exists
  const cellContent = [];
  if (bgImgEl) cellContent.push(bgImgEl);
  if (logoImg) cellContent.push(logoImg);
  if (heading) cellContent.push(heading);
  if (descBlock) cellContent.push(descBlock);
  if (cta) cellContent.push(cta);

  const cells = [
    ['Hero (hero14)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

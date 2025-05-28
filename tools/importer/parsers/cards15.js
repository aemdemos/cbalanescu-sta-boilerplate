/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the table matching the provided example
  const headerRow = ['Cards (cards15)'];

  // Extracting child elements under the main container
  const items = element.querySelectorAll(':scope > div.text-image-item');

  const rows = [headerRow];

  items.forEach((item) => {
    // Safely extract image element
    const img = item.querySelector('img');
    let imageElement;
    if (img) {
      imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
    } else {
      imageElement = document.createElement('div');
      imageElement.textContent = 'No image available';
    }

    // Safely extract text content
    const content = item.querySelector('.text-image-item__content');
    const textContent = document.createElement('div');

    if (content) {
      const title = content.querySelector('.text-image-item__title');
      if (title) {
        const titleElement = document.createElement('h3');
        titleElement.textContent = title.textContent;
        textContent.appendChild(titleElement);
      }

      const description = content.querySelector('.text-image-item__description');
      if (description) {
        // Directly append the description's innerHTML without additional wrapping
        textContent.innerHTML += description.innerHTML;
      }
    } else {
      textContent.textContent = 'No content available';
    }

    rows.push([imageElement, textContent]);
  });

  // Creating the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replacing the original element with the new block table
  element.replaceWith(block);
}
/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero4)'];

  // Extract the image
  const imageElement = element.querySelector('.hero-banner-image__img');
  const imageSource = imageElement?.src || element.querySelector('.hero-banner-image')?.style.backgroundImage.replace(/url\("|"\)/g, '');
  const image = document.createElement('img');
  image.src = imageSource;
  image.alt = imageElement?.alt || '';

  // Extract the title
  const titleElement = element.querySelector('.hero-banner-image__title');
  const title = document.createElement('h2');
  title.textContent = titleElement?.textContent || '';

  // Create the content row with a single cell containing both the image and title
  const contentRow = [[image, title]];

  // Create the table
  const cells = [
    headerRow,
    contentRow,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
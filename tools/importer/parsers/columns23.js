/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns23)'];

  // Extracting content dynamically from the given element
  const container = element.querySelector(':scope > .container');
  const contentWrapper = container?.querySelector(':scope > .hero-banner-image-descr__content');
  const imageWrapper = container?.querySelector(':scope > .hero-banner-image-descr__image-wrapper');

  const title = contentWrapper?.querySelector(':scope > .hero-banner-image-descr__title');
  const text = contentWrapper?.querySelector(':scope > .hero-banner-image-descr__text');
  const downloadLink = contentWrapper?.querySelector(':scope > .cta-download-link');
  const image = imageWrapper?.querySelector(':scope > img');

  // Handle edge cases for missing elements or content
  const titleElement = title ? title : document.createTextNode('');
  const textElement = text ? text : document.createTextNode('');
  const downloadLinkElement = downloadLink ? downloadLink : document.createTextNode('');
  const imageElement = image ? image : document.createElement('div'); // Placeholder div if image is missing

  // Creating the table rows
  const row1 = [
    [titleElement, textElement, downloadLinkElement], // Combine title, text, and download link in the first cell
    imageElement // Second cell contains the image or a placeholder
  ];

  const cells = [headerRow, row1];

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);

  return block;
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Defining the header row for the block table
  const headerRow = ['Columns (columns13)'];

  // Extracting relevant content from the provided element
  const contentWrapper = element.querySelector(':scope > div.hero-banner-image-descr');

  // Extracting text content
  const textElement = contentWrapper.querySelector(':scope > div.hero-banner-image-descr__content .hero-banner-image-descr__text');
  const textCell = textElement ? textElement : '';

  // Extracting image
  const imageWrapper = contentWrapper.querySelector(':scope > div.hero-banner-image-descr__image-wrapper img');
  const imageCell = imageWrapper ? imageWrapper : '';

  // Creating cells for the table
  const cells = [
    headerRow,
    [textCell, imageCell],
  ];

  // Creating the block table and replacing the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
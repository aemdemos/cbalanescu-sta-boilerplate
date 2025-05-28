/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero14)'];

  // Extract relevant content dynamically
  const title = element.querySelector(':scope > h4.text-with-bg__title');

  const logo = element.querySelector(':scope > div.text-with-bg > img.text-with-bg__logo');

  const description = element.querySelector(':scope > div.text-with-bg > div.text-with-bg__content > div.text-with-bg__desc');

  const cta = element.querySelector(':scope > div.text-with-bg > div.text-with-bg__content > a.button');

  // Handle edge cases for missing elements
  const titleContent = title ? title : document.createTextNode('');
  const logoContent = logo ? logo : document.createTextNode('');
  const descriptionContent = description ? description : document.createTextNode('');
  const ctaContent = cta ? cta : document.createTextNode('');

  // Combine all elements into a single column for content row
  const combinedContent = document.createElement('div');
  combinedContent.append(titleContent, logoContent, descriptionContent, ctaContent);

  const contentRow = [
    [combinedContent]
  ];

  // Combine rows into table array
  const cells = [headerRow, ...contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table
  element.replaceWith(block);
}
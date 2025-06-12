/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Hero (hero14)'];

  // Gather content in correct order
  const content = [];

  // Title (mandatory)
  const title = element.querySelector('.text-with-bg__title');
  if (title) content.push(title);

  // Logo (optional, placed after title in screenshot)
  const logo = element.querySelector('.text-with-bg__logo');
  if (logo) content.push(logo);

  // Description (optional)
  const desc = element.querySelector('.text-with-bg__desc');
  if (desc) content.push(desc);

  // CTA (optional)
  const cta = element.querySelector('.button');
  if (cta) content.push(cta);

  // Only add non-empty content
  const cellContent = content.length ? content : [''];

  // Table structure: 1 column, 2 rows
  const cells = [
    headerRow,
    [cellContent],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

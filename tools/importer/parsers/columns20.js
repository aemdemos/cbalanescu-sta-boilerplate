/* global WebImporter */
export default function parse(element, { document }) {
  // Get columns: left (description), right (overview block)
  const mainSection = element.querySelector(':scope > .main-section');
  let leftCol = null;
  let rightCol = null;
  if (mainSection) {
    // The left column is the description wrapper
    leftCol = mainSection.querySelector(':scope > .main-section__description');
    // The right column is the icons overview block
    rightCol = mainSection.querySelector(':scope > .icons-block-item');
  }

  // If the source is missing columns, fallback to empty string for that cell
  const headerRow = ['Columns (columns20)'];
  const contentRow = [
    leftCol ? leftCol : '',
    rightCol ? rightCol : ''
  ];

  // Create the block table as per the block definition
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

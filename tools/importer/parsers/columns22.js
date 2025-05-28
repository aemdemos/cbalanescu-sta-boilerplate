/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example provided
  const headerRow = ['Columns (columns22)'];

  // Extract the items inside the element using direct child selector
  const items = Array.from(element.querySelectorAll(':scope > div.teaser-icon-item'));

  // Map each item into rows containing relevant extracted content
  const contentRows = items.map((item) => {
    // Extract the image element
    const img = item.querySelector('img');

    // Extract the description div (handling possible missing content)
    const description = item.querySelector('.teaser-icon-item__desc');

    // Ensure the description's text content is included
    return [
      img, // Use the image element directly for semantic equivalence
      description || document.createElement('div'), // Fallback to an empty div if description is missing
    ];
  });

  // Combine header row and content rows into the final table data
  const tableCells = [
    headerRow,
    ...contentRows,
  ];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}
/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row exactly matching the example
    const headerRow = ['Hero (hero8)'];

    // Extracting the image and title dynamically from the element
    const img = element.querySelector('img');
    const title = element.querySelector('h5');

    // Handle edge cases for missing or empty elements
    const contentCell = [];
    if (img) {
        contentCell.push(img);
    }
    if (title) {
        contentCell.push(title);
    }

    // Create the content row as a single array containing the cell
    const contentRow = [contentCell];

    // Construct the table using the helper function
    const blockTable = WebImporter.DOMUtils.createTable([
        headerRow, // Header row
        contentRow // Content row
    ], document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}
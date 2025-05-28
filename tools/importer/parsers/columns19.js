/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns (columns19)'];

    // Extract immediate child columns
    const columns = Array.from(element.querySelectorAll(':scope > div'));

    // Map columns to their content (image and content inside the paragraph)
    const contentRows = columns.map((col) => {
        const img = col.querySelector('img');
        const content = col.querySelector('.icon-item__content');

        // Handle missing elements gracefully
        const extractedImg = img ? img : document.createTextNode('');
        const extractedContent = content ? content : document.createTextNode('');

        // Return array with img and content
        return [extractedImg, extractedContent];
    });

    const tableData = [headerRow, ...contentRows];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element with the block table
    element.replaceWith(block);
}
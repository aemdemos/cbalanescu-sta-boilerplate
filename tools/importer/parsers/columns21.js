/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns21)'];

  // Extract columns from the element
  const columns = Array.from(element.querySelectorAll(':scope > div')).map((child) => {
    const image = child.querySelector('img');
    const description = child.querySelector('.text-image-item__description');

    // Ensure dynamic extraction of content
    const imageElement = image || null;
    const descriptionElement = description || null;

    return [imageElement, descriptionElement];
  });

  const cells = [headerRow, ...columns];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the columns
  const block = element.querySelector('.tree-column-teaser-block');
  if (!block) return;

  // Get column items
  const columns = block.querySelectorAll(':scope > .simple-teaser-item');
  if (columns.length < 2) return;

  // For each column, collect all its children as an array
  const getChildrenArray = (col) => {
    // Only take element nodes and non-empty text nodes
    return Array.from(col.childNodes).filter(
      node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim().length)
    );
  };

  const firstColChildren = getChildrenArray(columns[0]);
  const secondColChildren = getChildrenArray(columns[1]);

  // Compose columns as arrays (or plain element if only one child)
  const col1 = firstColChildren.length === 1 ? firstColChildren[0] : firstColChildren;
  const col2 = secondColChildren.length === 1 ? secondColChildren[0] : secondColChildren;

  // Table structure: header row must be a single cell, content row as columns
  const headerRow = ['Columns (columns7)'];
  const cells = [
    headerRow,
    [col1, col2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

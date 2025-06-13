/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .tree-column-teaser-block which contains the columns
  const columnsWrapper = element.querySelector('.tree-column-teaser-block');
  if (!columnsWrapper) return;

  // Get direct children of the columns wrapper (should be the column divs)
  const columnDivs = Array.from(columnsWrapper.children);

  // If there are no columns, do not replace
  if (!columnDivs.length) return;

  // The table header must be a string (not an element)
  const headerRow = ['Columns (columns7)'];

  // For the content row, each cell must be a Node, not an Element already in the DOM.
  // We must move, not reference, to avoid DOM hierarchy errors.
  // So: remove the node from its parent before adding to the table if not already detached.
  // We'll detach them in order here:
  const contentRow = columnDivs.map((col) => {
    // Remove from current parent if still attached
    if (col.parentNode) {
      col.parentNode.removeChild(col);
    }
    return col;
  });

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

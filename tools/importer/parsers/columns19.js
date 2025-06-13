/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs (should be two for this layout)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, get all children (should be one icon-item, but robust for future changes)
  const contentRow = columns.map((col) => {
    // If the column only has one element, use it directly, else group all its content
    const children = Array.from(col.childNodes).filter((n) => 
      n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())
    );
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      return document.createTextNode('');
    }
  });

  // Only build table if there's at least one column
  if (contentRow.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      ['Columns (columns19)'],
      contentRow
    ], document);
    element.replaceWith(table);
  }
}

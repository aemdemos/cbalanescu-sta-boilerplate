/* global WebImporter */
export default function parse(element, { document }) {
  // The block requires a 1-col table: header = 'Search (search12)', next row = absolute URL for the query index
  // Example does NOT use any Section Metadata block or other structure.
  // The URL must be absolute as in the block doc (even though it's not in the HTML)

  // Header row as in the block doc
  const headerRow = ['Search (search12)'];

  // The block expects the absolute query index URL, which must be constant for this block type
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;

  const rows = [headerRow, [link]];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

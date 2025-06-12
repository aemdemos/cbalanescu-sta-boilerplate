/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - must match example exactly
  const headerRow = ['Search (search12)'];

  // There is no Section Metadata in the example, so do not add one

  // The only row in the table after header is the absolute URL to the query-index
  // In the example markdown, this is a fixed URL and not derived from the HTML, so it's correct to hardcode per spec
  // But check the source for any possibility this should be extracted from the element -
  // The source HTML has search forms with action '/managing-conversations' or '/appointment-support', but nothing resembling a JSON query index
  // The canonical Search block for Helix uses a static reference to a query index, not something from the DOM in this case

  // Construct the link element
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Structure: 1 column, 2 rows
  const cells = [
    headerRow,
    [link],
  ];

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

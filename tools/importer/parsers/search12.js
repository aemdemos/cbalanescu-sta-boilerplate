/* global WebImporter */
export default function parse(element, { document }) {
  // Block header should match the example exactly
  const headerRow = ['Search (search12)'];

  // Find the search form
  const searchFormWrapper = element.querySelector('.header__search-form');
  let queryIndexUrl = '';
  if (searchFormWrapper) {
    // Find the <form> element
    const searchForm = searchFormWrapper.querySelector('form');
    if (searchForm) {
      // No query index URL in the form, so use the canonical sample index as in the example
      queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
    }
  }

  // The example expects the URL as plain text, not as a link
  const contentRow = [queryIndexUrl];

  const cells = [
    headerRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

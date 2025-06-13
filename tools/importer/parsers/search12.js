/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Search (search12)'];

  // Attempt to dynamically extract the query index URL from the search form's 'action' attribute
  // In these HTML samples, it's a relative path (e.g., /managing-conversations or /website-terms-use)
  // But the block spec requires the full index.json URL—not just the form action
  // There is no query index URL in the provided HTML, so per block description & example, use the sample URL
  // This ensures the result matches the example and block requirements.
  const searchIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexUrl;
  link.textContent = searchIndexUrl;

  // Build the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [link]
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}

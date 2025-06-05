/* global WebImporter */
export default function parse(element, { document }) {
  // Find the form with the search action
  const form = element.querySelector('form');
  let urlString = '';
  if (form && form.action) {
    // form.action returns an absolute URL, but we want it as a string
    urlString = form.action;
  }
  // Fallback in case form/action not found
  if (!urlString) {
    urlString = '';
  }

  const headerRow = ['Search (search6)'];
  const cells = [
    headerRow,
    [urlString],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

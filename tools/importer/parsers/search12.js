/* global WebImporter */
export default function parse(element, { document }) {
  // Base URL for constructing an absolute URL
  const baseURL = "https://main--helix-block-collection--adobe.hlx.page";

  // Extract the search form element
  const searchForm = element.querySelector('.header__search-form form');

  // Extract the action URL from the form's action attribute
  const relativeActionUrl = searchForm ? searchForm.getAttribute('action') : '';

  // Construct the absolute URL by combining the baseURL and relativeActionUrl
  const queryIndexUrl = relativeActionUrl ? `${baseURL}${relativeActionUrl}` : '';

  // Construct the table rows
  const headerRow = ['Search (search12)'];
  const contentRow = [queryIndexUrl ? document.createElement('a') : ''];

  // If URL exists, create the link
  if (queryIndexUrl) {
    contentRow[0].setAttribute('href', queryIndexUrl);
    contentRow[0].textContent = queryIndexUrl;
  }

  const tableData = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured table block
  element.replaceWith(block);
}
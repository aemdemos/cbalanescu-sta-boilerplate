/* global WebImporter */
export default function parse(element, { document }) {
  // Correct the header row: must be a single cell, but the table should have two columns in all rows
  const headerRow = ['Accordion (accordion2)']; // single cell for header
  const rows = [headerRow];

  // Get the main menu list
  const navUl = element.querySelector('ul.header-menu__ul[data-component="menu-wrapper"]');
  if (!navUl) return;

  navUl.querySelectorAll(':scope > li.header-main-nav-item').forEach((mainLi) => {
    // Find the main link
    const mainLink = mainLi.querySelector(':scope > a');
    if (!mainLink) return;
    // The subtitle and title are both needed for full label
    const subtitleSpan = mainLink.querySelector('.menu-subtitle');
    const titleSpan = mainLink.querySelector('.menu-item-title');
    const subtitle = subtitleSpan ? subtitleSpan.textContent.trim() : '';
    const title = titleSpan ? titleSpan.textContent.trim() : '';
    let fullTitle = '';
    if (subtitle && title) {
      fullTitle = subtitle + ' ' + title;
    } else if (subtitle) {
      fullTitle = subtitle;
    } else {
      fullTitle = title;
    }
    // Create the title cell: wrapping in a <div> for robustness
    const titleDiv = document.createElement('div');
    titleDiv.textContent = fullTitle;

    // If there is a dropdown <ul>, use that as the content
    const dropdown = mainLi.querySelector(':scope > ul.dropdown-menu');
    let content;
    if (dropdown) {
      content = dropdown;
    } else {
      content = mainLink;
    }
    rows.push([titleDiv, content]);
  });

  // The createTable utility will take care of colspan automatically for the header row if only one cell is provided
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

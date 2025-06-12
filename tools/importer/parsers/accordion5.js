/* global WebImporter */
export default function parse(element, { document }) {
  // Find the menu wrapper ul (main menu)
  const menuWrapper = element.querySelector('ul[data-component="menu-wrapper"]');
  if (!menuWrapper) return;

  // Get all top-level menu items (li.header-main-nav-item)
  const topLevelItems = Array.from(menuWrapper.children).filter(
    (li) => li.classList.contains('header-main-nav-item')
  );

  // Prepare header row exactly as required
  const headerRow = ['Accordion (accordion5)'];
  const rows = [headerRow];

  // Iterate over top level menu items (accordions)
  topLevelItems.forEach((li) => {
    // Title for accordion: combine subtitle and title as plain text, not a link
    const link = li.querySelector(':scope > a');
    let titleCell = '';
    if (link) {
      const subtitle = link.querySelector('.menu-subtitle');
      const title = link.querySelector('.menu-item-title');
      // Compose the text content (subtitle + space + title), trimming whitespace
      const subtitleText = subtitle && subtitle.textContent.trim() ? subtitle.textContent.trim() + ' ' : '';
      const titleText = title && title.textContent.trim() ? title.textContent.trim() : '';
      titleCell = subtitleText + titleText;
    }

    // Content cell: the submenu as a whole, if present
    const dropdown = li.querySelector(':scope > ul.dropdown-menu');
    let contentCell = '';
    if (dropdown) {
      contentCell = dropdown;
    }

    rows.push([titleCell, contentCell]);
  });

  // Create the block table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

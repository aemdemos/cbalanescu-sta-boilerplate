/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main menu UL
  const mainUl = element.querySelector('ul.header-menu__ul[data-component="menu-wrapper"]');
  if (!mainUl) return;

  // Prepare header row (exactly as in example)
  const rows = [['Accordion (accordion5)']];

  // Get all top-level li elements for accordion items
  const mainLis = mainUl.querySelectorAll(':scope > li.header-main-nav-item.has-dropdown');

  mainLis.forEach((li) => {
    // Title cell: plain text: Step # and menu item title
    const a = li.querySelector(':scope > a');
    let titleText = '';
    if (a) {
      const subtitle = a.querySelector('.menu-subtitle');
      const title = a.querySelector('.menu-item-title');
      if (subtitle && typeof subtitle.textContent === 'string' && subtitle.textContent.trim()) {
        titleText += subtitle.textContent.trim() + ' ';
      }
      if (title && typeof title.textContent === 'string') {
        titleText += title.textContent.trim();
      }
      titleText = titleText.trim();
    }
    // Content cell: the submenu UL (may not exist)
    let contentCell = '';
    const subUl = li.querySelector(':scope > ul.header-menu__ul.dropdown-menu');
    if (subUl) {
      contentCell = subUl;
    }
    rows.push([titleText, contentCell]);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

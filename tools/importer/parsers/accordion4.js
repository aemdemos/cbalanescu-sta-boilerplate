/* global WebImporter */
export default function parse(element, { document }) {
  // Find the primary menu <ul>
  const mainUl = element.querySelector('.header-menu__ul');
  if (!mainUl) return;

  // Get all direct <li> children (top-level menu items)
  const navItems = Array.from(mainUl.children).filter(li => li.tagName === 'LI');

  // Table header must match example exactly — SINGLE COLUMN: Accordion (accordion4)
  const headerRow = ['Accordion (accordion4)'];
  const rows = [headerRow];

  // Each accordion item is a single row with two columns:
  // [Title text, empty string]
  navItems.forEach(li => {
    // Title cell: text content of the tab (the link's .menu-item-title)
    const anchor = li.querySelector(':scope > a');
    let title = '';
    if (anchor) {
      const titleSpan = anchor.querySelector('.menu-item-title');
      title = titleSpan ? titleSpan.textContent.trim() : '';
    }
    // Content cell is empty as per screenshot/example
    rows.push([title, '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const navList = element.querySelector('ul.header-menu__ul[data-component="menu-wrapper"]');
  if (!navList) return;

  const headerRow = ['Accordion (accordion5)'];
  const rows = [];

  navList.querySelectorAll(':scope > li.header-main-nav-item').forEach((li) => {
    // Extract the subtitle and title as plain elements (NOT as a link)
    const link = li.querySelector(':scope > a');
    let titleCell = '';
    if (link) {
      const subtitle = link.querySelector('.menu-subtitle');
      const title = link.querySelector('.menu-item-title');
      const frag = document.createDocumentFragment();
      if (subtitle && typeof subtitle.textContent === 'string' && subtitle.textContent.trim()) {
        const subtitleSpan = document.createElement('span');
        subtitleSpan.textContent = subtitle.textContent.trim() + ' ';
        frag.appendChild(subtitleSpan);
      }
      if (title && typeof title.textContent === 'string') {
        const titleSpan = document.createElement('span');
        titleSpan.textContent = title.textContent.trim();
        frag.appendChild(titleSpan);
      }
      titleCell = frag.childNodes.length ? frag : '';
    }
    // Content cell is the dropdown ul (may be null)
    const dropdown = li.querySelector(':scope > ul.dropdown-menu');
    let contentCell = '';
    if (dropdown) {
      contentCell = dropdown;
    }
    // Only add a row if title or content is present
    if (titleCell || contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);
  element.replaceWith(table);
}

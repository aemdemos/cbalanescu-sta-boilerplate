/* global WebImporter */
export default function parse(element, { document }) {
  // Table rows, first row is block name
  const rows = [['Accordion (accordion5)']];
  const container = element.querySelector('div.container');
  if (!container) return;

  // Find all top-level accordion items
  const mainItems = container.querySelectorAll('ul[data-component="menu-wrapper"] > li.header-main-nav-item.has-dropdown');

  mainItems.forEach((mainLi) => {
    // --- TITLE CELL ---
    const mainA = mainLi.querySelector(':scope > a');
    let titleText = '';
    if (mainA) {
      const subtitle = mainA.querySelector('.menu-subtitle');
      const title = mainA.querySelector('.menu-item-title');
      if (subtitle && subtitle.textContent.trim()) {
        titleText += subtitle.textContent.trim() + ' ';
      }
      if (title && title.textContent.trim()) {
        titleText += title.textContent.trim();
      }
      // fallback to anchor text if above fails
      if (!titleText) {
        titleText = mainA.textContent.trim();
      }
    }

    // --- CONTENT CELL ---
    const subMenu = mainLi.querySelector(':scope > ul.dropdown-menu');
    let contentLinks = [];
    if (subMenu) {
      const subLis = subMenu.querySelectorAll(':scope > li.header-main-nav-item');
      subLis.forEach((subLi, idx) => {
        const subA = subLi.querySelector(':scope > a');
        if (subA) {
          // Create a simple <a> tag with only href and text
          const link = document.createElement('a');
          link.href = subA.getAttribute('href') || '';
          // Use .menu-item-title text if present, else anchor text
          const subTitle = subA.querySelector('.menu-item-title');
          link.textContent = subTitle && subTitle.textContent.trim() ? subTitle.textContent.trim() : subA.textContent.trim();
          // Only append <a> (no other attributes like sc:linkname etc)
          contentLinks.push(link);
        }
        // Add <br> between links (not after last one)
        if (idx < subLis.length - 1) {
          contentLinks.push(document.createElement('br'));
        }
      });
    }
    rows.push([titleText, contentLinks]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

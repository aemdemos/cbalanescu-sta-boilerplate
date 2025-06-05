/* global WebImporter */
export default function parse(element, { document }) {
  // Table rows to collect
  const rows = [ ['Tabs (tabs3)'] ];
  // Find all tab list items at top level
  const menuList = element.querySelector('ul.header-menu__ul');
  if (menuList) {
    const tabLis = menuList.querySelectorAll(':scope > li.header-main-nav-item');
    tabLis.forEach(li => {
      // Tab label: from main link's .menu-item-title text only
      const a = li.querySelector(':scope > a');
      let label = '';
      if (a) {
        const titleSpan = a.querySelector('.menu-item-title');
        label = titleSpan ? titleSpan.textContent.trim() : a.textContent.trim();
      }
      // Tab content: render all submenu item titles as plain text links, no nested spans
      const submenu = li.querySelector(':scope > ul');
      let contentFragment;
      if (submenu) {
        contentFragment = document.createElement('div');
        submenu.querySelectorAll(':scope > li.header-main-nav-item > a').forEach(subA => {
          // Only use the menu-item-title as text
          const subTitleSpan = subA.querySelector('.menu-item-title');
          const linkText = subTitleSpan ? subTitleSpan.textContent.trim() : subA.textContent.trim();
          const link = document.createElement('a');
          link.href = subA.getAttribute('href');
          link.textContent = linkText;
          link.style.display = 'block';
          contentFragment.appendChild(link);
        });
      } else if (a) {
        // If no submenu, just output the main tab's link as content
        contentFragment = document.createElement('div');
        const link = document.createElement('a');
        link.href = a.getAttribute('href');
        link.textContent = label;
        contentFragment.appendChild(link);
      } else {
        contentFragment = document.createTextNode('');
      }
      rows.push([label, contentFragment]);
    });
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

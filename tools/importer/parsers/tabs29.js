/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level menu list (step tabs)
  const menuUl = element.querySelector('ul.header-menu__ul');
  if (!menuUl) return;
  const topLis = Array.from(menuUl.children).filter(li => li.matches('.header-main-nav-item'));

  // Prepare the block table rows
  const rows = [['Tabs (tabs29)']];

  // For each main tab
  topLis.forEach(topLi => {
    // Compose tab label
    const link = topLi.querySelector(':scope > a');
    let tabLabel = '';
    if (link) {
      const subtitle = link.querySelector('.menu-subtitle');
      const title = link.querySelector('.menu-item-title');
      tabLabel = (subtitle && subtitle.textContent.trim() ? subtitle.textContent.trim() + ' ' : '') + (title ? title.textContent.trim() : '');
      tabLabel = tabLabel.trim();
      if (!tabLabel) tabLabel = link.textContent.trim();
    }
    if (!tabLabel) tabLabel = 'Tab';

    // Tab Content: convert dropdown menu to a semantic fragment with headings, paragraphs, and lists
    let tabContent;
    const dropdown = topLi.querySelector(':scope > ul.dropdown-menu');
    if (dropdown) {
      const fragment = document.createDocumentFragment();
      // Use heading for main tab if available
      if (tabLabel) {
        const heading = document.createElement('h3');
        heading.textContent = tabLabel;
        fragment.appendChild(heading);
      }
      const subLis = Array.from(dropdown.children).filter(li => li.matches('.header-main-nav-item'));
      // If only one sublink, use as a paragraph; if multiple, use unordered list
      if (subLis.length === 1) {
        const a = subLis[0].querySelector('a');
        const title = a && a.querySelector('.menu-item-title');
        const para = document.createElement('p');
        para.textContent = (title ? title.textContent.trim() : (a ? a.textContent.trim() : ''));
        fragment.appendChild(para);
      } else if (subLis.length > 1) {
        const ul = document.createElement('ul');
        subLis.forEach(subLi => {
          const a = subLi.querySelector('a');
          const title = a && a.querySelector('.menu-item-title');
          const li = document.createElement('li');
          if (a) {
            const link = document.createElement('a');
            link.href = a.href;
            link.textContent = title ? title.textContent.trim() : a.textContent.trim();
            li.appendChild(link);
          }
          ul.appendChild(li);
        });
        fragment.appendChild(ul);
      }
      tabContent = fragment;
    } else if (link) {
      // If no dropdown, just use the link as a heading and paragraph
      const fragment = document.createDocumentFragment();
      const heading = document.createElement('h3');
      heading.textContent = tabLabel;
      fragment.appendChild(heading);
      const para = document.createElement('p');
      para.textContent = link.textContent.trim();
      fragment.appendChild(para);
      tabContent = fragment;
    } else {
      tabContent = document.createTextNode('');
    }
    rows.push([tabLabel, tabContent]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

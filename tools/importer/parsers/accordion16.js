/* global WebImporter */
export default function parse(element, { document }) {
  // Find the menu list
  const menuList = element.querySelector('ul.header-menu__ul[data-component="menu-wrapper"]');
  if (!menuList) return;

  const rows = [];
  // Header row as per requirements
  rows.push(['Accordion (accordion16)']);

  // For each top-level menu item (accordion panel)
  const topItems = menuList.querySelectorAll(':scope > li.header-main-nav-item');
  topItems.forEach((li) => {
    const mainLink = li.querySelector(':scope > a');
    if (!mainLink) return; // skip if no main link

    // Build the title cell
    let titleFrag = document.createDocumentFragment();
    const subtitle = mainLink.querySelector('.menu-subtitle');
    const titleEl = mainLink.querySelector('.menu-item-title');
    const subtitleText = subtitle ? subtitle.textContent.trim() : '';
    const titleText = titleEl ? titleEl.textContent.trim() : mainLink.textContent.trim();
    if (subtitleText) {
      const small = document.createElement('small');
      small.textContent = subtitleText;
      titleFrag.appendChild(small);
      titleFrag.appendChild(document.createTextNode(' '));
    }
    titleFrag.appendChild(document.createTextNode(titleText));

    // Build the content cell as a list of links, each as a <p><a>...</a></p>
    let contentCell = document.createDocumentFragment();
    const subMenu = li.querySelector(':scope > ul');
    if (subMenu) {
      const subLis = subMenu.querySelectorAll(':scope > li');
      subLis.forEach((subLi) => {
        const a = subLi.querySelector('a');
        if (a) {
          // Compose the paragraph
          const p = document.createElement('p');
          // Compose the link text as subtitle + title (if present)
          const subSubtitle = a.querySelector('.menu-subtitle');
          const subTitleEl = a.querySelector('.menu-item-title');
          let linkText = '';
          if (subSubtitle && subSubtitle.textContent.trim()) {
            linkText += subSubtitle.textContent.trim() + ' ';
          }
          if (subTitleEl && subTitleEl.textContent.trim()) {
            linkText += subTitleEl.textContent.trim();
          } else {
            linkText += a.textContent.trim();
          }
          // Create a new <a> with the same href and textContent
          const link = document.createElement('a');
          link.href = a.getAttribute('href') || '';
          link.textContent = linkText.trim();
          p.appendChild(link);
          contentCell.appendChild(p);
        }
      });
    }
    rows.push([titleFrag, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

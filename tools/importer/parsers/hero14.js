/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: exactly 'Hero' in one column
  const headerRow = ['Hero'];

  // 2. Background image row: just the background image <img>, or blank if not present
  let bgUrl = null;
  let bgDiv = element.querySelector('.text-with-bg__bg:not(.mobile)');
  if (!bgDiv) {
    bgDiv = element.querySelector('.text-with-bg__bg');
  }
  if (bgDiv && bgDiv.style && bgDiv.style.backgroundImage) {
    const match = bgDiv.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (match && match[1]) {
      bgUrl = match[1];
      // If relative, try to prepend document.location.origin ONLY if available and not null/undefined and not 'null'
      if (bgUrl.startsWith('/')) {
        let origin;
        try {
          origin = document && document.location && document.location.origin ? document.location.origin : undefined;
        } catch(e){}
        // Only prepend origin if it's a non-empty string and not 'null'
        if (origin && origin !== 'null') {
          bgUrl = origin + bgUrl;
        } // else leave bgUrl as-is (relative)
      }
    }
  }
  let bgImageEl = null;
  if (bgUrl) {
    bgImageEl = document.createElement('img');
    bgImageEl.src = bgUrl;
    bgImageEl.alt = '';
  }
  const bgImageRow = [bgImageEl ? bgImageEl : ''];

  // 3. Content row
  const content = [];

  // Title as h1
  const titleEl = element.querySelector('.text-with-bg__title');
  if (titleEl) {
    const h1 = document.createElement('h1');
    h1.innerHTML = titleEl.innerHTML;
    content.push(h1);
  }
  // Logo
  const logoImg = element.querySelector('img.text-with-bg__logo');
  if (logoImg) {
    content.push(logoImg);
  }
  // Description
  const desc = element.querySelector('.text-with-bg__desc');
  if (desc) {
    Array.from(desc.childNodes).forEach((node) => {
      if (
        (node.nodeType === 1 && node.tagName === 'P') || // ELEMENT_NODE
        (node.nodeType === 3 && node.textContent.trim()) // TEXT_NODE
      ) {
        content.push(node);
      }
    });
  }
  // CTA
  const cta = element.querySelector('a.button');
  if (cta) {
    content.push(cta);
  }
  const contentRow = [content.length ? content : ''];

  // Final block table: header, background image, content
  const rows = [headerRow, bgImageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

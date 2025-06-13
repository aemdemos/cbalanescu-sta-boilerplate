/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const cards = Array.from(element.querySelectorAll(':scope > .teaser-item'));
  const ELEMENT_NODE = 1;
  const TEXT_NODE = 3;
  const rows = cards.map(card => {
    const img = card.querySelector('img');
    const content = card.querySelector('.teaser-item__content');
    const frag = document.createDocumentFragment();
    // Title
    const titleDiv = content && content.querySelector('.teaser-item__title');
    if (titleDiv && titleDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      frag.appendChild(strong);
      frag.appendChild(document.createElement('br'));
    }
    // Description (flatten to plain text, not <p>)
    const descDiv = content && content.querySelector('.teaser-item__desc');
    if (descDiv) {
      // Grab all textContent from child nodes (including <p>) and add as plain text with a br
      Array.from(descDiv.childNodes).forEach(node => {
        let txt = '';
        if (node.nodeType === ELEMENT_NODE || node.nodeType === TEXT_NODE) {
          txt = node.textContent.trim();
        }
        if (txt) {
          frag.appendChild(document.createTextNode(txt));
          frag.appendChild(document.createElement('br'));
        }
      });
    }
    // CTA
    const cta = content && content.querySelector('a[href]');
    if (cta) {
      frag.appendChild(document.createElement('br'));
      frag.appendChild(cta);
    }
    // Remove trailing <br> if present
    while (frag.lastChild && frag.lastChild.tagName === 'BR') frag.removeChild(frag.lastChild);
    return [img, frag];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}

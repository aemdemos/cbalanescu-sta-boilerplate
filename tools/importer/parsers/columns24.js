/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Columns (columns24)'];

  // Try to locate the hero area with two columns
  const hero = element.querySelector('.hero-banner-video');

  let leftCol = null;
  let rightCol = null;

  if (hero) {
    leftCol = hero.querySelector('.hero-banner-video__text');
    rightCol = hero.querySelector('.hero-banner-video__video-wrapper');
    // Add transcript (if present) to rightCol
    const transcript = element.querySelector('.hero-banner-video__transcript');
    if (rightCol && transcript) {
      rightCol.appendChild(transcript);
    }
    // Fix: convert non-image src elements in rightCol to links
    if (rightCol) {
      // Convert videos with src
      const videos = Array.from(rightCol.querySelectorAll('video[src]'));
      videos.forEach((vid) => {
        // Only convert if src exists and is non-empty
        const src = vid.getAttribute('src');
        if (src && src !== '' && vid.tagName.toLowerCase() !== 'img') {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src;
          vid.replaceWith(link);
        }
      });
      // Convert iframes with src
      const iframes = Array.from(rightCol.querySelectorAll('iframe[src]'));
      iframes.forEach((iframe) => {
        const src = iframe.getAttribute('src');
        if (src && src !== '') {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src;
          iframe.replaceWith(link);
        }
      });
    }
  }

  // Fallback: use first two divs inside the element
  if (!leftCol || !rightCol) {
    const children = Array.from(element.querySelectorAll(':scope > div'));
    leftCol = leftCol || children[0];
    rightCol = rightCol || children[1];
    // Fix: convert non-image src elements in rightCol to links (fallback)
    if (rightCol) {
      const videos = Array.from(rightCol.querySelectorAll('video[src]'));
      videos.forEach((vid) => {
        const src = vid.getAttribute('src');
        if (src && src !== '' && vid.tagName.toLowerCase() !== 'img') {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src;
          vid.replaceWith(link);
        }
      });
      const iframes = Array.from(rightCol.querySelectorAll('iframe[src]'));
      iframes.forEach((iframe) => {
        const src = iframe.getAttribute('src');
        if (src && src !== '') {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src;
          iframe.replaceWith(link);
        }
      });
    }
  }
  if (!leftCol) {
    leftCol = document.createElement('div');
  }
  if (!rightCol) {
    rightCol = document.createElement('div');
  }

  const columnsRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}

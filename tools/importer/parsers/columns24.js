/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left (text) and right (video) columns
  const left = element.querySelector('.hero-banner-video__text');
  const right = element.querySelector('.hero-banner-video__video-wrapper');

  // Compose header row as a single column (per the example)
  const headerRow = ['Columns (columns24)'];

  // Compose the left cell: use the whole left block
  const leftCell = left;

  // Compose the right cell: must be a link to the video only, not the video player markup
  let rightCell = '';
  if (right) {
    // Try to extract the Brightcove video ID and Account
    const videoJsDiv = right.querySelector('.video-js[data-video-id][data-account]');
    if (videoJsDiv) {
      const videoId = videoJsDiv.getAttribute('data-video-id');
      const accountId = videoJsDiv.getAttribute('data-account');
      if (videoId && accountId) {
        const link = document.createElement('a');
        link.href = `https://players.brightcove.net/${accountId}/default_default/index.html?videoId=${videoId}`;
        link.textContent = 'Watch Video';
        link.target = '_blank';
        rightCell = link;
      } else {
        // If no video ID/account, check for <video> tag with src attribute (non-image src)
        const video = right.querySelector('video[src]');
        if (video) {
          const src = video.getAttribute('src');
          if (src) {
            const link = document.createElement('a');
            link.href = src;
            link.textContent = src;
            rightCell = link;
          }
        }
      }
    } else {
      // As fallback, check for <video> tag with src attribute (non-image src)
      const video = right.querySelector('video[src]');
      if (video) {
        const src = video.getAttribute('src');
        if (src) {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src;
          rightCell = link;
        }
      }
    }
  }

  // Compose the content row (2 columns)
  const contentRow = [leftCell, rightCell];

  // Build the table cell structure: first row only one column, second row 2 columns
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

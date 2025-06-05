/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row as specified
  const headerRow = ['Embed (embedVideo23)'];

  // 2. Extract Brightcove video information
  let videoUrl = null;
  let posterImg = null;
  // Find the .hero-banner-video__video-wrapper
  const videoWrapper = element.querySelector('.hero-banner-video__video-wrapper');
  if (videoWrapper) {
    // Find an image (poster)
    const img = videoWrapper.querySelector('img');
    if (img && img.src) posterImg = img;
    // Find Brightcove player div
    const playerDiv = videoWrapper.querySelector('[data-account][data-video-id]');
    if (playerDiv) {
      const account = playerDiv.getAttribute('data-account');
      const videoId = playerDiv.getAttribute('data-video-id');
      if (account && videoId) {
        videoUrl = `https://players.brightcove.net/${account}/default_default/index.html?videoId=${videoId}`;
      }
    }
  }

  // 3. Build cell content
  const cellContent = [];
  if (posterImg) cellContent.push(posterImg);
  if (videoUrl) {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(a);
  }
  // fallback: if nothing could be extracted, reference the wrapper for resilience
  if (!videoUrl && videoWrapper) cellContent.push(videoWrapper);

  // 4. Create the block table with 1 col, 2 rows as per block description
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [cellContent]
  ], document);

  // 5. Replace the original element
  element.replaceWith(table);
}

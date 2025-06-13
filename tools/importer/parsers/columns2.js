/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns for the block:
  // Left: video + transcript
  // Right: title, content, CTA
  // The structure is: .container > .hero-banner-video (left), .hero-banner-video__text (right)

  // Find left (video & transcript)
  const videoSection = element.querySelector('.hero-banner-video');
  let leftColContent = [];
  if (videoSection) {
    // Locate the poster image for the video (visual content for the column)
    const videoWrapper = videoSection.querySelector('.hero-banner-video__video-wrapper');
    let posterImg = null;
    if (videoWrapper) {
      const poster = videoWrapper.querySelector('.vjs-poster img');
      if (poster) posterImg = poster;
    }
    if (posterImg) leftColContent.push(posterImg);

    // Optionally include transcript content if available
    const transcriptDiv = videoSection.querySelector('.hero-banner-video__transcript');
    if (transcriptDiv) {
      // The .collapse__content div contains all transcript <p>s
      const transcriptContent = transcriptDiv.querySelector('.collapse__content');
      if (transcriptContent) {
        leftColContent.push(transcriptContent);
      }
    }
  }

  // Find right (title, content, CTA)
  const rightCol = element.querySelector('.hero-banner-video__text');

  // If either column is missing, fall back to an empty div to preserve table shape
  const leftCell = leftColContent.length > 0 ? leftColContent : document.createElement('div');
  const rightCell = rightCol ? rightCol : document.createElement('div');

  // Correct header row EXACLTY as required
  const cells = [
    ['Columns (columns2)'],
    [leftCell, rightCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

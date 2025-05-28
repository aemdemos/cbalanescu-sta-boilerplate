/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns24)'];

  // Extracting title
  const title = element.querySelector(':scope .hero-banner-video__title');

  // Extracting content
  const content = element.querySelector(':scope .hero-banner-video__content');

  // Extracting video
  const videoWrapper = element.querySelector(':scope .hero-banner-video__video-wrapper');
  const videoPoster = videoWrapper.querySelector('img');
  const videoSrc = videoWrapper.querySelector('video')?.src || videoWrapper.querySelector('video')?.getAttribute('data-video-id');
  let videoLink = null;
  if (videoSrc) {
    videoLink = document.createElement('a');
    videoLink.href = videoSrc;
    videoLink.textContent = 'Watch Video';
  }

  // Extracting transcript
  const transcript = element.querySelector(':scope .hero-banner-video__transcript');
  const transcriptContent = transcript?.querySelector('.collapse__content');
  const transcriptButton = transcript?.querySelector('[data-role="title"]')?.textContent;

  // Creating rows
  const rows = [
    headerRow, // Header
    [title, content],
    [videoPoster, videoLink],
    [transcriptButton, transcriptContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(blockTable);
}
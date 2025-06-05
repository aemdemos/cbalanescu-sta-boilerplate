/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left column (text)
  const left = element.querySelector('.hero-banner-video__text');

  // Compose the right column (video and transcript)
  let rightContent = [];
  const heroBannerVideo = element.querySelector('.hero-banner-video');
  if (heroBannerVideo) {
    const videoEmbed = heroBannerVideo.querySelector('.video-embed-field-provider-brightcove');
    if (videoEmbed) rightContent.push(videoEmbed);
    const transcript = heroBannerVideo.querySelector('.hero-banner-video__transcript');
    if (transcript) {
      const transcriptParts = [];
      const transcriptButton = transcript.querySelector('.collapse__title');
      if (transcriptButton) transcriptParts.push(transcriptButton);
      const transcriptContent = transcript.querySelector('.collapse__content');
      if (transcriptContent) transcriptParts.push(transcriptContent);
      if (transcriptParts.length > 0) {
        rightContent = rightContent.concat(transcriptParts);
      }
    }
  }
  // Fallback, ensure both columns exist
  const leftCell = left || document.createElement('div');
  const rightCell = rightContent.length === 1 ? rightContent[0] : rightContent;

  // Proper header: a single cell/column
  const cells = [
    ['Columns (columns10)'],
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns2)'];

  // Extract the left column content dynamically
  const leftColumnContent = [];

  const titleWrapper = element.querySelector('.hero-banner-video__title-wrapper');
  if (titleWrapper) {
    leftColumnContent.push(...titleWrapper.children);
  }

  const transcriptSection = element.querySelector('.hero-banner-video__transcript');
  if (transcriptSection) {
    leftColumnContent.push(transcriptSection);
  }

  // Extract the right column content dynamically
  const rightColumnContent = [];

  const videoWrapper = element.querySelector('.hero-banner-video__video-wrapper');
  if (videoWrapper) {
    const videoPoster = videoWrapper.querySelector('picture');
    if (videoPoster) {
      rightColumnContent.push(videoPoster);
    }
  }

  const textSection = element.querySelector('.hero-banner-video__text');
  if (textSection) {
    rightColumnContent.push(textSection);
  }

  // Build the table
  const cells = [
    headerRow,
    [leftColumnContent, rightColumnContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
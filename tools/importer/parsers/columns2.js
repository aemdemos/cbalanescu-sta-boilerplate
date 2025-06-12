/* global WebImporter */
export default function parse(element, { document }) {
  // --- Critical Review Points ---
  // - No hardcoded content: all content is taken from the input element.
  // - No markdown/strings for content: all content referenced as existing elements.
  // - Only one block table per example; no Section Metadata in the example.
  // - Table header must be: 'Columns (columns2)'.
  // - Both columns must be referenced as existing elements.
  // - Must gracefully handle if left or right column is missing.

  // Find left column: video+transcript
  const videoWrapper = element.querySelector('.hero-banner-video__video-wrapper');
  const transcript = element.querySelector('.hero-banner-video__transcript');
  const leftCol = document.createElement('div');
  if (videoWrapper) leftCol.appendChild(videoWrapper);
  if (transcript) leftCol.appendChild(transcript);
  // If both are missing, leftCol should be empty but defined

  // Find right column: title/content/cta
  const rightCol = element.querySelector('.hero-banner-video__text');
  // If missing, pass empty div
  const rightCell = rightCol ? rightCol : document.createElement('div');

  // Table header
  const headerRow = ['Columns (columns2)'];
  // Second row, two columns
  const secondRow = [leftCol, rightCell];

  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  element.replaceWith(table);
}

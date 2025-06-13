/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero banner (top-level content block)
  const heroBanner = element.querySelector('.hero-banner-video');
  if (!heroBanner) {
    // fallback: use the element itself if structure is missing
    return;
  }

  // Get the left column: text content
  const textCol = heroBanner.querySelector('.hero-banner-video__text');
  // Get the right column: video content
  const videoCol = heroBanner.querySelector('.hero-banner-video__video-wrapper');

  // Prepare the header row, matching the example: Columns (columns24)
  const headerRow = ['Columns (columns24)'];
  // Second row: two columns
  const contentRow = [textCol, videoCol];
  const cells = [headerRow, contentRow];

  // Handle transcript: if present, add an extra row spanning both columns
  const transcriptCol = heroBanner.querySelector('.hero-banner-video__transcript');
  if (transcriptCol) {
    // To span both columns, we'll set the row as a single cell (the table renderer will handle colspan)
    const transcriptWrapper = document.createElement('div');
    transcriptWrapper.appendChild(transcriptCol);
    cells.push([transcriptWrapper]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

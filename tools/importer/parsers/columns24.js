/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left (text) and right (video) columns
  const textBlock = element.querySelector('.hero-banner-video__text');
  const videoWrapper = element.querySelector('.hero-banner-video__video-wrapper');
  // Get the transcript block, if present
  const transcriptBlock = element.querySelector('.hero-banner-video__transcript');

  const leftCell = textBlock || document.createElement('div');
  const rightCell = videoWrapper || document.createElement('div');

  // If transcript exists and has visible content, place it in the left column under the text (as is common for this type of block)
  if (transcriptBlock && transcriptBlock.textContent.trim()) {
    leftCell.appendChild(transcriptBlock);
  }

  // The table must have the header as a single cell, then a row with two cells
  const rows = [
    ['Columns (columns24)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

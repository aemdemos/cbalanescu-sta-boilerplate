/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns in the block
  // There should be two: one for video (left), one for content/cta (right)
  const divs = Array.from(element.querySelectorAll(':scope > div'));

  // The main left column is the one with class 'hero-banner-video with-icon'
  // The right column is the one with class 'hero-banner-video__text'
  const leftCol = divs.find(d => d.classList.contains('hero-banner-video'));
  const rightCol = divs.find(d => d.classList.contains('hero-banner-video__text'));

  // Defensive: either column may be missing, if so, use empty placeholder
  // Build left cell contents
  let leftCell;
  if (leftCol) {
    const leftFragment = document.createElement('div');
    // Grab icon/title
    const titleWrapper = leftCol.querySelector('.hero-banner-video__title-wrapper');
    if (titleWrapper) leftFragment.appendChild(titleWrapper);
    // Handle video: replace <video> (or any non-image element with src) with link
    let videoEmbed = leftCol.querySelector('.video-embed-field-provider-brightcove');
    if (videoEmbed) {
      // Clone the videoEmbed so we can replace video tags with links safely
      videoEmbed = videoEmbed.cloneNode(true);
      // Find all elements with src that are not <img>
      videoEmbed.querySelectorAll('[src]:not(img)').forEach(el => {
        const src = el.getAttribute('src');
        if (src) {
          // Create a link element
          const a = document.createElement('a');
          a.href = src;
          a.textContent = src;
          el.replaceWith(a);
        }
      });
      leftFragment.appendChild(videoEmbed);
    }
    // Grab transcript (optional)
    const transcript = leftCol.querySelector('.hero-banner-video__transcript');
    if (transcript) leftFragment.appendChild(transcript);
    leftCell = leftFragment.childNodes.length > 0 ? leftFragment : document.createTextNode('');
  } else {
    leftCell = document.createTextNode('');
  }

  // Build right cell contents
  let rightCell;
  if (rightCol) {
    const rightFragment = document.createElement('div');
    const rightTitleWrapper = rightCol.querySelector('.hero-banner-video__title-wrapper');
    if (rightTitleWrapper) rightFragment.appendChild(rightTitleWrapper);
    const rightContent = rightCol.querySelector('.hero-banner-video__content');
    if (rightContent) rightFragment.appendChild(rightContent);
    const cta = rightCol.querySelector('.hero-banner-video__cta');
    if (cta) rightFragment.appendChild(cta);
    rightCell = rightFragment.childNodes.length > 0 ? rightFragment : document.createTextNode('');
  } else {
    rightCell = document.createTextNode('');
  }

  // Create the table structure for Columns (columns2)
  const cells = [
    ['Columns (columns2)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

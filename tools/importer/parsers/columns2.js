/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns: left (video and transcript), right (text, cta)
  const children = Array.from(element.querySelectorAll(':scope > div'));
  let leftCol = null, rightCol = null;
  // Identify left and right columns by inner content/classes
  children.forEach(child => {
    if (child.querySelector('.hero-banner-video__video-wrapper')) {
      leftCol = child;
    } else if (child.classList.contains('hero-banner-video__text')) {
      rightCol = child;
    }
  });
  // Fallback by order if not found
  if (!leftCol && children.length > 0) leftCol = children[0];
  if (!rightCol && children.length > 1) rightCol = children[1];

  // Compose content for each column, referencing existing elements
  let leftContent = [];
  if (leftCol) {
    // Try to include video and transcript
    const videoWrapper = leftCol.querySelector('.hero-banner-video__video-wrapper');
    const transcript = leftCol.querySelector('.hero-banner-video__transcript');
    if (videoWrapper) leftContent.push(videoWrapper);
    if (transcript) leftContent.push(transcript);
    // Fallback: just use leftCol if nothing else
    if (leftContent.length === 0) leftContent = [leftCol];
  }

  let rightContent = [];
  if (rightCol) {
    // Title, text content, CTA
    const titleWrapper = rightCol.querySelector('.hero-banner-video__title-wrapper');
    const content = rightCol.querySelector('.hero-banner-video__content');
    const cta = rightCol.querySelector('a.button, a.cta-link');
    if (titleWrapper) rightContent.push(titleWrapper);
    if (content) rightContent.push(content);
    if (cta) rightContent.push(cta);
    // Fallback: just use rightCol if nothing else
    if (rightContent.length === 0) rightContent = [rightCol];
  }

  // Table creation
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns2)'],
    [leftContent, rightContent],
  ], document);

  element.replaceWith(table);
}

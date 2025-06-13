/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content block
  const content = element.querySelector('.priority-tool-entry-form');
  // Get the image (if any)
  const img = content.querySelector('img');
  // Get the heading/title (as heading element)
  const heading = content.querySelector('.priority-tool-entry-form__title');
  // Get the description element
  const desc = content.querySelector('.priority-tool-entry-form__desc');
  // Get the CTA button wrapper
  const btnWrapper = content.querySelector('.priority-tool-entry-form__btn-wrapper');
  // Compose the third row content: heading, description, button
  const row3Content = [];
  if (heading) row3Content.push(heading);
  if (desc) row3Content.push(desc);
  if (btnWrapper) row3Content.push(btnWrapper);
  // Build the table as per the markdown example, with exact header 'Hero'
  const cells = [
    ['Hero'],
    [img ? img : ''],
    [row3Content.length ? row3Content : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

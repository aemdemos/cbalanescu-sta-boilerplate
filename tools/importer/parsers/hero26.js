/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block
  const headerRow = ['Hero (hero26)'];

  //--- Content extraction ---//

  // Find the main heading
  const title = element.querySelector('h4.text-with-bg__title');
  let heading = null;
  if (title) {
    heading = document.createElement('h1');
    heading.innerHTML = title.innerHTML;
  }

  // Find the logo image (optional)
  const logo = element.querySelector('img.text-with-bg__logo');

  // Find the description block (optional)
  const desc = element.querySelector('.text-with-bg__desc');

  // Find the CTA button (optional)
  const cta = element.querySelector('a.button');

  // Compose the content in correct order: logo, heading, desc, CTA
  const cellContent = [];
  if (logo) cellContent.push(logo);
  if (heading) cellContent.push(heading);
  if (desc) cellContent.push(desc);
  if (cta) cellContent.push(cta);

  // Always produce a valid table (empty cell if no content found)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [cellContent.length > 0 ? cellContent : '']
  ], document);

  element.replaceWith(table);
}

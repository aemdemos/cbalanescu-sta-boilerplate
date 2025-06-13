/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content container
  const content = element.querySelector('.full-size-modal__content');
  if (!content) {
    element.replaceWith();
    return;
  }
  // Find the image
  const img = content.querySelector('.priority-tool-entry-form__img');
  // Find the title (h3)
  const title = content.querySelector('.priority-tool-entry-form__title');
  // Find the description
  const desc = content.querySelector('.priority-tool-entry-form__desc');
  // Find the CTA button inside the form
  const ctaForm = content.querySelector('.priority-tool-entry-form__form');
  // Prepare block content (preserve original order & semantics)
  const blockContent = [];
  if (title) blockContent.push(title);
  if (desc) blockContent.push(desc);
  if (ctaForm) blockContent.push(ctaForm);
  // Build table rows as per the markdown example
  const rows = [
    ['Hero'],
    [img ? img : ''],
    [blockContent.length ? blockContent : ''],
  ];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

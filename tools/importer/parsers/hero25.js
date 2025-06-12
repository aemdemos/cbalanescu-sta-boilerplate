/* global WebImporter */
export default function parse(element, { document }) {
  // Find the modal content root
  const content = element.querySelector('.full-size-modal__content');
  let blockContent = [];
  if (content) {
    // Find the main hero sub-block
    const entryForm = content.querySelector('.priority-tool-entry-form');
    if (entryForm) {
      // Collect image, heading, description, and CTA (in order as they appear)
      const children = Array.from(entryForm.children).filter(el =>
        el.tagName === 'IMG' ||
        el.tagName === 'H3' ||
        el.classList.contains('priority-tool-entry-form__desc') ||
        el.tagName === 'FORM'
      );
      blockContent = children;
    }
  }
  // Fallback: if missing, use the entire modal content
  if (blockContent.length === 0 && content) {
    blockContent = [content];
  }
  // Build table: header EXACTLY as specified, second row: one cell with all block content
  const cells = [
    ['Hero (hero25)'],
    [blockContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

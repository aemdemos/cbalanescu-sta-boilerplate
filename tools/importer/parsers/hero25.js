/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero25)'];

  // Combine all extracted content into a single column
  const contentRow = [];

  // Extract image
  const image = element.querySelector('.priority-tool-entry-form__img');
  if (image) {
    contentRow.push(image);
  }

  // Extract title
  const title = element.querySelector('.priority-tool-entry-form__title');
  if (title) {
    const heading = document.createElement('h1');
    heading.innerHTML = title.innerHTML;
    contentRow.push(heading);
  }

  // Extract description
  const description = element.querySelector('.priority-tool-entry-form__desc');
  if (description) {
    contentRow.push(description);
  }

  // Extract call-to-action button
  const buttonWrapper = element.querySelector('.priority-tool-entry-form__btn-wrapper');
  if (buttonWrapper) {
    const button = buttonWrapper.querySelector('button');
    if (button) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = button.textContent;
      contentRow.push(link);
    }
  }

  // Create table
  const cells = [
    headerRow,
    [contentRow] // Combine all extracted elements into a single cell
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the block table
  element.replaceWith(block);
}
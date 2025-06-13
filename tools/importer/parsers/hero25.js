/* global WebImporter */
export default function parse(element, { document }) {
  const content = element.querySelector('.full-size-modal__content');
  if (!content) return;
  const priorityBlock = content.querySelector('.priority-tool-block');
  if (!priorityBlock) return;
  const entryForm = priorityBlock.querySelector('.priority-tool-entry-form');
  if (!entryForm) return;

  // Extract image (optional)
  const img = entryForm.querySelector('img');

  // Extract and upgrade title (mandatory) to <h1>
  let heading = entryForm.querySelector('.priority-tool-entry-form__title');
  if (heading) {
    if (heading.tagName.toLowerCase() !== 'h1') {
      const h1 = document.createElement('h1');
      h1.innerHTML = heading.innerHTML;
      heading = h1;
    }
  }

  // Extract description (optional)
  const desc = entryForm.querySelector('.priority-tool-entry-form__desc');

  // Find button and convert to <p><a>...</a></p> (optional CTA)
  let cta = null;
  const btn = entryForm.querySelector('button[type="submit"]');
  if (btn) {
    const link = document.createElement('a');
    link.textContent = btn.textContent.trim();
    link.href = '#';
    cta = document.createElement('p');
    cta.appendChild(link);
  }

  // Compose all content into a single cell (img, heading, desc, cta)
  const cellContent = [];
  if (img) cellContent.push(img);
  if (heading) cellContent.push(heading);
  if (desc) cellContent.push(desc);
  if (cta) cellContent.push(cta);

  // Only create table if heading exists
  if (!heading) return;

  const cells = [
    ['Hero (hero25)'],
    [cellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .text-image-item (assumed only one in this HTML)
  const item = element.querySelector('.text-image-item');
  let textCell = '';
  let imgCell = '';
  if (item) {
    const img = item.querySelector('img');
    if (img) imgCell = img;
    const content = item.querySelector('.text-image-item__content');
    if (content) textCell = content;
  }

  // Create table manually to force header colspan
  const table = document.createElement('table');

  // Header row with colspan=2
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.setAttribute('colspan', '2');
  headerTh.textContent = 'Columns (columns38)';
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Data row
  const dataTr = document.createElement('tr');
  const textTd = document.createElement('td');
  if (textCell) textTd.append(textCell);
  const imgTd = document.createElement('td');
  if (imgCell) imgTd.append(imgCell);
  dataTr.appendChild(textTd);
  dataTr.appendChild(imgTd);
  table.appendChild(dataTr);

  element.replaceWith(table);
}
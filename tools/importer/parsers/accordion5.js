/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the navigation items
  const navItems = [...element.querySelectorAll(':scope > div > ul > li')];

  // Prepare the header row with the corrected text
  const headerRow = ['Accordion (accordion5)'];

  // Map the navigation items into table rows
  const rows = navItems.map((item) => {
    const titleElement = item.querySelector(':scope > a');

    // Ensure the title element is extracted dynamically
    if (!titleElement) return null;
    const titleCell = titleElement.cloneNode(true); // Clone the title element

    const dropdownMenu = item.querySelector(':scope > ul');

    let contentCell;
    if (dropdownMenu) {
      const subItems = [...dropdownMenu.querySelectorAll(':scope > li > a')];
      contentCell = subItems.length > 0 ? subItems.map((subItem) => subItem.cloneNode(true)) : null; // Handle empty dropdown
    } else {
      contentCell = null; // No dropdown means no content
    }

    return contentCell ? [titleCell, contentCell] : [titleCell]; // Only include contentCell if it exists
  }).filter(Boolean); // Filter out null rows

  // Combine the header row and content rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
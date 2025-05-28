/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards10)'];

    const rows = Array.from(element.querySelectorAll(':scope > div')).map((teaserItem) => {
        const image = teaserItem.querySelector('img');
        const title = teaserItem.querySelector('.teaser-item__title');
        const description = teaserItem.querySelector('.teaser-item__desc');
        const link = teaserItem.querySelector('a');

        const textContent = [];

        if (title) {
            const heading = document.createElement('strong');
            heading.textContent = title.textContent.trim();
            textContent.push(heading);
        }

        if (description) {
            const para = document.createElement('p');
            para.textContent = description.textContent.trim();
            textContent.push(para);
        }

        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent.trim();
            textContent.push(linkElement);
        }

        return [image, textContent];
    });

    const tableData = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(block);
}
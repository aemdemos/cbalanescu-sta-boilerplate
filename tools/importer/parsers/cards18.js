/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards18)'];

    const cards = Array.from(element.querySelectorAll(':scope > div.teaser-icon-item')).map((item) => {
        const image = item.querySelector('.teaser-icon-item__icon');
        const title = item.querySelector('.teaser-icon-item__title');
        const description = item.querySelector('.teaser-icon-item__desc');
        const ctaButton = item.querySelector('.teaser-icon-item__cta > button');

        const ctaLink = ctaButton ? document.createElement('a') : null;
        if (ctaButton) {
            ctaLink.href = '#';
            ctaLink.textContent = ctaButton.textContent.trim();
        }

        const textContent = [];

        if (title) {
            const titleHeading = document.createElement('h4');
            titleHeading.textContent = title.textContent.trim();
            textContent.push(titleHeading);
        }

        if (description) {
            textContent.push(description);
        }

        if (ctaLink) {
            textContent.push(ctaLink);
        }

        return [image, textContent];
    });

    const tableData = [headerRow, ...cards];
    const block = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(block);
}
/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import hero9Parser from './parsers/hero9.js';
import cards5Parser from './parsers/cards5.js';
import search6Parser from './parsers/search6.js';
import columns1Parser from './parsers/columns1.js';
import columns11Parser from './parsers/columns11.js';
import tabs3Parser from './parsers/tabs3.js';
import cardsNoImages13Parser from './parsers/cardsNoImages13.js';
import hero12Parser from './parsers/hero12.js';
import columns10Parser from './parsers/columns10.js';
import cards15Parser from './parsers/cards15.js';
import columns8Parser from './parsers/columns8.js';
import columns17Parser from './parsers/columns17.js';
import cards14Parser from './parsers/cards14.js';
import columns20Parser from './parsers/columns20.js';
import cards18Parser from './parsers/cards18.js';
import cards19Parser from './parsers/cards19.js';
import columns22Parser from './parsers/columns22.js';
import cards25Parser from './parsers/cards25.js';
import hero26Parser from './parsers/hero26.js';
import embedVideo23Parser from './parsers/embedVideo23.js';
import columns21Parser from './parsers/columns21.js';
import cards31Parser from './parsers/cards31.js';
import cards32Parser from './parsers/cards32.js';
import columns28Parser from './parsers/columns28.js';
import cards24Parser from './parsers/cards24.js';
import columns30Parser from './parsers/columns30.js';
import cards35Parser from './parsers/cards35.js';
import accordion2Parser from './parsers/accordion2.js';
import cards33Parser from './parsers/cards33.js';
import columns27Parser from './parsers/columns27.js';
import cards36Parser from './parsers/cards36.js';
import cards37Parser from './parsers/cards37.js';
import cards34Parser from './parsers/cards34.js';
import accordion4Parser from './parsers/accordion4.js';
import columns38Parser from './parsers/columns38.js';
import tabs29Parser from './parsers/tabs29.js';
import accordion16Parser from './parsers/accordion16.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero9: hero9Parser,
  cards5: cards5Parser,
  search6: search6Parser,
  columns1: columns1Parser,
  columns11: columns11Parser,
  tabs3: tabs3Parser,
  cardsNoImages13: cardsNoImages13Parser,
  hero12: hero12Parser,
  columns10: columns10Parser,
  cards15: cards15Parser,
  columns8: columns8Parser,
  columns17: columns17Parser,
  cards14: cards14Parser,
  columns20: columns20Parser,
  cards18: cards18Parser,
  cards19: cards19Parser,
  columns22: columns22Parser,
  cards25: cards25Parser,
  hero26: hero26Parser,
  embedVideo23: embedVideo23Parser,
  columns21: columns21Parser,
  cards31: cards31Parser,
  cards32: cards32Parser,
  columns28: columns28Parser,
  cards24: cards24Parser,
  columns30: columns30Parser,
  cards35: cards35Parser,
  accordion2: accordion2Parser,
  cards33: cards33Parser,
  columns27: columns27Parser,
  cards36: cards36Parser,
  cards37: cards37Parser,
  cards34: cards34Parser,
  accordion4: accordion4Parser,
  columns38: columns38Parser,
  tabs29: tabs29Parser,
  accordion16: accordion16Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};

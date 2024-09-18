'use strict';

const allowedHosts = [
  'beratung.dev',
  'beratung.show',
  'beratung.io'
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  for (let host of allowedHosts) {
    if (tab.url.includes(host)) {
      return chrome.pageAction.show(tabId);
    }
  }
});

'use strict';

const allowedHosts = [
  'dev.moneymeets.net',
  'my.moneymeets.com'
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  for (let host of allowedHosts) {
    if (tab.url.includes(host)) {
      return chrome.pageAction.show(tabId);
    }
  }
});

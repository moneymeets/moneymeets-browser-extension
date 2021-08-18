'use strict';

const MetaNameEnum = Object.freeze({
  MM_VERSION: 'moneymeets:version',
  MM_BRANCH: 'moneymeets:branch'
});

let metaElementVersionContent;
let metaElementBranchContent;

const interval = setInterval(() => {
  metaElementVersionContent = getAttributeValue(document.querySelector(`meta[name="${MetaNameEnum.MM_VERSION}"]`), 'content') || '';
  metaElementBranchContent =  getAttributeValue(document.querySelector(`meta[name="${MetaNameEnum.MM_BRANCH}"]`), 'content') || '';
  storeMetadata(metaElementVersionContent, metaElementBranchContent);
  clearInterval(interval);
}, 500);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    storeMetadata(metaElementVersionContent, metaElementBranchContent);
  }
});

function getAttributeValue(htmlElement, attributeName) {
  if (htmlElement && htmlElement.hasAttribute(attributeName)) {
    return htmlElement.getAttribute(attributeName);
  }
}

function storeMetadata(gitDescribeOutput, gitBranchOutput) {
  chrome.storage.local.set({
    git_describe: gitDescribeOutput,
    git_branch: gitBranchOutput
  });
}

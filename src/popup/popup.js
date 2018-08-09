'use strict';

const GitDescribeObj = function (tag, distance, hash) {
  this.tag = tag;             // v1.0.0
  this.distance = distance;   // 10
  this.hash = hash;           // g12a34b5
};

chrome.storage.local.get(['git_describe', 'git_branch'], data => {
  if (data.git_describe && data.git_branch) {
    generateData(data.git_describe, data.git_branch);
  }
});

function generateData(gitDescribeOutput, gitBranchOutput) {
  const gitDescribe = new GitDescribeObj(...gitDescribeOutput.split('-'));
  const changelogUrl = encodeURI(`https://moneymeets.atlassian.net/issues/?jql=fixVersion = "FE ${gitBranchOutput === 'develop' ? 'Next Release' : gitDescribe.tag}"`);

  document.getElementById('js-git-tag').textContent = gitDescribe.tag.substr(1);
  document.getElementById('js-changelog-link').setAttribute('href', changelogUrl);
  document.getElementById('js-git-distance').textContent = gitDescribe.distance;
  document.getElementById('js-git-hash').textContent = gitDescribe.hash.substr(1);
  document.getElementById('js-git-branch').textContent = gitBranchOutput;
}

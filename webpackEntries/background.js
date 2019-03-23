// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const supportedSitesURLs = [
  'g1.globo.com',
  'www.r7.com'
]

function addBadBlockRules(){
  const urlRules = []

    supportedSitesURLs.forEach((siteUrl) => {
      urlRules.push({
          // That fires when a page's URL contains a 'netflix.com' ...
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: siteUrl},
            })
          ],
          // And shows the extension's page action.
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
      })
    })

    chrome.declarativeContent.onPageChanged.addRules(urlRules);
}

//===
// Rules
//===
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, addBadBlockRules);
});
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import SITES from '../src/shared/constants/sites.constant'
const _ = require('lodash')

const sitesInfo = Object.values(SITES)
const supportedSitesURLs = sitesInfo.map(siteInfo => siteInfo.siteRoot)

function addBadBlockRules(){
  const urlRules = []
  supportedSitesURLs.forEach((siteUrl) => {
    if(_.isArray(siteUrl)){
      siteUrl.forEach((URL) => {
        urlRules.push(buildURLRule(URL))
      })
    } else {
      urlRules.push(buildURLRule(siteUrl))
    }
  })

  chrome.declarativeContent.onPageChanged.addRules(urlRules);
}

function buildURLRule(siteUrl){
  return {
    // That fires when a page's URL contains a 'netflix.com' ...
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlContains: siteUrl},
      })
    ],
    // And shows the extension's page action.
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
  }
}

//===
// Rules
//===
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, addBadBlockRules);
});
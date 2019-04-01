import '../src/shared/plugins/webpackPublicPath'
import '../src/popupApp/main.popup.scss'
import $ from 'jquery'

$(document).ready(() => {
  const nsShortDescription = chrome.i18n.getMessage("appDescription")
  const nsMadeWith = chrome.i18n.getMessage("madeWithLove")

  $('.ns-short-description').text(nsShortDescription)
  $('.made-with').text(nsMadeWith)
})
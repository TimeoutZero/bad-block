import sites from '../shared/constants/sites.constant'
const _ = require('lodash')

export default class MainContentAnalyzer {
  constructor(){
    this.SITES       = sites
    this.currentSite = undefined

    this.checkSite()
  }

  checkSite() {
    const sites = Object.values(this.SITES)

    for (let index = 0; index < sites.length; index++) {
      const site = sites[index]

      let isTheSite = false
      if(_.isArray(site.siteRoot)){
        site.siteRoot.forEach((siteUrl) => {
          if(window.location.href.indexOf(siteUrl) > -1){
            isTheSite = true
            return false
          }
        })
      } else {
        isTheSite = window.location.href.indexOf(site.siteRoot) > -1
      }

      if(isTheSite){
        this.currentSite = site
        window.activeBadBlocker = new this.currentSite.siteBlocker()
        break
      }

    }
  }
}
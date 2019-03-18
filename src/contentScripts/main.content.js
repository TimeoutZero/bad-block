import sites from '../shared/constants/sites.constant'

export default class MainContentAnalyzer {
  constructor(){
    this.SITES       = sites
    this.currentSite = undefined

    this.checkSite()
  }

  checkSite() {
    const sites = Object.values(this.SITES)

    for (let index = 0; index < sites.length; index++) {
      const site = sites[index];
      const isTheSite = window.location.href.indexOf(site.siteRoot) > -1
      if(isTheSite){
        this.currentSite = site
        window.activeBadBlocker = new this.currentSite.siteBlocker()
        break
      }

    }
  }
}
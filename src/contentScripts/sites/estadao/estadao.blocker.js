import DOMBadBlocker from "../../../shared/DOMBadBlocker/DOMBadBlocker";
// import g1Style from './g1.style.scss'

export default class EstadaoSiteBlocker {
  constructor() {
    this.DOMBlockers = {}

    const spotlightSettings = {
      name: 'estadao-spotlight' ,

      selectors: {
        rootPostsWatcher: '.manchete-1, .manchete-2',
        post: {
          wrapper : 'itself',
          itself  :'.manchete-1 .destaque-default, .manchete-2 .destaque-default',
          title   : '.title',
          subtitle: '.linha-fina'
        }
      }
    }

    const wrappedContentSettings = {
      name: 'estadao-wrapped-content' ,

      selectors: {
        rootPostsWatcher: '.site-content > .wrap-content',
        post: {
          wrapper : 'itself',
          itself  :'.site-content > .wrap-content .destaque-default',
          title   : '.title',
          subtitle: '.linha-fina'
        }
      }
    }

    this.DOMBlockers.spotlight = new DOMBadBlocker(spotlightSettings)
    this.DOMBlockers.wrappedContent = new DOMBadBlocker(wrappedContentSettings)



  }

}
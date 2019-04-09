import DOMBadBlocker from "../../../shared/DOMBadBlocker/DOMBadBlocker"
import estadaoStyle from './estadao.style.scss'

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

    const trcSpotlightSettings = {
      name: 'estadao-trc-spotlight' ,

      selectors: {
        rootPostsWatcher: '.container-proximas-materias',
        post: {
          wrapper : 'itself',
          itself  : '.trc_rbox_container .trc_spotlight_item',
          title   : '.video-title',
          subtitle: '.branding'
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

    const editorialsSettings = {
      name: 'estadao-editorial' ,

      selectors: {
        rootPostsWatcher: '.row-editorials',
        post: {
          wrapper : 'itself',
          itself  :'.row-editorials .list-editorials-element li',
          title   : '.title'
        }
      }
    }

    const topNewsSettings = {
      name: 'estadao-top-new',

      selectors: {
        rootPostsWatcher: '.mais-lidas-ctds',
        post: {
          wrapper : 'itself',
          itself  :'.mais-lidas-ctds ul li',
          title   : '.title'
        }
      }
    }

    const mediaLabSettings = {
      name: 'estadao-media-lab',

      selectors: {
        rootPostsWatcher: '.row-media-lab',
        post: {
          wrapper : 'itself',
          itself  :'.row-media-lab .destaque-default ',
          title   : '.title',
          subtitle: '.linha-fina'
        }
      }
    }


    this.DOMBlockers.spotlight      = new DOMBadBlocker(spotlightSettings)
    this.DOMBlockers.wrappedContent = new DOMBadBlocker(wrappedContentSettings)

    this.DOMBlockers.trcSpotlight  = new DOMBadBlocker(trcSpotlightSettings)
    this.DOMBlockers.editorials    = new DOMBadBlocker(editorialsSettings)
    this.DOMBlockers.topNews       = new DOMBadBlocker(topNewsSettings)
    this.DOMBlockers.mediaLab      = new DOMBadBlocker(mediaLabSettings)



  }

}
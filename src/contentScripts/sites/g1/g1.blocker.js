import DOMBadBlocker from "../../../shared/DOMBadBlocker";

export default class G1SiteBlocker {
  constructor(sentiment) {

    const postsPagesContainerSelector = '.bstn-fd.bstn-cls-deprecated_.bastian.bstn-feed._bstn-cls-deprecated.editorial.bstn-fd-csr.bstn-cls-deprecated_.bstn-feed-csr._bstn-cls-deprecated'
    const feedSettings = {
      name: 'G1 Feed' ,

      selectors: {
        rootPostsWatcher: postsPagesContainerSelector,
        post: {
          wrapper : '._x',
          itself  :'.feed-post',
          title   : '.feed-post-link',
          subtitle: '.feed-post-body-resumo'
        }
      }
    }

    const mainNewsSectionSettings = {
      name: 'G1 Feed' ,

      selectors: {
        rootPostsWatcher: '.bstn-hls',
        post: {
          wrapper : '.bstn-hl-wrapper',
          itself  : '.bstn-hl',
          title   : '.bstn-hl-link bstn-hl-title',
          subtitle: '.bstn-hl-chapeu'
        }
      }
    }

    const topNewsSectionSettings = {
      name: 'G1 Feed',

      selectors: {
        rootPostsWatcher: '.post-bastian-products__content.post-mais-lidas__content',
        post: {
          wrapper : '.post-mais-lidas__section',
          itself  : '.post-mais-lidas__item',
          title   : '.post-mais-lidas__title',
          subtitle: undefined
        }
      }
    }



    this.feed     = new DOMBadBlocker(feedSettings)
    this.mainNews = new DOMBadBlocker(mainNewsSectionSettings)
    this.topNews  = new DOMBadBlocker(topNewsSectionSettings)

  }

}
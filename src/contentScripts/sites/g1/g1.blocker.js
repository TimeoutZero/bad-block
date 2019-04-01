import DOMBadBlocker from "../../../shared/DOMBadBlocker/DOMBadBlocker";
import g1Style from './g1.style.scss'

export default class G1SiteBlocker {
  constructor(sentiment) {

    const postsPagesContainerSelector = '.bstn-fd.bstn-cls-deprecated_.bastian.bstn-feed._bstn-cls-deprecated.editorial.bstn-fd-csr.bstn-cls-deprecated_.bstn-feed-csr._bstn-cls-deprecated'
    const feedSettings = {
      name: 'g1-feed' ,

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
      name: 'g1-main-news' ,

      selectors: {
        rootPostsWatcher: '.bstn-hls',
        post: {
          wrapper : '.bstn-hl-wrapper',
          itself  : '.bstn-hl',
          title   : '.bstn-hl-title',
          subtitle: '.bstn-hl-chapeu'
        }
      }
    }

    const topNewsSectionSettings = {
      name: 'g1-top-news',

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

    const sideGroupsSettings = {
      name: 'g1-side-groups',

      selectors: {
        rootPostsWatcher: '.post-agrupador-materia.theme',
        post: {
          wrapper : 'itself',
          itself  : '.post-agrupador-materia.theme ul li',
          title   : 'div div',
          subtitle: 'div a'
        }
      }
    }



    this.feed       = new DOMBadBlocker(feedSettings)
    this.mainNews   = new DOMBadBlocker(mainNewsSectionSettings)
    this.topNews    = new DOMBadBlocker(topNewsSectionSettings)
    this.sideGroups = new DOMBadBlocker(sideGroupsSettings)

  }

}
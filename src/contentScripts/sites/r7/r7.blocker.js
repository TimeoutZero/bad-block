import DOMBadBlocker from "../../../shared/DOMBadBlocker/DOMBadBlocker";
import g1Style from './r7.style.scss'
import $ from 'jquery'

export default class R7SiteBlocker {
  constructor(sentiment) {
    $('body').addClass('r7-bad-blocker-helper')

    const diverseTrendsSettings = {
      name: 'r7-diverse-trends' ,

      selectors: {
        rootPostsWatcher: '.three-single-trends',
        post: {
          wrapper : 'itself',
          itself  :'.single-trend',
          title   : '.single-trend-title',
          subtitle: undefined
        }
      }
    }

    const carouselNewsSettings = {
      name: 'r7-carousel-news' ,

      selectors: {
        rootPostsWatcher: '.box-carousel-e-dois-destaques-trends-slides',
        post: {
          wrapper : 'itself',
          itself  :'.box-carousel-e-dois-destaques-trends-slide',
          title   : '.box-carousel-e-dois-destaques-trends-title',
          subtitle: undefined
        }
      }
    }

    const twoHighlightedTrendsSettings = {
      name: 'r7-two-highlighted-trends',

      selectors: {
        rootPostsWatcher: '.vertical-trend',
        post: {
          wrapper : 'itself',
          itself  :'.vertical-trend',
          title   : '.vertical-trend-title',
          subtitle: '.vertical-trend-bullet-text'
        }
      }
    }

    const diverseCallTrendsSettings = {
      name: 'r7-call-diverse-trends' ,

      selectors: {
        rootPostsWatcher: '.four-single-trends',
        post: {
          wrapper : 'itself',
          itself  :'.single-trend-small',
          title   : '.single-trend-title',
          subtitle: undefined
        }
      }
    }

    const topNewsSettings = {
      name: 'r7-top-news' ,

      selectors: {
        rootPostsWatcher: '.mais-lidas-trends',
        post: {
          wrapper : 'itself',
          itself  :'.mais-lidas-trends-title',
          title   : 'itself',
          subtitle: undefined
        }
      }
    }

    const sidebarTopNewsSettings = {
      name: 'r7-sidebar-top-news' ,

      selectors: {
        rootPostsWatcher: '.box.mais_lidas_sidebar_trends .mais-lidas-trends',
        post: {
          wrapper : 'itself',
          itself  :'.mais-lidas-trends-title',
          title   : 'itself',
          subtitle: undefined
        }
      }
    }



    this.diverseTrends        = new DOMBadBlocker(diverseTrendsSettings)
    this.carouselNews         = new DOMBadBlocker(carouselNewsSettings)
    this.twoHighlightedTrends = new DOMBadBlocker(twoHighlightedTrendsSettings)
    this.diverseCallTrends    = new DOMBadBlocker(diverseCallTrendsSettings)
    this.topNews              = new DOMBadBlocker(topNewsSettings)
    this.sidebarTopNews       = new DOMBadBlocker(sidebarTopNewsSettings)

  }

}
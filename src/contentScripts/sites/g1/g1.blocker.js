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

    // const mainNewsSectionSettings = {
    //   name: 'G1 Feed' ,

    //   selectors: {
    //     rootPostsWatcher: postsPagesContainerSelector,
    //     post: {
    //       wrapper : '._x',
    //       itself  :'.feed-post',
    //       title   : '.feed-post-link',
    //       subtitle: '.feed-post-body-resumo'
    //     }
    //   }
    // }

    this.feed = new DOMBadBlocker(feedSettings)
    // this.mainNewsSection =

  }

}
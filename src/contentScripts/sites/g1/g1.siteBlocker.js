import G1FeedBlocker from './g1.feedBlocker'
import SiteBlocker from '../../siteBlocker'

export default class G1SiteBlocker extends SiteBlocker {
  constructor(sentiment) {
    super()
    this.feedBlockerClass = G1FeedBlocker
    this.checkPageURL()
  }
}
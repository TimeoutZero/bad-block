
export default class SiteBlocker {
  constructor(){
  }

  checkPageURL(){
    if(this.isOnFeed()){
      console.log('[BAD BLOCK] this a feed!!')
      this.feedBlocker = new this.feedBlockerClass()
    } else {
      console.log('[BAD BLOCK] this is not a feed')
    }
  }

  isOnFeed(){
    return true
  }

}
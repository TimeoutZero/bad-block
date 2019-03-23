import $ from 'jquery'
import BadBlockSentiment from './AFINN/sentiment'

export default class DOMBadBlocker {
  constructor(options = {}){
    this.name          = options.name || undefined
    this.selectors     = options.selectors || {}

    this.posts         = []
    this.negativePosts = []
    this.positivePosts = []
    this.neutralPosts  = []

    this.defineNewPostsWatcher(this.selectors.rootPostsWatcher)
    this.findPosts()
  }

  logBlockerName(complement = ''){
    const extensionNameCSS = `
      font-weight: bold;
      font-size: 100px;
      color: red;
      text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black
    `

    console.log(`✌️ %cBad Block`, extensionNameCSS)

  }

  defineNewPostsWatcher(containerSelector){
    const blocker = this
    const onFeedItemListCreated =  function(changes, observer){
      blocker.findPosts.call(blocker)
    }

    $(containerSelector).change(onFeedItemListCreated, { childList:true, subtree:true })
  }

  findPosts(){
    const posts = $(this.selectors.post.itself).get()
    this.negativePosts = []
    this.positivePosts = []
    this.neutralPosts  = []

    this.posts = posts.map((element) => {
      const $element      = $(element)
      const texts         = this.extractPostText($element)
      const $wrapper      = $element.closest(this.selectors.post.wrapper)
      const postSentiment = BadBlockSentiment.analyze(texts.mixed)
      const post          = {
        $element: $element,
        sentiment: postSentiment,
        texts
      }

      $element.data('badBlockPost', post)

      if(postSentiment.score < 0){
        this.negativePosts.push(post)
        // $wrapper.hide()
        $wrapper.css({
          'border': '2px solid red'
        })
      } else if(postSentiment.score > 0) {
        this.positivePosts.push(post)
      } else {
        this.neutralPosts.push(post)
      }

      // console.group('badBlockPostReport')
      // this.logBlockerName()

      // console.groupEnd('badBlockPostReport')

      return post
    })


  }

  extractPostText($element){
    const title    = this.selectors.post.title ? $element.find(this.selectors.post.title).text() : ''
    const subtitle = this.selectors.post.subtitle ? $element.find(this.selectors.post.subtitle).text() : ''
    return {
      title,
      subtitle,
      mixed : `${title} ${subtitle}`
    }
  }

}
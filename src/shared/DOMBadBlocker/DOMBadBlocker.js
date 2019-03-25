import $ from 'jquery'
import BadBlockSentiment from '../AFINN/sentiment'
import style from './DOMBadBlocker.style.scss'
import I18n from '../i18n/i18n'

let findsCounter = 0
let creationCounter = 0

export default class DOMBadBlocker {
  constructor(options = {}){
    this.name          = options.name || undefined
    this.selectors     = options.selectors || {post:{}}
    this.selectors.postSubstitute = {
      itself: '.bad-blocker-post-substitute',
      wrapper: '.bad-blocker-wrapper'
    }

    this.posts         = []
    this.negativePosts = []
    this.positivePosts = []
    this.neutralPosts  = []

    this.logBlockerName(this.name)
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

    console.log(`✌️ %cBad Block ${complement}`, extensionNameCSS)

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
        const substituteWrapperClass = this.selectors.postSubstitute.wrapper.replace('.', '')
        !$wrapper.hasClass(substituteWrapperClass) ? $wrapper.addClass(substituteWrapperClass) : void 0
        const internalSubstitute = $wrapper.find(this.selectors.postSubstitute.itself)
        console.log('findPosts', ++findsCounter)
        if(!internalSubstitute.length){
          const $substitute  = this.createPostSubstitute(postSentiment)
          $wrapper.append($substitute)
        }
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

  createPostSubstitute(postSentiment){
    console.log('creationCounter', ++creationCounter)
    let postSeverity       = Math.abs(postSentiment.score)
    if(postSeverity > 5){
      postSeverity = 5
    }

    const postSeverityWord   = `severity_${postSeverity}`
    const randomSentencIndex = _.random(1, 2)

    const substituteTemplate         = `
      <div class="<%= substituteClassName %>">
        <div class="bad-blocker-post-substitute-content">
          <span class="fas fa-hand-peace"></span>
          <span class="bad-blocker-message"><%= sentimentSentence %></span>
        </div>
      </div>
    `

    const substituteTemplateFunction = _.template(substituteTemplate)
    const substituteHTML             = substituteTemplateFunction({
      substituteClassName: this.selectors.postSubstitute.itself.replace('.', '') + ` ${this.name}`,
      sentimentSentence  : I18n.getMessage(['negativeReasons', postSeverityWord, randomSentencIndex])
    })

    const $substitute = $(substituteHTML)
    return $substitute
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
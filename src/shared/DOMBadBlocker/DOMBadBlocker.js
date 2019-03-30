import $ from 'jquery'
import BadBlockSentiment from '../AFINN/sentiment'
import style from './DOMBadBlocker.style.scss'
import I18n from '../i18n/i18n'
import StringHelper from '../StringHelper/StringHelper'



export default class DOMBadBlocker {
  constructor(options = {}){
    this.name          = options.name || undefined
    this.selectors     = options.selectors || {post:{}}
    this.selectors.postSubstitute = {
      itself: '.bad-blocker-post-substitute',
      wrapper: `.bad-blocker-wrapper .${this.name}`
    }

    this.posts         = []
    this.negativePosts = []
    this.positivePosts = []
    this.neutralPosts  = []

    this.findsCounter = 0
    this.creationCounter = 0

    this.logBlockerName(this.name)
    this.defineNewPostsWatcher(this.selectors.rootPostsWatcher)
    this.findPosts()
  }

  logBlockerName(complement = ''){
    const extensionNameCSS = `
      font-weight: bold;
      font-size: 20px;
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
    console.log(`[${this.name}] findsCounter`, ++this.findsCounter)
    const posts = $(this.selectors.post.itself).get()
    this.negativePosts = []
    this.positivePosts = []
    this.neutralPosts  = []

    this.posts = posts.map((element) => {
      const $element      = $(element)
      const texts         = this.extractPostText($element)
      const $wrapper      = this.selectors.post.wrapper === 'itself' ? $element : $element.closest(this.selectors.post.wrapper)
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
        const substituteWrapperClass = StringHelper.cleanHTMLClass(this.selectors.postSubstitute.wrapper)
        !$wrapper.hasClass(substituteWrapperClass) ? $wrapper.addClass(substituteWrapperClass) : void 0
        const internalSubstitute = $wrapper.find(this.selectors.postSubstitute.itself)
        if(!internalSubstitute.length){
          const $substitute  = this.createPostSubstitute(postSentiment)
          $wrapper.append($substitute)
        }
      } else if(postSentiment.score > 0) {
        this.positivePosts.push(post)
      } else {
        this.neutralPosts.push(post)
      }

      return post
    })


  }

  createPostSubstitute(postSentiment){
    console.log(`[${this.name}] creationCounter`, ++this.creationCounter)
    let postSeverity       = Math.abs(postSentiment.score)
    if(postSeverity > 5){
      postSeverity = 5
    }

    const postSeverityWord   = `severity_${postSeverity}`
    const randomSentencIndex = _.random(1, 2)

    const substituteTemplate         = `
      <div class="<%= substituteClassName %>">
        <div class="bad-blocker-post-substitute-content">
          <i class="fas fa-hand-peace"></i>
          <i class="fas fa-meh-blank"></i>
          <span class="bad-blocker-message"><%= sentimentSentence %></span>
        </div>
      </div>
    `

    const substituteTemplateFunction = _.template(substituteTemplate)
    const substituteHTML             = substituteTemplateFunction({
      substituteClassName: StringHelper.cleanHTMLClass(this.selectors.postSubstitute.itself),
      sentimentSentence  : I18n.getMessage(['negativeReasons', postSeverityWord, randomSentencIndex])
    })

    const $substitute = $(substituteHTML)
    return $substitute
  }

  extractPostText($element){
    let title    = ''
    let subtitle = ''

    if(this.selectors.post.title){
      title = this.selectors.post.title === 'itself' ? $element.text() : $element.find(this.selectors.post.title).text()
    }

    if(this.selectors.post.subtitle){
      subtitle = this.selectors.post.subtitle === 'itself' ? $element.text() : $element.find(this.selectors.post.subtitle).text()
    }

    return {
      title,
      subtitle,
      mixed : `${title} ${subtitle}`
    }
  }



}
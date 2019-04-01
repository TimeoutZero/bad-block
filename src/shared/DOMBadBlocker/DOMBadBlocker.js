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
      wrapper: `.bad-blocker-wrapper .${this.name}`,
      message: '.bad-blocker-message',

      severityIcon: '.post-severity-icon',
      switchIcon: '.post-switch-icon',
      wordsIcon: '.post-words-icon'
    }

    this.posts         = []
    this.negativePosts = []
    this.positivePosts = []
    this.neutralPosts  = []

    this.findsCounter    = 0
    this.creationCounter = 0
    this.cleanSelectors  = {postSubstitute: {}}

    this.logBlockerName(this.name)
    this.updateCleanSelectorsInMemory()
    this.defineNewPostsWatcher(this.selectors.rootPostsWatcher)
    this.findPosts()
  }

  logBlockerName(complement = ''){
    const extensionNameCSS = `
      font-weight: bold;
      font-size: 20px;
      color: red;
      text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;
    `
    const blockerNameCSS = `
      font-weight: bold;
      font-style: italic;
      font-size: 18px;
      color: white;
      text-shadow: 1px 1px 0px black, 1px -1px 0px black, -1px 1px 0px black, -1px -1px 0px black;
    `

    console.log(`✌️ %cNewsster` + `%c ${complement}`, extensionNameCSS, blockerNameCSS)
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

    this.updateCleanSelectorsInMemory()

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

      $wrapper.data('badBlockPost', post)

      if(postSentiment.score < 0){
        this.negativePosts.push(post)
        // $wrapper.hide()
        const substituteWrapperClass = StringHelper.cleanHTMLClass(this.selectors.postSubstitute.wrapper)
        !$wrapper.hasClass(substituteWrapperClass) ? $wrapper.addClass(substituteWrapperClass) : void 0
        const internalSubstitute = $wrapper.find(this.selectors.postSubstitute.itself)
        if(!internalSubstitute.length){
          const $substitute  = this.createPostSubstitute(postSentiment)
          this.initPostSubstituteEvents($substitute)
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
    const blocker             = this
    const postSeverityWord    = `severity_${postSentiment.severity}`

    const sevetyMessagesLength = parseInt( I18n.getMessage(['negativeReasons', postSeverityWord, 'messagesLength']), 10)
    const randomSentencIndex   = _.random(1, sevetyMessagesLength)

    const substituteTemplate = `
      <div class="<%= substituteSelectors.itself %>">
        <div class="bad-blocker-post-substitute-content">
          <span class="<%= substituteSelectors.severityIcon %>"
            title="<%= sentimentSentences.description %>"
          >
            [<%= postSentiment.severity %>]
          </span>
          <span class="<%= substituteSelectors.message %>"
            title="<%= sentimentSentences.message %>"
          >
            <%= sentimentSentences.message %>
          </span>
          <div class="bad-blocker-resume-wrapper">
            <i class="far fa-meh-blank <%= substituteSelectors.wordsIcon %>"
              title="<%= sentimentSentences.negativeWords %>"
              ></i>
            <i class="far fa-eye <%= substituteSelectors.switchIcon %>"></i>
          </div>
        </div>
      </div>
    `

    const substituteTemplateFunction = _.template(substituteTemplate)
    const substituteHTML             = substituteTemplateFunction({
      postSentiment      : postSentiment,
      substituteSelectors: blocker.cleanSelectors.postSubstitute,
      sentimentSentences  : {
        description:I18n.getMessage(['negativeReasons', postSeverityWord, 'description']),
        message: I18n.getMessage(['negativeReasons', postSeverityWord, randomSentencIndex]),
        negativeWords: StringHelper.toSentence(postSentiment.negative)
      }
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

  updateCleanSelectorsInMemory(){
    const postSubstituteSelectors = _.clone(this.selectors.postSubstitute)
    _.forOwn(postSubstituteSelectors, (selector, key) => {
      this.cleanSelectors.postSubstitute[key] = StringHelper.cleanHTMLClass(selector)
    })
  }


  initPostSubstituteEvents($substitute){

    $substitute.find(this.selectors.postSubstitute.switchIcon).on('click', (event) => {
      event.stopPropagation()
      event.preventDefault()
      this.setPostSubstituteActive($substitute, false)
    })
  }

  setPostSubstituteActive($substitute, active){
    if(active){
      $substitute.show()
    } else {
      $substitute.hide()
    }
  }

}
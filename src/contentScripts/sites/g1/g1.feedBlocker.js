const $ = require('jquery')
import BadBlockSentiment from '../../../shared/AFINN/sentiment'

export default class G1FeedBlocker {
  constructor(sentiment) {
    this.posts = undefined

    this.selectors = {
      post  : {
        itself  :'.feed-post',
        title   : '.feed-post-link',
        subtitle: '.feed-post-body-resumo'
      }
    }

    this.findPosts()
  }

  findPosts(){
    const posts = $(this.selectors.post.itself).get()

    this.posts = posts.map((post) => {
      const $post = $(post)
      const texts = this.extractPostText($post)

      return {
        $element: $post,
        sentiment: BadBlockSentiment.analyze(texts.mixed),
        texts
      }
    })
  }

  checkSentimentInPost($post){
    const text = this.extractPostText($post)
    return BadBlockSentiment.analyze(text)
  }

  extractPostText($post){
    const title    = $post.find(this.selectors.post.title).text() || ''
    const subtitle = $post.find(this.selectors.post.subtitle).text() || ''
    return {
      title,
      subtitle,
      mixed : `${title} ${subtitle}`
    }
  }

  hideNegativePosts(){}
}
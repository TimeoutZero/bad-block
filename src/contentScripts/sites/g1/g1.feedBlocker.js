const $ = require('jquery')
import BadBlockSentiment from '../../../shared/AFINN/sentiment'

export default class G1FeedBlocker {
  constructor(sentiment) {
    this.posts = undefined

    this.findPosts()
    this.checkSentimentInPosts()
  }

  findPosts(){
    const postSelector = '.feed-post'
    this.posts = $(postSelector)
  }

  checkSentimentInPosts(){
    this.posts.map((post) => {
      return post
    })
  }

  hideNegativePosts(){}
}
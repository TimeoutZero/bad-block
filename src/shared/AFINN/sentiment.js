import Sentiment from 'sentiment'
import ptLabels from './languages/pt'



class BadBlockSentiment {
  constructor(language){
    this.language  = language || this.getNavigatorLanguage()
    this.sentiment = new Sentiment()

    this.sentiment.registerLanguage('pt', {
      labels: ptLabels
    })
  }

  analyze(text, options = {}){
    options.language = options.language || this.language

    return this.sentiment.analyze(text, options)
  }

  getNavigatorLanguage(){
    return window.navigator.language.slice(0, 2)
  }
}


export default new BadBlockSentiment()

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

  analyze(text, language){
    language = language ||
    this.sentiment.analyze(text, {
      language: language
    })
  }

  getNavigatorLanguage(){
    return window.navigator.language.slice(0, 2)
  }
}


export default new BadBlockSentiment()

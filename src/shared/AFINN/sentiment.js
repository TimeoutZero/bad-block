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
    const textSentiment = this.sentiment.analyze(text, options)
    let severity = Math.abs(textSentiment.score)
    const SEVERITY_ONE_COMPARATIVE_THRESHOLD = 0.1

    if(severity > 5){
      severity = 5
    } else if (severity === 1){
      if(Math.abs(textSentiment.comparative) < SEVERITY_ONE_COMPARATIVE_THRESHOLD){
        severity = 0
      }
    }

    textSentiment.severity = severity
    return textSentiment
  }

  getNavigatorLanguage(){
    return window.navigator.language.slice(0, 2)
  }
}


export default new BadBlockSentiment()

import i18n from "../i18n/i18n";
const _ = require('lodash')

class StringHelper {
  constructor(){}

  cleanHTMLClass(stringSelector){
    return stringSelector.replace(/\./g, ' ').trim()
  }

  toSentence(words){
    words = _.clone(words)
    let sentence = ''
    if(words.length > 1) {
      const tail = [ i18n.getMessage(['general', 'and']).toLowerCase(), words.pop()]
      sentence = words.join(', ') + ' ' + tail.join(' ')
    } else {
      sentence = words.pop()
    }

    return sentence
  }
}

export default new StringHelper()
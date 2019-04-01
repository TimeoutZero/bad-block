import {ptBr, enUs} from './messages'
import MessageFormat from 'messageformat'
const MessageFormatMessages = require('messageformat/messages')
const _ = require('lodash')

const messages = {
  'pt-br': ptBr,
  'en-us': enUs
}

const allowedLanguages = ['pt-br', 'en-us']
const messageFormat    = new MessageFormat(allowedLanguages)
const navigatorLocale  = window.navigator.language.toLocaleLowerCase()
const compiledMessages = messageFormat.compile(messages)
let currentMessages    = undefined
let locale             = undefined

class I18n {
  get locale(){ return locale }

  discoverMessagesByLocale(){
    if(!messages[navigatorLocale]){
      locale          = 'en-us'
    } else {
      locale = navigatorLocale
    }

    currentMessages = new MessageFormatMessages(compiledMessages, locale)
    return this.getMessages()
  }

  getMessages(){
    return currentMessages
  }

  getMessage(messageKey, params = {}){
    let msg         = undefined
    const messageFn = currentMessages.get(messageKey, params)

    if(_.isFunction(messageFn)){
      msg = messageFn(params)
    } else {
      msg = messageFn
    }

    return msg
  }
}

export default new I18n()
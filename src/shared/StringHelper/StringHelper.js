class StringHelper {
  constructor(){}

  cleanHTMLClass(stringSelector){
    return stringSelector.replace(/\./g, '')
  }
}

export default new StringHelper()
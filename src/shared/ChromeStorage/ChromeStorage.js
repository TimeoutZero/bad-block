const $ = require("jquery")

export default class ChromeStorage {

  static get(key){
    let defer = $.Deferred()
    try{
      if(window.chrome.storage){
        window.chrome.storage.sync.get(key, function(response){
          defer.resolve(response)
        })
      } else {
        defer.resolve( JSON.parse(window.localStorage.getItem(key)) )
      }
    } catch(err){
      defer.reject(err)
    }

    return defer.promise()
  }

  static set(data, key){
    let defer = $.Deferred()
    try{
      if(window.chrome.storage){
        window.chrome.storage.sync.get(data, function(response){
          defer.resolve(response)
        })
      } else {
        defer.resolve(  JSON.stringify(window.localStorage.setItem(key, data)) )
      }
    } catch(err){
      defer.reject(err)
    }

    return defer.promise()
  }

  static remove(key){
    let defer = $.Deferred()
    try{
      if(window.chrome.storage){
        window.chrome.storage.sync.get(key, function(response){
          defer.resolve(response)
        })
      } else {
        defer.resolve( window.localStorage.removeItem(key) )
      }
    } catch(err){
      defer.reject(err)
    }

    return defer.promise()
  }
}
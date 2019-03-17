console.log('[BAD BLOCK] Modulizer active')

const MAIN_CONTENT_SCRIPT_NAME = 'main.content.js'

const script = document.createElement('script')
script.setAttribute("type", "module")

// @ts-ignore
script.setAttribute("src", chrome.extension.getURL(MAIN_CONTENT_SCRIPT_NAME))

const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement
head.insertBefore(script, head.lastChild)
import '../src/shared/plugins/jqueryChange'
import MainContentAnalyzer from '../src/contentScripts/main.content'
import BadBlockSentiment from '../src/shared/AFINN/sentiment'
import I18n from '../src/shared/i18n/i18n'
// import fontawesome from '../src/shared/fontawesome/fontawesome.scss'

// ===
// Run
// ===
I18n.discoverMessagesByLocale()
new MainContentAnalyzer()
import '../src/shared/plugins/webpackPublicPath'
import '../src/shared/plugins/jqueryChange'

import '../src/contentScripts/main.content.scss'
import MainContentAnalyzer from '../src/contentScripts/main.content'

import BadBlockSentiment from '../src/shared/AFINN/sentiment'
import I18n from '../src/shared/i18n/i18n'

// ===
// Run
// ===
I18n.discoverMessagesByLocale()
new MainContentAnalyzer()
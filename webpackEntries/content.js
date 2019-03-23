import MainContentAnalyzer from '../src/contentScripts/main.content'
import BadBlockSentiment from '../src/shared/AFINN/sentiment'
import jquery from 'jquery'

(function($) {
  $.fn.change = function(cb, e) {
    e = e || { subtree:true, childList:true, characterData:true };
    $(this).each(function() {
      function callback(changes) { cb.call(node, changes, this); }
      var node = this;
      (new MutationObserver(callback)).observe(node, e);
    });
  };
})(jquery)

window.jQuery = jquery

new MainContentAnalyzer()
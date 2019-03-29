import G1SiteBlocker from "../../contentScripts/sites/g1/g1.blocker";
import R7SiteBlocker from "../../contentScripts/sites/r7/r7.blocker";


const SITES = {
  G1: {
    name: 'G1',
    siteRoot: 'g1.globo.com',
    siteBlocker: G1SiteBlocker
  },
  R7: {
    name: 'R7',
    siteRoot: ['www.r7.com', 'diversao.r7.com'],
    siteBlocker: R7SiteBlocker
  }
}

export default SITES
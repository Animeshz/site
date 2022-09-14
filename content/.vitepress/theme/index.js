import './footer-in-bottom.css'

import DefaultTheme from 'vitepress/theme'
import SiteLayout from './SiteLayout.vue'
import Quote from './components/Quote.vue'
import PageActions from './components/PageActions.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronUp, faMoon, faShareAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faLinkedin, faPinterest, faGetPocket, faReddit, faTumblr, faDiscord, faHackerNews } from '@fortawesome/free-brands-svg-icons'

library.add(faChevronUp, faMoon, faShareAlt);
library.add(faFacebook, faTwitter, faLinkedin, faPinterest, faEnvelope, faGetPocket, faReddit, faTumblr, faDiscord, faHackerNews);

/**
 * @type {import('vitepress').Theme}
 */
const config = {
    ...DefaultTheme,
    Layout: SiteLayout,
    enhanceApp({ app }) {
        app.component('Quote', Quote);
        app.component('PageActions', PageActions);
        app.component('FontAwesomeIcon', FontAwesomeIcon);
    }
};

export default config;

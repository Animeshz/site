import DefaultTheme from 'vitepress/theme'
import SiteLayout from './SiteLayout.vue'
import Blockquote from './components/Blockquote.vue'

/**
 * @type {import('vitepress').Theme}
 */
const config = {
    ...DefaultTheme,
    Layout: SiteLayout,
    enhanceApp({ app }) {
        app.component('Blockquote', Blockquote)
    }
};

export default config;
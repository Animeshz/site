import DefaultTheme from 'vitepress/theme'
import SiteLayout from './SiteLayout.vue'

/**
 * @type {import('vitepress').Theme}
 */
const config = {
    ...DefaultTheme,
    Layout: SiteLayout,
};

export default config;
import DefaultTheme from 'vitepress/theme';
import SiteLayout from './SiteLayout.vue';

import BlogList from './components/BlogList.vue';
import BlogMetadata from './components/BlogMetadata.vue';
import BlogNav from './components/BlogNav.vue';
import Comments from './components/Comments.vue';
import Quote from './components/Quote.vue';
import WordCloud from './components/WordCloud.vue';

// Need to be at the end to overwrite all the CSS
import './custom.css';

/**
 * @type {import('vitepress').Theme}
 */
const config = {
    ...DefaultTheme,
    Layout: SiteLayout,
    enhanceApp({ app }) {
        app.component('BlogList', BlogList);
        app.component('BlogMetadata', BlogMetadata);
        app.component('BlogNav', BlogNav);
        if (process.env.NODE_ENV === 'production') {
	    // Prevent accidental comment-issue creation on localhost
            app.component('Comments', Comments);
	}
        app.component('Quote', Quote);
        app.component('WordCloud', WordCloud);
    }
};

export default config;

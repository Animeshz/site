const fs = require('fs');
const rss_gen = require('./scripts/gen_rss_feed').default;
require('./scripts/gen_blog_list').default('content/blogs', 'src/theme/cache');

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: 'Animesh Sahu',
  description: 'My website for collection of useful stuffs I come across and documenting myself',

  lang: 'en-US',
  base: '/site/',
  outDir: '../dist',
  head: [
    ['link', { rel: "alternate", type: "application/rss+xml", href: "/site/rss.xml", title: "Animesh Sahu | Sitewide RSS Feed" }],
    ['link', { rel: "alternate", type: "application/atom+xml", href: "/site/atom.xml", title: "Animesh Sahu | Sitewide Atom Feed" }],
    ['script', { async: '', src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3494660420162247", crossorigin: "anonymous" }],
    ['script', {}, "(adsbygoogle = window.adsbygoogle || []).push({});"],
  ],

  // Temporarily disabled due to: https://github.com/vuejs/vitepress/issues/1345
  // cleanUrls: 'with-subfolders',

  appearance: true,
  ignoreDeadLinks: true,

  buildEnd: (cfg) => {
    return fs.promises.rm(cfg.srcDir + '/node_modules', { recursive: true })
      .then(() => rss_gen(cfg, "https://animeshz.github.io/site", cfg.outDir))
  },

  markdown: {
    theme: 'material-palenight',
    lineNumbers: true,
  },

  themeConfig: {
    siteTitle: 'Animesh Sahu / Home',
    outlineTitle: 'Table of Contents',
    outline: [2, 3],
    socialLinks: [
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rss" viewBox="0 0 16 16"><path d="M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3-8.5a1 1 0 0 1 1-1c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1z"/></svg>' }, link: '/site/atom.xml' },
      { icon: 'github', link: 'https://github.com/Animeshz/site' },
      // Better on footer
      // { icon: 'twitter', link: '...' },
      // { icon: 'linkedin', link: '...' },
      // { icon: 'reddit', link: '...' },
      // { icon: 'patreon', link: '...' },
    ],
    editLink: { pattern: 'https://github.com/Animeshz/site/edit/main/content/:path' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogs', link: '/blogs/' },
      { text: 'Awesome', link: '/awesome/' },
      { text: 'Notes', link: '/notes/' },
      // { text: 'Point of Interest', link: '/point-of-interest/' },
      // { text: 'Setup', link: '/setup/' },
      { text: 'Contact', link: '/contact/' },
    ],
    sidebar: {
      '/awesome/': [
        {
          text: 'Truly Awesome',
          items: [
            { text: 'Awesome Blogs', link: '/awesome/truly/blogs' },
            { text: 'Awesome Pages', link: '/awesome/truly/pages' },
            { text: 'Awesome Learning Resources', link: '/awesome/truly/learning-resources' },
            { text: 'Awesome Life Lessions', link: '/awesome/truly/life-lessions' },
          ],
        },
        {
          text: 'Awesome Stuffs',
          items: [
            { text: 'Awesome Web', link: '/awesome/stuffs/web' },
            { text: 'Awesome Linux', link: 'awesome/stuffs/linux' },
            { text: 'Awesome Extensions', link: 'awesome/stuffs/extensions' }
          ],
        },
      ],
      '/notes/': [
        {
          text: 'Linux',
          items: [
            { text: 'Linux Setup', link: '/notes/linux/linux-setup' },
            { text: 'Random Stuffs', link: '/notes/linux/linux-random-stuffs' },
            { text: 'Troubleshooting', link: '/notes/linux/linux-troubleshooting' },
            // { text: 'Nix', link: '/notes/Linux/nix' },
          ]
        },
        {
          text: 'Notes',
          items: [
            { text: 'CLI Tools', link: '/notes/notes/cli-tools' },
            // { text: 'Troubleshooting Notes', link: '/notes/notes/troubleshooting' },
          ]
        },
      ],

      // Must be at bottom, so other branches are not matched
      // '/': mcol(sidebar_root()),
    }
  }
};

export default config;

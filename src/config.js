const fs = require('fs');
require('./scripts/gen_blog_list').default('content/blogs', 'src/theme/cache');

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: 'Animesh Sahu',
  description: 'My website for documenting myself',

  lang: 'en-US',
  base: '/site/',
  outDir: '../dist',

  // Temporarily disabled due to: https://github.com/vuejs/vitepress/issues/1345
  // cleanUrls: 'with-subfolders',

  appearance: true,
  ignoreDeadLinks: true,

  buildEnd: (cfg) => {
    return fs.promises.rmdir(cfg.srcDir + '/node_modules');
  },

  markdown: {
    theme: 'material-palenight',
    lineNumbers: true,
  },

  themeConfig: {
    outlineTitle: 'Table of Contents',
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Animeshz/site' },
      // Better on footer
      // { icon: 'twitter', link: '...' },
      // { icon: 'linkedin', link: '...' },
      // { icon: 'reddit', link: '...' },
      // { icon: 'patreon', link: '...' },
      // { icon: 'rss', link: '...' },
    ],
    editLink: { pattern: 'https://github.com/Animeshz/site/edit/main/content/:path' },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blogs', link: '/blogs/' },
      { text: 'Awesome', link: '/awesome/' },
      { text: 'Notes', link: '/notes/' },
      { text: 'Point of Interest', link: '/point-of-interest/' },
      { text: 'Setup', link: '/setup/' },
      { text: 'Contact', link: '/contact/' },
    ],
    sidebar: {
      '/blogs/': mcol(sidebar_blogs()),
      '/awesome/': mcol(sidebar_awesome()),
      '/notes/': mcol(sidebar_notes()),

      // Must be at bottom, so other branches are not matched
      // '/': mcol(sidebar_root()),
    }
  }
};

export default config;

function mcol(target) {
  if (target.length > 1) {
    target.forEach(v => v.collapsible = true);
  }
  return target;
}

function sidebar_root() {
  return [
  ];
}

function sidebar_blogs() {
  return [
    {
      text: 'Blogs',
      items: JSON.parse(fs.readFileSync('src/theme/cache/blogs.json')).map(obj => {
        return { text: obj.title, link: obj.regular_path };
      })
    },
  ];
}

function sidebar_awesome() {
  return [
    {
      text: 'Truely Awesome',
      items: [
        { text: 'Awesome Blogs', link: '/awesome/blogs' },
        { text: 'Awesome Learning Resources', link: '/awesome/learning-resources' },
        { text: 'Awesome Life Lessions', link: '/awesome/life-lessions' },
      ],
    },
    {
      text: 'Awesome Stuffs',
      items: [
        { text: 'Awesome Web', link: '/awesome/web' },
        { text: 'Awesome Linux', link: 'awesome/linux' }
      ],
    },
  ];
}

function sidebar_notes() {
  return [
    {
      text: 'Notes',
      items: [
        { text: 'CLI Tools', link: '/notes/notes/cli-tools' },
        { text: 'Troubleshooting Notes', link: '/notes/notes/troubleshooting' },
      ]
    },
    {
      text: 'Linux',
      items: [
        { text: 'Linux Setup', link: '/notes/linux/linux-setup' },
        { text: 'Random Stuffs', link: '/notes/linux/linux-random-stuffs' },
        { text: 'Troubleshooting', link: '/notes/linux/linux-troubleshooting' },
        // { text: 'Nix', link: '/notes/Linux/nix' },
      ]
    },
  ];
}

function sidebar_point_of_interest() {
  return [
  ];
}

function sidebar_setup() {
  return [
  ];
}

function sidebar_contact() {
  return [
  ];
}

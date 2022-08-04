# My website
### (Blog | Awesome | Notes | Point of Interest | Setup | Contact)

Hello, Thanks for passing by!
This is source repository for my personal website .

You can find more about me or gain my knowledge in a concise manner here!


#### Development/Deployment

This website is powered by [Zola](https://getzola.org), a static-site generator (SSG)
written in rust.

I use [TailwindCSS](https://tailwindcss.com) for styling my webpages, it requires
a seperate build agent because zola doesn't support plugin / post-build-pipeline atm.

In order to start the live server or build the website (output goes to `.build`):

```bash
yarn

yarn run svgbob

## Live server
yarn run watch  # Terminal 1
zola serve      # Terminal 2

## Build
yarn run build
zola build
```

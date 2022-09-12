import{_ as n,c as a,b as e,t as l,a as r,o}from"./app.a9289f76.js";const m=JSON.parse('{"title":"Nix - Building a Robust Dev Environment","description":"","frontmatter":{"title":"Nix - Building a Robust Dev Environment","slug":"nix"},"headers":[{"level":2,"title":"Nix - An introduction","slug":"nix-an-introduction","link":"#nix-an-introduction","children":[]},{"level":2,"title":"Installing Nix","slug":"installing-nix","link":"#installing-nix","children":[{"level":3,"title":"Some useful fish abbreviations","slug":"some-useful-fish-abbreviations","link":"#some-useful-fish-abbreviations","children":[]}]},{"level":2,"title":"Opiniated Configuration","slug":"opiniated-configuration","link":"#opiniated-configuration","children":[]},{"level":2,"title":"Learning Nix","slug":"learning-nix","link":"#learning-nix","children":[]},{"level":2,"title":"Nix Flakes","slug":"nix-flakes","link":"#nix-flakes","children":[]},{"level":2,"title":"Extra (Personal Favourites)","slug":"extra-personal-favourites","link":"#extra-personal-favourites","children":[]}],"relativePath":"notes/Linux/nix.md"}'),i={name:"notes/Linux/nix.md"},p=r(`<h2 id="nix-an-introduction" tabindex="-1">Nix - An introduction <a class="header-anchor" href="#nix-an-introduction" aria-hidden="true">#</a></h2><p>Nix, a package manager and a configuration language (not just specific to NixOS), to make a reproducible self-contained builds, from flat text-files.</p><p>Its primary repository (called <a href="https://search.nixos.org/packages" target="_blank" rel="noreferrer">nixpkgs</a>) is quite like a AUR but without the restriction to use a particular distro in order to use it, it runs on <em>all the Linux distros available on the planet</em> as well as on the MacOS.</p><p>Plus unlike AUR, it uses a binary cache by which you can install pkgs directly (without hours of build). Its over 220TB large and distributed via CDN.</p><p>If something went wrong <em><strong>including any system level modifications</strong></em> from nix, can be easily rolled back using nix profiles (created automatically at every change).</p><p>This page contains my notes while installing nix on Void Linux.</p><h2 id="installing-nix" tabindex="-1">Installing Nix <a class="header-anchor" href="#installing-nix" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#A6ACCD;">sudo xbps-install nix             </span><span style="color:#676E95;"># 1</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo usermod -aG nixbld </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">whoami</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;"># logout &amp; login</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">sudo ln -s /etc/sv/nix-daemon /var/service</span></span>
<span class="line"><span style="color:#A6ACCD;">nix-channel --add http://nixos.org/channels/nixpkgs-unstable nixpkgs</span></span>
<span class="line"><span style="color:#A6ACCD;">nix-channel --update</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># Specific to fish shell</span></span>
<span class="line"><span style="color:#A6ACCD;">curl -sL https://git.io/fisher </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">source</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> fisher install jorgebucaran/fisher</span></span>
<span class="line"><span style="color:#A6ACCD;">fisher install lilyball/nix-env.fish</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo mkdir -p /nix/var/nix/profiles/default/etc/profile.d</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo cp /etc/profile.d/nix.sh /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh</span></span>
<span class="line"><span style="color:#676E95;"># re-open shell</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># To confirm</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">NIX_PATH</span></span>
<span class="line"><span style="color:#A6ACCD;">nix-env --version</span></span>
<span class="line"><span style="color:#A6ACCD;">nix-shell -p hello   </span><span style="color:#676E95;"># run &#39;hello&#39; in the new shell</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><sub>1. Installation with xbps just makes uninstall process easier (otherwise run the script in their website &amp; create a runit service with one line: <code>exec /nix/var/nix/profiles/default/bin/nix-daemon</code>)</sub></p><h3 id="some-useful-fish-abbreviations" tabindex="-1">Some useful fish abbreviations <a class="header-anchor" href="#some-useful-fish-abbreviations" aria-hidden="true">#</a></h3><div class="language-fish line-numbers-mode"><button class="copy"></button><span class="lang">fish</span><pre><code><span class="line"><span style="color:#676E95;"># abbr ne &#39;nix-env&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nc </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix-channel --add</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nu </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix-channel --update</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> ns </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix-shell</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> ng </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix-collect-garbage -d</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> no </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix store optimise</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nr </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix registry list</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> npi </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix profile install</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> npr </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix profile remove</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nph </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix profile history</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nproll </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix profile rollback --to</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nfs </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix shell</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nfr </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix run</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nfd </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix develop</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nfshow </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix flake show</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nfmeta </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix flake metadata</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#82AAFF;">abbr</span><span style="color:#A6ACCD;"> nfpinf </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nix path-info -rsSh</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="opiniated-configuration" tabindex="-1">Opiniated Configuration <a class="header-anchor" href="#opiniated-configuration" aria-hidden="true">#</a></h2><div class="language-bash line-numbers-mode"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">max-jobs = auto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> sudo tee --append /etc/nix/nix.conf   </span><span style="color:#676E95;"># Use multi-threads</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">experimental-features = nix-command flakes</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> sudo tee --append /etc/nix/nix.conf </span><span style="color:#676E95;"># Use flakes</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="learning-nix" tabindex="-1">Learning Nix <a class="header-anchor" href="#learning-nix" aria-hidden="true">#</a></h2><p><a href="https://nix-tutorial.gitlabpages.inria.fr/nix-tutorial/getting-started.html" target="_blank" rel="noreferrer">Nix - Getting started</a><br><a href="https://github.com/justinwoo/nix-shorts/blob/master/posts/your-first-derivation.md" target="_blank" rel="noreferrer">NixShorts - Your First Derivation</a><br><a href="https://learnxinyminutes.com/docs/nix" target="_blank" rel="noreferrer">LearnXinYminutes - Nix</a><a href="https://ryantm.github.io/nixpkgs/functions/library/strings" target="_blank" rel="noreferrer">Nix - The cool stdLib</a></p><p><a href="https://www.youtube.com/watch?v=qjq2wVEpSsA" target="_blank" rel="noreferrer">This video</a> talks in-depth how Nix and NixOS are so close to be perfect.</p><p><a href="https://unix.stackexchange.com/questions/369234/how-to-configure-a-nix-environment-outside-of-nixos" target="_blank" rel="noreferrer">Using file to manage packages - non-nixos users</a><a href="https://discourse.nixos.org/t/poetry2nix-flakes-add-runtime-dependencies/15930/3" target="_blank" rel="noreferrer">Declaring dependencies</a><br><a href="https://discourse.nixos.org/t/how-to-create-a-script-with-dependencies/7970/6" target="_blank" rel="noreferrer">Runtime dependencies in shell scripts</a> or <a href="https://gist.github.com/CMCDragonkai/9b65cbb1989913555c203f4fa9c23374" target="_blank" rel="noreferrer">makeWrapper on nixpkgs</a> or <a href="https://github.com/nix-community/home-manager/blob/master/home-manager/default.nix" target="_blank" rel="noreferrer">substituteInPlace in home-manager</a></p><p>Misc:</p><p><a href="https://nixos.wiki/wiki/NixOS_modules" target="_blank" rel="noreferrer">Nix Modules - Docs</a> | <a href="https://github.com/NixOS/nixpkgs/blob/master/lib/modules.nix#L373" target="_blank" rel="noreferrer">nix_modules src</a><br><a href="https://nixos.org/guides/nix-pills/our-first-derivation.html" target="_blank" rel="noreferrer">Nix Pills</a></p><h2 id="nix-flakes" tabindex="-1">Nix Flakes <a class="header-anchor" href="#nix-flakes" aria-hidden="true">#</a></h2><p>A new de-facto standard to write nix files, making everything clean and easier to understand. Quite like a rust crate, also forms a lockfile for automated reproducibility.</p><ul><li>Learn more:<br><a href="https://edolstra.github.io/talks/nixcon-oct-2019.pdf" target="_blank" rel="noreferrer">https://edolstra.github.io/talks/nixcon-oct-2019.pdf</a><br><a href="https://serokell.io/blog/practical-nix-flakes" target="_blank" rel="noreferrer">https://serokell.io/blog/practical-nix-flakes</a><br><a href="https://ianthehenry.com/posts/how-to-learn-nix/flakes" target="_blank" rel="noreferrer">https://ianthehenry.com/posts/how-to-learn-nix/flakes</a></li><li>Official Docs: <a href="https://nixos.wiki/wiki/Flakes" target="_blank" rel="noreferrer">https://nixos.wiki/wiki/Flakes</a></li></ul><p><a href="https://blog.ysndr.de/posts/guides/2021-12-01-nix-shells/#tldr-nix-develop" target="_blank" rel="noreferrer">The new <code>nix *</code> commands vs the traditional <code>nix-*</code> commands</a></p><p>&lt;!- Home Manager: <a href="https://www.youtube.com/watch?v=OgUvDXxHlLs" target="_blank" rel="noreferrer">https://www.youtube.com/watch?v=OgUvDXxHlLs</a> ---&gt;</p><h2 id="extra-personal-favourites" tabindex="-1">Extra (Personal Favourites) <a class="header-anchor" href="#extra-personal-favourites" aria-hidden="true">#</a></h2><ul><li><a href="https://discourse.nixos.org/t/what-does-mkdefault-do-exactly/9028/2" target="_blank" rel="noreferrer">lib.mkDefault</a></li><li><a href="https://www.reddit.com/r/NixOS/comments/j5pa9o/getting_all_configs_from_folder" target="_blank" rel="noreferrer">Include all nix modules under a path</a></li><li><a href="https://github.com/nuxshed/dotfiles/blob/main/flake.nix" target="_blank" rel="noreferrer">Sample config from a long time nix user</a></li><li><a href="https://nixos.wiki/wiki/Binary_Cache" target="_blank" rel="noreferrer">Setup Binary Cache</a> + <a href="https://nixos.org/manual/nix/stable/command-ref/conf-file.html" target="_blank" rel="noreferrer">Use it</a></li><li><a href="https://nixos.org/manual/nix/unstable/command-ref/new-cli/nix3-path-info.html" target="_blank" rel="noreferrer">nix path-info command</a></li></ul>`,26);function t(s,c,b,u,h,d){return o(),a("div",null,[e("h1",null,l(s.$frontmatter.title),1),p])}const x=n(i,[["render",t]]);export{m as __pageData,x as default};

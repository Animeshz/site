---
title: "June 2023"
created: 2023-06-23 10:17 PM
updated: 2023-06-23 10:17 PM
---

# June 2023

At the time of writing, its been halfway the june has passed. And a lot has happened this month as my classes have ended after the endsem, with a break of this full month.

## Reached home 4th of June

Had travelled Lucknow more than ever (with my Dad coming here before we leave for home). After that, we finally departed to Allahabad through Cab at 9AM for taking a direct flight to Raipur, which we finally reached at 6:30PM.

## Entertainment

Finished watching [The Flash Season 3](https://en.wikipedia.org/wiki/The_Flash_(season_3)), a SciFi series with alot of pressure handling going on with time-travel side-effects, working with detective and great visuals.

<sub>The Flash is a character based on DC Comics.</sub>

## Books

Read first 2 chapters of [Ikigai](https://en.wikipedia.org/wiki/Ikigai). Start applying anti-aging secrets of city of Okinawa (situated in Japan, a city of centernarians - every 24.55% of people over there live over age of 100 years).

Read [4 Hour Work Week](https://en.wikipedia.org/wiki/The_4-Hour_Workweek) halfway through (till chapter 7), start applying the principles which is what next 2 points below are.

## Reinstall Void on ZFS

I've moved my setup to use [21.01 ZFS filesystem](/notes/20-29--DevEnvironment/21--Linux/21.01-ZFS.html), it has got me a lot of benefits such as extra storage (reported 1.48x compression ratio w/ lz4 compression method), pooled storage i.e. multiple volume all share same storage space, atomic r/w, snapshots, and many more (you could even merge two disks later).

## Moved my linux dotfiles over to nix

I have tried many ways to manage my dotfiles & installation of packages in the past, starting with Makefile, yadm bootstrapping script, Justfile, normal shell scripts, ansible, puppet, chef. I had atleast a few complaints from each of them!

Recently tried nix, and it finally became my go-to option.

See [21.02 Nix](/notes/20-29--DevEnvironment/21--Linux/21.02-Nix.html) for more info.

## Fight with emacs and rise of emacs-chdir

My experience with emacs has always been good from inside but inferior from outside.

I get that elisp is very powerful and can handle almost everything you wish to do from inside, but sometimes you have to rely on system-wide things just because they create more consistency across use of different apps.

My [pwd-launch](https://github.com/Animeshz/scripts/blob/main/main/pwd-launch) script launches applications in directory the currently focused/active X window is at. This was breaking since emacs unlike most well-behaved softwares has _itch_ to diverge from unix-philosophy. It'll give you cli option to chdir emacs to certain directory at startup which is literally of no use, as you can just cd and exec emacs instead... But emacs will never report directory change as you change file, it never calls chdir, never give you option to even allow you doing that from any elisp function. Dude!!! Ok I shouldn't rant this much in this page.

I had to write a simple [emacs-package](https://github.com/Animeshz/emacs-chdir) to fix it by calling chdir whenever `(default-directory)` changes.

## Opened a PR on NixOS/nixpkgs to fix ruby packaging

I've used puppet (through RAL) along with nix, and its not packaged there, for the most obvious reason its not needed in NixOS. So I packaged it for personal use, but encountered an unexpected issue.

For over two years, there has been this issue [#128223](https://github.com/NixOS/nixpkgs/issues/128223) which was blocking everybody to package any ruby package coming from custom path or git on nix/nixos (and I needed custom puppet build with xbps - void-linux package manager - so needed git build of ruby gem).

I go ahead and fixed it by going deep into how it was implemented and how its delegated ruby-bundler handled the compilation process. It was fun to explore, everything regarding changes I listed in the PR description [#237917](https://github.com/NixOS/nixpkgs/issues/237917), be sure to check out you'll definitely learn something new!

## Redesign this site

Threw away the legacy.

Changed color-scheme, new way to handle indexes using [13.01 Emacs org-mode](http://localhost:5173/site/notes/10-19--Programming/11--Languages/13.01-Emacs.html), merge awesome into the notes section, added projects and this journal sections to the site. Changing the index & RSS generation of blogs into this org-mode is also queued for the future.

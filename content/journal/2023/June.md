---
title: "June 2023"
created: 2023-06-23 10:17 PM
updated: 2023-06-23 10:17 PM
---

# June 2023

At the time of writing, its ~~been halfway~~ (update: _almost the whole_) june has passed. And a lot has happened this month as my classes have ended after the endsem, with a break of this full month.

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

Changed color-scheme, new way to handle indexes using [13.01 Emacs org-mode](https://animeshz.github.io/site/notes/10-19--Programming/11--Languages/13.01-Emacs.html), merge awesome into the notes section, added projects and this journal sections to the site. Changing the index & RSS generation of blogs into this org-mode is also queued for the future.

## Migrate to logseq for note-taking.

Previously I used to use google calendar for hourly journaling & idea note on android for quickly writing down ideas & a private discord server to dump links to, just cause it works from both mobile and desktop.

I finally found a good app, [91.01 Note Taking Logseq](https://animeshz.github.io/site/notes/90-99--Miscellaneous/91--Curation/91.01-Note-Taking.html) that is cross-platform as well as effective for my note taking, for the reasons I wrote in the note.

## Entertainment (continue)

Skipped Flash Season 4 with summary, completed Flash Season 5, and see summary of subsequent seasons instead to save more time, may watch final S8 & S9 sometime in future.

## Capture and make everything searchable

One of core principles of 4 Hour Work Week is that, Evernote used to solve problem for him by making the images captured searcable, easily clip the bottle / business-card / handwritten-notes and just search whatever you remembered about it and boom.

However that comes only with Evernote premium, so I tried some HuggingFace models for OCR recognition and image captioning, found [Blip Image Captioning Base](https://huggingface.co/Salesforce/blip-image-captioning-base) works really great, although none of models I found were particularly great for OCR (text-recognition).

At the end of it, found that Google Keep actually already has inbuilt OCR that's really good for even handwritten notes. Making images searchable, and doesn't coagulate gallary either. Also allows for option to extract the text into note, so its transparent to also view the detected text rather than just making images searchable.

## Books (continue)

Started [Everything is f*cked - A book about hope](https://markmanson.net/books/everything-is-fucked) by Mark Manson. He is one my favourite author, and this book goes even deep into the rabbithole of more of those fundamental concepts along with validations that his previous book might have seem to missing.

And [12 months to $1M](https://summaries.com/blog/12-months-to-1-dollar-million) by Ryan Daniel. At the start, its been very dark, but I like to point one quote I liked the most.

> That's why people hate on billionaires, or company that don't pay enough taxes: They believe that "top 1 percent" get rich by taking from others.<br><br>
> The truth is that we create value. For every slice you take you have to bake a whole other pie.

Not particularly book, but start understanding [Stoicism](https://www.youtube.com/watch?v=34fp5QO9Yz8&pp=ygUIc3RvaWNpc20%3D) (from different sources) for overcoming emotional-stress.

## Resume

With intern-season I've almost forgot to update my resume, and had made it earlier using AltaCV template (with those design and all).

So I remade [my resume](https://www.linkedin.com/in/animeshz/overlay/1635530922297/single-media-viewer?type=DOCUMENT&profileId=ACoAADVBJAsBVJhjZH5jMP_OqJZDJYMT1Gdiwro&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BvmYB9zZXTKOnZjdkjHcbjw%3D%3D) in plain text format, over google docs.

## Stack Overflow 2023 Survey Results

Interesting to see [Phoenix](https://www.phoenixframework.org) is the most admired web framework and technology; more developers would choose to work with Phoenix again than those who have used the three most common: React, Node.js, and Next.js.

It seemed fun that a lot of people want to shift to Notepad++, even those using VS Code right now, really interesting.

## Other events towards the end of June

- Celebrated birthday of my cousin on 26th of June, Gifted him an extra-fluid gel pen for writing anywhere and one of my favourite full-read book: Rework.
- Written next blog post: [Using git for effective collaboration - Understanding branch, refs and rebase](https://animeshz.github.io/site/blogs/using-git-for-effective-collaboration.html)
- Start converting keyboard-mouse-kt project to use Nix instead of bulky Docker for the build [WIP].
- Start on new project _rebase-my-life_ [WIP] which closely resembles to interactive git rebase, to run bulk operations on various tools like gmail (e.g. bulk unsub/delete using vim), generally for those apps which has list-like / table-like data structures involved.

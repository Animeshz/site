---
title: "A Critical Analysis of Linux Landscape (2023)"
description: "Is the Linux Ecosystem Heading in the Right Direction?"
created: 2023-09-22 12:00 PM
#image: /blogs/git/cover.jpg
tags: ["linux"]
---

# A Critical Analysis of Linux Landscape (2023)

Quick Question: How to change scroll speed in linux? I'll leave it up to you to figure it out ([HN discussion](https://news.ycombinator.com/item?id=34131453)).

![GNU/Linux attributions](https://upload.wikimedia.org/wikipedia/commons/5/5e/2016-11-14_gnu-linux_wallpaper.png)

## Introduction

I came down this path searching for productivity, instead I found [some gasoline emissions](https://news.ycombinator.com/item?id=19024345).

You know linux is profound for its simplicity and understandibility for years in the timeline, but it looks like the period is finally getting over.

Have you became productive with touch typing? most likely yes.

Have you became more productive with linux? Well, this one's debatable, the desktop space is now finely grained in such a way that mimics windows / macos behavior that people have forgotten all the benefits of linux.

Or let's try again, how much of you know how to create a custom iso, even of a distro, with just one extra package in it. More often than not, not more than a few countable people may know that. And that their distro may even made that process more complex than creating 3d animations.

Doing basic things become so much of a mess that many of us forget main purpose of choosing linux, ask it again for yourself, why you went this way, were you suggested to use it by someone, if so why did he/she suggested you to go for it...

## The current state of the art

We're currently at the [30th year of Linux Desktop](https://blog.liw.fi/posts/2022/goalposts/), and we are still struggling to keep up. The problem is so frustrating that it deserves a whole article.

Back in the late '90s, linux was simple and configurable to exactly how one wanted it to be. It was really a collection of simple modular components that could be plugged together at will to do real work. Adhering to a deeply considered philosophy of the user being in the drivers seat, without layers and layers of frameworks wrapping their tendrils into all manor of stuff they should not be touching.

Its been over 8 years of me using linux, and things have somehow gone way too far.

We're so ingrained in the tooling that we're not even able to do such a basic task ourselves. Even setting up a printer to do its job or setting a projector takes away hours of struggle, and whatever works - works by a very thin layer of workaround that may break any second. What a clusterfuck.

## Why this is the case?

There are couple of reasons.

### Reason #1: Fragmentation (Division of developer efforts)

There are multiple system projects fighting, competing amongst themselves and reinventing the wheel to replace each other in one part of the desktop stack to prove they are the smartest out there rather than have a standard set of components to stick to that does its job well and integrates with other parts of the stack.

Also quoting from [Maintainers Matter](http://kmkeen.com/maintainers-matter/) ([HN](https://news.ycombinator.com/item?id=11911303)):

> Supposedly one of Linux's failings is that there is too much pointless choice, too many K and G versions of things and it divides developer efforts. Why have so many window managers and text editors? With the traditional FOSS model, there are a hundred different programs and each program is missing a different feature.

The problem isn't that there are too many choices, the real problem is that there are number of pointless choices, on an OS maintaining a 3% market share, and with many projects begging for more help. It needs to work smarter.

Just give me a fuckin' reason why qdbus should exist in first place!!!

<!--
A software or hardware manufacturer who considers supporting Linux looks at that and gives up. Or they pick just RHEL and Ubuntu, and half of the Linux community gives them hate for not supporting their favorite distro.

A new user who considers moving to Linux looks at the (somewhat) lack of hardware and software support (such as MS Office and Adobe), looks at choosing among 400 distros, looks at the choices involved in a fresh OS install (something few Windows or Mac users do), and gives up.

Even for existing Linux users, the fragmentation is a problem. It results in huge amounts of duplicate effort, slower bug-fixing, slower roll-out of new features.

I'm not sure if you know or not, KDE develops a dbus of itself, called "qtbus", solely for the reason it needs a message bus that dbus isn't providing. I'm so dead on this...

-->

### Reason #2: The trash filesystem hierarchy standard

I just don't know why we still need the 7 location binary paths: `/bin`, `/sbin/`, `/usr/bin`, `/usr/sbin`, `/usr/local/bin`, `/usr/local/sbin`, `$HOME/.local/bin`...

This [reddit comment](https://www.reddit.com/r/linux/comments/luaii3/do_we_need_an_alternative_to_the_filesystem/gp9qso2/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) summarises it all:

> The linux filesystem is not a mess because of poor naming choices. Its a mess because of insane amounts of legacy.

> the reason we have `/bin` and `/usr/bin` is not because they actually have some logical reason to be split like people coming up with reverse history about Unix System Resources will tell you. Its because one of the guys working on unix ran out of hard drive space to put their binaries so they got a new drive and needed a new folder for it.

> Things like hidden folders for config in your home directory were enabled by accident. Again, people working on unix wanted to hide . and .. from the ls output since its useless. And being gigabrain programmers, they just decided to check for . at the start of the name since that covers both. Then apps took advantage of this to create .hidden folders.

Gobo Linux, NixOS/GuixSD, Bedrock Linux, and [Distri](https://michael.stapelberg.ch/posts/2019-08-17-introducing-distri/) does try to get away from [LSB](https://refspecs.linuxfoundation.org/lsb.shtml)/[FHS](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard), and some also provide a symlink-layer for backward complatibility.

But it is still a big problem as they don't see much adoption. I personally prefer using the Distri's layout, while NixOS's layout is not bad either (main problem is in its UX, reduces the scope of scripting & navigatibility).

```bash
# Distri
>>> which ls
2023/09/22 06:21:13 mounting which-amd64-2.21-6
2023/09/22 06:21:13 mounting coreutils-amd64-8.32-4
/ro/coreutils-amd64-8.32-4/bin/ls

# Nix
>>> namei $(which brave) | grep -E '^\s+l'
 l .nix-profile -> /nix/var/nix/profiles/per-user/animesh/profile
   l profile -> profile-2-link
     l profile-2-link -> /nix/store/s97x363h24i7s473vz5nvm1d7b935dws-user-environment
 l bin -> /nix/store/ri1lszz7xgindqhyaaqib2d8lfv2qyx6-home-manager-path/bin
 l brave -> /nix/store/ap4k352yas2vkvimffy113aar4vcsdd5-brave-1.52.122/bin/brave
```

[Debian attempted going away from the Linux Standard Base](https://news.ycombinator.com/item?id=10356933), but I don't think it really happened.

### Reason #3: One Linux campaign and the "..."

I just couldn't agree more on [Open Letter to the Linux World](https://lkml.org/lkml/2014/8/12/459) in the Linux Kernel Mailing Archive.

PS: [Devuan](https://www.devuan.org/) started as [this letter was reposted & shared by some high profile names](https://news.ycombinator.com/item?id=10368859).

### Reason #4: Upstream ISV packaging (Flatpak, Snap)

If system has went down a wrong path, with all the directory structure and things almost about to burst.

It seems like the easiest solution is to develop a _Universal Packaging Standard_ which promises the same idea as 'One Linux', and that'll cripple down the situation even more. Unnecessary sandboxing, low transparency, high audio latency, all are just a few drawbacks of them.

Instead of thinking of the problem from the first principles, they're just hiding the fact that the problem exists.

### Reason #5: Lack of inspectibility & scriptability

Again, from the [Open letter to the Linux World](https://lkml.org/lkml/2014/8/12/459),

> Windows & MacOS are overly complex and unknowable. That kind of opacity was was the core of Windows and Mac, and that's exactly what I despise about them, and exactly why I chose to use Linux in the first goddamn place.

Over the years, mainstream linux has chosen the same path as Windows & MacOS has chosen, to keep adding abstraction and complexity, now a days most of people don't even know how their system works, it just works! and when it doesn't they bash their head against it and usually go for a guess creating XY problem, wasting even more time.

Checking battery through CLI is hard, you gotta get a mA mV or mW value, division in bash is hard. The core has became very inflexible to inspect the system.

Void linux does stand for [a lightweight yet powerful scriptability](https://animeshz.github.io/site/blogs/void-linux.html#why-is-void-so-cool), but I haven't seen any other linux distribution that tries to do something similar.

NixOS does a lot of things great, but it looks too much locked away, installing a package takes away much of brain power and browser access for finding the right options, package file listing or removal is just so far away from reach. Searching package for a file name is just not possible.

## The point

If we knew how to change scroll speed already we'd not be wasting time in this shit, rather waste time in actual problems such as automating water pump to autostart when tank gets empty...

I would like to ignore:

* BOFH Excuse #75: There isn't any problem
* BOFH Excuse #78: Yes, yes, its called a design limitation

If anything can be written in assembly, it _can_ be implemented. There's no excuse. Legacy shouldn't be a blocker.

Here is a list of [problems in the current linux (2023 edition)](https://itvision.altervista.org/why.linux.is.not.ready.for.the.desktop.current.html).

[Why all desktop distros are flawed?](https://news.ycombinator.com/item?id=29971526)

An aricle by Michael Stapelberg, [Package managers are too slow (2019)](https://michael.stapelberg.ch/posts/2019-08-17-linux-package-managers-are-slow/) is a good generalization of the current state of package delivery. It talks in detail what's happenning in the industry.

Systems should be clean (almost empty root `/`) and built on top of Opt-In model so that users can again be on the driver seat & the complexity of doing the very basic things should be stripped off (quite like NixOS configuration, but more generalized allowing easy swapping & testing of bootloader or init or addition or removal of something over initramfs).

## Potential Solutions

### (Not) A new vision of Linux Desktop

You know when this happens the first thought that comes into the mind is: fuck the world, I'll make my own distro that'll do everything better than current alternatives.

And its pretty reasonable that this actually comes into mind, because, well its the reality, foss software differentiates from another just on basis of one feature missing on either of them. You can just combine two of 'em to make your own dream one!

But it gives rise to 2 newer problems:

1. Split of developer efforts.
2. xkcd #927 (Standards).<br><br>
  ![XKCD#927](https://imgs.xkcd.com/comics/standards.png)

We need to work smarter to handle this... Try to combine the features into existing app, unless required to fork it out. Or atleast try to move with RFCs (Request for Comments), whole lot of Web & Cryptography have move forward with this approach.

### Adoption of some concepts of Distri

[Distri](https://michael.stapelberg.ch/posts/2019-08-17-introducing-distri/) is a linux distribution to research fast package management, it does a lot of things in certainly a better way.

One of key idea includes packages being _images_ instead of _archives_, so doesn't need unpacking. Plus a FUSE exchange directory renders them without actually mounting them, when they're being used for the first time they'll be mounted, otherwise nothing.

Packages are consolidated in a directory of their own in `/ro`, i.e. unlike NixOS they're completely navigatable, they're easy to share even on poweroff system just by copy pasting an image to `/roimg`, or by making the directory a simple HTTP server on that directory without any extra efforts.

It knows about xkcd #927, and hence has clearly stated that its for research purpose, and only intention is that its idea to be merged into the mainstream package management instead of becoming a competition itself.

### Your Comment Matters

[RFCs](https://en.wikipedia.org/wiki/Wikipedia:Requests_for_comment) are a great way to make changes to the existing infrastructure considering all the public agreement.

Anything you'd like to do / have done, your past and present experiences, that can help the community to move forward is the first step in improving the state of the art. Feel free to criticize the post, and support the points or add your own points. Each and every comment matters :)

Hope you have a wonderful day ahead!

## Additional Reference Material

Post Read Material: [WebArchive - The state of art is terrible](https://web.archive.org/web/20150612172624/http://zackarymorris.tumblr.com/post/10973087527/the-state-of-the-art-is-terrible).

Backlinks:

* [r/linux](https://www.reddit.com/r/linux/comments/16p3pb8/a_critical_analysis_of_linux_landscape_2023/)
* [Linkedin](https://www.linkedin.com/posts/animeshz_a-critical-analysis-of-linux-landscape-2023-activity-7110885601578549248-8CjG/)

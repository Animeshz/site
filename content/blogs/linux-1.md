---
title: "Linux (1/2) - A near surface exploration"
description: "A high-level overview of Linux and its potential"
created: 2022-09-25 12:00 AM
tags: ["linux"]
---

# {{ $frontmatter.title }}

<style>
.tags>* {
    margin-right: 0.4rem;
}
</style>

<p style="font-size: 20px;">
{{ $frontmatter.description }}
</p>
<p style="color: gray; font-size: 14px;">{{ $frontmatter.created }} -
  <span class="tags">
    <span v-for="tag in $frontmatter.tags">#{{tag}}</span>
  </span>
</p>

---

<Quote author="Linus Torvalds">Intelligence is the ability to avoid doing work, yet getting the work done.</Quote>

![Cover Image](/blogs/linux-1/cover.png){ style="display: block; margin: 0 auto" }

This article enlists facts and useful information with my experience in using linux for years.

## A brief history

**Linux** was started just as a hobby project by a guy named Linus Torvalds, it was first publically announced in August 25, 1991 with the following email in the Minix group.

<pre style="font-size: 14px; overflow-x: auto;">
<blockquote>
  From: torvalds@klaava.Helsinki.FI (Linus Benedict Torvalds)
  Newsgroups: comp.os.minix
  Subject: What would you like to see most in minix?
  Summary: small poll for my new operating system
  Message-ID:
  Date: Sun, 25 Aug 91 20:57:08 GMT
  Organization: University of Helsinki

  Hello everybody out there using minix -

  I'm doing a (free) operating system (just a hobby, won't be big and
  professional like gnu) for 386(486) AT clones.  This has been brewing
  since april, and is starting to get ready.  I'd like any feedback on
  things people like/dislike in minix, as my OS resembles it somewhat
  (same physical layout of the file-system (due to practical reasons)
  among other things).

  I've currently ported bash(1.08) and gcc(1.40), and things seem to work.
  This implies that I'll get something practical within a few months, and
  I'd like to know what features most people would want.  Any suggestions
  are welcome, but I won't promise I'll implement them :-)

                Linus (torvalds@kruuna.helsinki.fi)

  PS.  Yes - it's free of any minix code, and it has a multi-threaded fs.
  It is NOT protable (uses 386 task switching etc), and it probably never
  will support anything other than AT-harddisks, as that's all I have :-(.
</blockquote>
</pre>

Who knew it'd be powering 96.3% of the top 1M websites today, being the only operating-system targeting both the embedded devices such as car's music & video system and the world's most powerful supercomputers, assisting to complete over 65 SpaceX missions, with reliance of over 60% in auto-shipments industry, become the preferred platform for IoT & backbone of Android powering over 85% of the daily internet users, and helping in manifestation of over 90% of special effects used in hollywood movies (including StarWars, LordOfRings, and HarryPotter).

Linux (kernel) today is considered to be the *most important* software project in the history. It recieves and merges over 8.5 impactful changes on average every single hour in a day.


## What is Linux?

### TL;DR

Linux is a [monolithic kernel](https://www.javatpoint.com/monolithic-structure-of-operating-system), which gives you building blocks that are just sufficient enough for doing everything.

### TS;WantMore?

One of the greatest speciality about Linux is that it is a monolithic kernel, which means it's *self-sufficient* to run on variety of devices from smart watches & cars TO desktop TO workstations & supercomputers out-of-the-box.

Note the word 'kernel' used above, Linux is not an Operating System in itself, it knows how to do things but it doesn't care anyhow what it has to do. It provides a stable and standard API to interact with any particular type of physical object (we'll talk more on this later in the article). This creates enormous amount of possibilities to easily create various frontends for interacting with it (or indirectly the hardware).

It basically goes like: *I'M HERE GUYS, YOU DON'T NEED TO WORRY ABOUT WHICH PARTICULAR DEVICE YOU'RE TARGETING BE IT AMD, INTEL, NVIDIA, LOGITECH, OR WESTERN DIGITAL JUST TELL ME WHAT YOU WANT TO DO, I'LL FIGURE OUT HOW TO DO THAT.*

And yes, that means it doesn't even contain a display server in itself, as per say it doesn't know what to draw (yet definitely know how to draw), making it possible for developers & users to instruct what it has to draw (with display server of your choice) and where it has to draw (with window manager of your choice).

For instance lookup [r/unixporn](https://www.reddit.com/r/unixporn), a subreddit where users actively post their screenshots of desktop look, that they customize themselves.

::: tip
A precious resource I could never forget about while talking about kernel: [Linux Kernel Labs](https://linux-kernel-labs.github.io/refs/heads/master/lectures/intro.html).
:::

## More stuffs, TODO.

<!--

## The Shell

The primary way of interaction, inherited from [Unix](https://en.wikipedia.org/wiki/Unix) is a command-line interface.

**A shell** (e.g. dash, bash, zsh, fish) is thus referred to a command-line waiting for you to give a signal so that it instructs the linux what it has to do next. Btw, all your autocompletion and color-highlighting comes from your shell only.

There is three more terms you may have heard of that are terminal, prompt & the console. These three are sometimes used interchangeably, but they completely differ in their purpose.

**Terminal** (e.g. kitty, alacritty, konsole, gnome-terminal, xfce4-terminal) is just a graphical window which controls how to display the things, managing the visual part of shell (or any other program really) like font, size of text, padding, line-height, etc. It really has nothing to do with linux, its here just to provide a better UI/UX to the user while interacting with the Linux and not get feeling like controlling a 8-bit computer in 1980s from [tty](https://itsfoss.com/what-is-tty-in-linux).

**Prompt** is referred to `$ ` or equivalent usually seen in a terminal right before place where we write a command. Can be customized to provide useful status like battery levels, git branches, etc. e.g. [starship](https://starship.rs) & [p10k](https://github.com/romkatv/powerlevel10k) are two of most popular options available today which replaces your old-day prompt with something giving more useful informations.

**Console** is used to collectively refer to all three: shell, prompt and terminal.

## More in the core of Linux

### The filesystem

This is the ***most exciting thing*** I usually like to talk about in Linux, that is, everything in the universe is seen as a file to the Linux. Be it your physcial disk, your logical partitions, your usb peripheral including your mouse and keyboard, wifi-card or processor, ramdisk or folders, whatever you can ever imagine is a file.

Its not always true that files that are seen are populated by or saved in the disk. Files under `/proc`, `/sys`, `/dev`, `/run` and `/tmp` don't actually exist in the disk. They contain virtual files, for instance latter two saves files in RAM.

AND that simply means, you don't need to learn hundred different tools to do something new. Just use whatever you use to edit files and you're done!


And you can use the same tools you use to edit a file to change behavior in these physical objects. You don't need to learn or lookup anything new (although locations of these files initially).

For example:

```bash
# Prints temperature of various parts of CPU and wifi-card
$ cat <(paste /sys/class/hwmon/hwmon*/temp*_label) <(paste /sys/class/hwmon/hwmon*/temp*_input) | expand -t15
Composite      Sensor 1       Sensor 2       Package id 0   Core 0         Core 1         Core 2         Core 3
43850          43850          40850          43800          43000          40000          41000          38000          37000          33000

# Prints everything printable from first partition of the disk
$ sudo strings /dev/nvme0n1p1

# Write 0 to the whole physical disk, WARNING: Don't do it, files being deleted are irrecoverable.
# Both the commands are equivalent
$ cat /dev/zero > /dev/nvme0n1
$ sudo dd if=/dev/zero of=/dev/nvme0n1
```

And filesystem is not absolute, everything starts from root (`/`) from a certain partition defined in `/etc/fstab` and then it starts to emulate that other devices (like your usb pendrive) are contained within itself (e.g. in `/media/sandisk1`), in reality, obviously it isn't.

## What is (the point of) Linux & why you should consider it?

Linux is a minimal & clean design which gives you building blocks that are just sufficient enough for doing everything.

* It is lightweight and generally performant.
* Extremely [customizable](https://www.reddit.com/r/unixporn) for specific workflows and hardware requirements.
* Make sures the software you're downloading is coming from a trusted source, so you don't have to identify which 1 of the top 4 google results is legit.
* Is transparent, modular & easy to debug.

<details>
<summary class="sticky top-0 cursor-pointer"><b>Examples of customization / stuffs you can perform (*CLICK ME*):</b></summary>

<iframe id="reddit-embed" src="https://www.redditmedia.com/r/unixporn/comments/m5522z/grub2_had_some_fun_with_grub/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="529" width="640" scrolling="no"></iframe>

<iframe id="reddit-embed" src="https://www.redditmedia.com/r/unixporn/comments/pq8m5r/dwm_widgets_two_layout_do_you_like_light_theme/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="529" width="640" scrolling="no"></iframe>

<iframe id="reddit-embed" src="https://www.redditmedia.com/r/unixporn/comments/vl09nw/newm_the_best_wayland_compositor_scrolling_tiling/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark&amp;autoStart=false" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="431" width="640" scrolling="no"></iframe>

<iframe id="reddit-embed" src="https://www.redditmedia.com/r/unixporn/comments/v7wnp6/hyprland_a_beautiful_wayland_compositor/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="412" width="640" scrolling="no"></iframe>

<iframe id="reddit-embed" src="https://www.redditmedia.com/r/unixporn/comments/j3mfc6/i3gaps_ready_for_fall/?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark" sandbox="allow-scripts allow-same-origin allow-popups" style="border: none;" height="529" width="640" scrolling="no"></iframe>

</details>


## What is a linux distro & choosing the best for your needs

A linux distro is a set of tools chosen to make your setup start working for a specific usecase instantly.

*Note: A distro is nothing but a collection of tools (referred to as packages), which can be added/removed in any other distro as well, as time will pass you'll notice only thing one differs by another is the package management and the rate of delivery of package updates.*

As a matter of fact, the *worst* part about
* Windows is "privacy" (does random things on behalf, incl. annoying updates).
* Macos is "customization" (too much locked down).
* Linux is "fragmentation" (too many choices to choose from).

Generally speaking, there are uncountable number of [linux-distros available](https://en.wikipedia.org/wiki/List_of_Linux_distributions) on the planet.

<blockquote>
"When you think of the linux kernel like engine in your car, it answers the question of why there are so many linux distros. Some cars are designed to be fast, some for comfort, some are engineered for enterprise, and others are just for fun. As a developer, linux is like a free engine that you can use to make your own car."
<div class="text-right">- fireship.io</div>
</blockquote>

***[DistroChooser](https://distrochooser.de) is my favourite resource I recommend everyone for choosing their first (or even latter) distro.***


## Installation

![Installation Targets](/blog/linux-1/linux-installation-targets.svg)

Because this article is mainly focused on getting-started, I'm mainly gonna talk about linux for desktops.

The most common way to install any linux-distro for desktop-use is to download the .iso image-file from their respective website and flash it on to a pen-drive using flashing tools (e.g. [balena etcher](https://www.balena.io/etcher) or [rufus](https://rufus.ie/en)), boot from it and follow the guide / on-screen-instructions.

***Bonus:** Because a pen-drive flashing overwrites pen-drive and only one-distro at a time can live on it this way, I personally use [Ventoy](https://www.ventoy.net/en/index.html) a multi-boot usb software that lets me just copy iso file without any external application like a regular file and it becomes ready to boot, plus I can place regular files and continue to use pen-drive as a storage device...*

### Partitioning Notes

At one of the last step in the installation, you'll be prompted to allocate disk space where you're going to install the linux distro. Make sure you make the following partitions in case you choose the manual partitioning (**not recommended for beginners**).

* 1 EFI partition *[fat32]* mounted on `/boot/efi` (>=500M preferred, shared)
* 1 swap partition *[swap]* mounted as `swap` (>=RAM)
* 1 root partition *[ext4]* mounted on `/` (rest of the size)

![Gparted](/blog/linux-1/gparted.jpg)

*Note: Multiple distro install should use seperate swap space, as they are used in hibernation and if reused by another may cause data-loss.*

## Basic components & terminologies

There are exactly 3 things that I think everybody should know while using linux.

### The console

The console is the heart of the Linux OS. Every operation is initiated through it.

Console is a very generic term, and there are actually 3 indivisual-components that builds up a console.
* [**Shell**](https://en.wikipedia.org/wiki/Unix_shell)**:** The ***most important*** part of console, namely interpreter of commands. It is the one which also provides you with tab-completions and syntax-highlighting etc.<br>Learn more about it from [GoalKicker](https://goalkicker.com/BashBook) | [LearnXinYminutes](https://learnxinyminutes.com/docs/bash).<br>e.g. bash zsh fish.
* **Prompt:** The part of visual prompt on the shell just before command.<br>e.g. [starship](https://starship.rs), [powerlevel10k](https://github.com/romkatv/powerlevel10k), ohmyzsh.
* **Terminal:** The graphical interface between the shell and the user, controllling the visual stuffs (fonts, padding, etc).<br>e.g. [kitty](https://sw.kovidgoyal.net/kitty), alacritty, konsole, gnome-terminal, [xfce4-terminal](https://gitlab.xfce.org/apps/xfce4-terminal).

![Console](/blog/linux-1/console.jpg)

*My personal favourites: fish as shell, starship as prompt & kitty as my terminal application.*

### The file structure

***Everything in linux is a file***, and by everything I mean literally everything! Your disk, your logical partitions, your usb peripheral including your mouse and keyboard, ramdisk, folders, whatever you can ever imagine is a file.

Linux (or unix in general e.g. MacOS) starts laying out filesystem from `/` called root (unlike C: D: multiple drives in windows). Every other partition can be mounted as *(emulated to be)* a directory of this root.

<img src="https://linuxconfig.org/wp-content/uploads/2013/03/Directory-Filesystem-Hierarchy-Standard.jpg" width="500px" />

*Note: There are 4 special folders: /sys /proc /dev /tmp which donot actually exist in disk, which may interest you (as I said earlier everything is a file, not just things residing in the disk)*

### The dotfiles (& DRY principle)

If you ever gone through programming, you may have already heard about the [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don't Repeat Yourself) principle, that is when you define a function to do same stuff over and over again.

Same thing applies here, if you already setup your linux once, you shouldn't need to set it up all over again if something went wrong.

Every application in linux which follows something called as Unix Philosophy (discussed in [part 2](/blog/linux-2) of article), places all its configuration as flat text files in the `/home/$USER/.config` folder for particular user or `/etc` for universal.

Those files are referred to as dotfiles, they're a few KiB in size and once you have it backed up, you can throw it to any fresh install with applications installed, and your look, feel & customization will be fully replicated in no-time!


## Getting your hands dirty

* Shell Scripting (bash): Learn it from [GoalKicker](https://goalkicker.com/BashBook) | [LearnXinYminutes](https://learnxinyminutes.com/docs/bash).
* [r/unixporn](https://www.reddit.com/r/unixporn): The home for linux & unix customization.
* [ArchWiki](https://wiki.archlinux.org) & [GentooWiki](https://wiki.gentoo.org): The bible of Linux Troubleshooting and How-To(s).
* [Google](http://google.com): Your best friend!
* [ManPage](https://en.wikipedia.org/wiki/Man_page): Best resource to understand any command, type `man <any-command>` to view.<br>
  [TLDR](https://dbrgn.github.io/tealdeer): A less intimidating version of man-pages, only lists what's used the most.
* [Linux-kernel-labs](https://linux-kernel-labs.github.io/refs/heads/master/lectures/intro.html): Understand how linux works (bottom up approach).
-->

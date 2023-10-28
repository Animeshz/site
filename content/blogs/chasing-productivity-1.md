---
title: "Chasing productivity - Part 1: The nixification saga"
description: "The first part of an intriguing journey: tapping into the nix module system."
created: 2023-10-28 9:15 PM
image: /blogs/git/cover.jpg
tags: ["linux", "productivity", "nix", "story"]
---

# Chasing productivity - Part 1: The nixification saga

Okay, So I've been off for about 3 months. No posts, no journals. Hmm, what a long time.

The reason is, being frustrated with a few things earlier, I've made a statement in the [Framework Discord](https://discord.gg/Framework) on 18th July, 2023 at 9:55PM IST that reads like this:

> Ykw, I'll waste my time building a experimental distro that's not a fork, that has easy process to create an iso, allowing switching various init and things like that, to see if its really that hard to do so... Adhering as much as possible to KISS principle, and making it able to easily ask for build outputs from external build agents such as github ci or vps rather than the most easy way nix/guix/gentoo/void defaults to, i.e. to build from source on local machine if binary not available.
> Going LFS but with certain enhancements I really wish were there, and easy ;p

I was in a deep thought of making a linux distro too good to be true (easy iso creation, [index pkg search](https://animeshz.github.io/site/blogs/void-linux.html#extremely-useful-scripts-xtools), [transient installs](https://github.com/nix-community/comma), [scripting layer](https://bedrocklinux.org/0.7/configuration.html), pinnable versions, cloud builds, [dev-env replication](https://www.thecodedmessage.com/posts/reproducibility), reducing pollution in builds via chroot, being maintainable, etc).

I've even made a few prototypes in private, but soon I realized something, nix is great not because its the best thing ever created, but because of consistent community efforts being put into RFCs and nixpkgs the largest repository which is frequently updated (even more than AUR). If you try to find anything its most likely already in nixpkgs.

Now I'm not saying this is the only reason nix is great, obviously everything as a file is also a really really good thing, but its only a part of the bigger picture. And even if I were able to make something too good to be true, the maintainence of repository is something that can't be done solo.

There's enormous amount of efforts people are putting in to keep the linux and existing infrastructure alive, for free.

## Self realization

I can't control everything on my computer! Even if I were able to, it'll be too late to do anything inherently useful.

The original purpose of me choosing to try linux: Productivity!

There's a very bold statement given in the book [4 Hour Work Week](https://fourhourworkweek.com):

<Quote author="Tim Ferris">
... Being efficient without regard to effectiveness is the default mode of the universe.

I would consider the best door-to-door salesperson efficient - that is, refined and excellent at selling door-to-door without wasting time - but utterly ineffective. He or she would sell more using a better vehicle such as e-mail or direct mail.

This is also true for the person who checks e-mail 30 times per day and develops an elaborate system of folder rules and sophisticated techniques for ensuring that each of those 30 brain farts moves as quickly as possible.
</Quote>

What I was trying to do was just an another example of this. The primary purpose was to improve my workflow, and be effective _to get the work done_. I was ignoring _to get the work done_ for the sake of making contact of getting work done simplified.

For example, [Write once, never write again](https://www.youtube.com/watch?v=NfeKenZHfDQ) is what I consider productivity. It helps getting work done quickly and effectively.


## Alternative Approach

[Nix module system](https://nixpkgs-manual-sphinx-markedown-example.netlify.app/development/writing-modules.xml.html) is still great. And that's not a understatement.

### The nix language

First let me tell you about nix's one of the most important benefit, _the laziness_.

<sub>You can evaluate any nix expression either at https://tvixbolt.tvl.su or by running command `nix repl`.</sub>

You can write things such as:

```nix
nix-repl> :p let x = { v = x; }; in x
{ v = { v = «repeated»; }; }
```

It allows one to reference a variable before its even defined. A slightly more complicated example:

```nix
let
  x = { v = y; w = x; };
  y = { p = y; q = x; };
in
  x

{ v = { p = «repeated»; q = { v = «repeated»; w = «repeated»; }; }; w = «repeated»; }
```

This is possible through a functional programming construct called as [Thunk](https://cs.tvl.fyi/depot/-/blob/tvix/eval/src/value/thunk.rs), also explained in [Nix Evaluation Performance](https://nixos.wiki/wiki/Nix_Evaluation_Performance).

Basically almost everything is basically a 0-arg function; that evaluates and replaces itself in memory with the result only when needed.

### The nix's module system

This laziness gives a foundation to the nix's module system, that is clearly explained in [Nix Hour #19 by Tweag](https://www.youtube.com/watch?v=cZjOzOHb2ow).

In short, with 2-3 different files you can define option in one file and set from other in any order.

```nix
# file1.nix
{ config, lib, ... }:
with lib;

{
  options = {
    foo = mkOption { type = types.int; };
  };

  config = {
    foo = mkDefault 5;  # sets default

    bar = mkIf (config.foo == 5) [ "a" "b" "c" ];
  };
}

# file2.nix
{
  imports = [ ./file1.nix ];
  foo = 7;  # override foo
}
# note that you don't need to encapsulate everything in `config`,
# unless you have `options` in the file as well.


# file3.nix
{ lib, ... }:
{
  imports = [ ./file1.nix ./file2.nix ];
  foo = lib.mkForce 9;  # override foo, with even higher priority
}
```

There are obviously various other important functions such as mkAfter, mkBefore, mkOverride.

This is possible only because of the laziness that was introduced in the language earlier, a very minimal code that allows this module system to be evaluated is:

```nix
let
  lib = import <nixpkgs/lib>;

  evalModules' = listOfFunctions:
    let
      resultOfFunctions = map (f: f x) listOfFunctions;
      x = lib.foldl' lib.recursiveUpdate {} resultOfFunctions;
    in x;

in evalModules' [
  # x is merged form of all three attrset (unevaluated).
  (x: {
    c = x.a + x.b;
    d = x.c + 7;
  })
  (x: {
    a = 10;
  })
  (x: {
    b = 20;
  })
]

$ nix-instantiate --eval <file.nix> --strict
{ a = 10; b = 20; c = 30; d = 37; }
```

This gives rise to the composability of one configuration on top of another. Things can be encapusulated in a file (aka module), and that module can receive values from files importing it.

I'd urge you to look at [the slides of NixCon 2023 - Why choose Nix for configuration?](https://github.com/ryantm/evalModules) if you have interest in digging deep into nix module system.

## The nixification

Due to these things, nix as a language suits very well for the IaC (infrastructure as code). Highly composable, modular, and reproducible.

I nixified my good ol' void-linux setup, so that if in any case my setup got broken, I could [restore everything](https://github.com/Animeshz/linux-desktop/blob/nix/homes/x86_64-linux/animesh@framework/default.nix); All the keybind, default app associatations, text editor configs, browser down to extensions, display scale, cursor-size, fonts, shell plugins and what not?

And its battle tested, as when I shifted my root to [ZFS](/notes/20-29--DevEnvironment/21--Linux/21.01-ZFS.html), I was able to restore every single thing as-is, I just had to plug-in the ethernet cable and let nix do rest of the work.

This is productivity for effectiveness.

### My Setup

[Animeshz/linux-desktop](https://github.com/Animeshz/linux-desktop) is root repository to my linux system configuration, managed by nix flake.

I've primarily used [home-manager](https://github.com/nix-community/home-manager) with [snowfall-lib](https://github.com/snowfallorg/lib/tree/feat/home-manager) for installation & configuration of most packages. For native stuffs (display drivers / virtualization that requires dkms kernel integrations / service management) I've used [Puppet RAL](https://github.com/Animeshz/linux-desktop/blob/nix/modules/home/puppet/default.nix#L17-L37).

So in most cases this config should be applicable to fit wide variety of distros, including various service managers (systemd/runit/openrc/etc).

### The productivity

A few important part of my setup I'd like to highlight:

* [nix-community/comma](https://github.com/nix-community/comma): Allows me running binaries transiently. What if I don't have neofetch?

  ```bash
  $ , neofetch
  ```

  And that's it, I don't need to search the package that provides that binary, nor I have to install it, just run it!

  It internally works with a reverse index (file -> package name); [nix-community/nix-index](https://github.com/nix-community/nix-index).

  Void offers [reading man-page without installation](https://github.com/leahneukirchen/xtools/blob/master/xmandoc), which is one thing to look for in future to be able to do with nix.

* [Puppet RAL](https://github.com/Animeshz/linux-desktop/blob/nix/modules/home/puppet/default.nix#L17-L37): Allows me to offload system-level configurations to [Puppet](https://www.puppet.com).

  ```nix
  puppet.ral = with lib.home-manager.hm.dag; {
    service.adb = entryAnywhere { ensure = "stopped"; };
  };
  ```

  This let me redefine the [environment.etc](https://github.com/Animeshz/linux-desktop/blob/nix/modules/home/puppet/etc.nix) options for my home-manager setup.

  There's one minor drawback, nix removes files if you remove config, but puppet will only do so if you set it to be absent.


## Scope of Improvement

I think one of the fundamental flaws of nix is that it looks at everything as a build process and shipment process (I'd describe as creation immutability).

It doesn't care much about procedures, such as editing an existent iso, quick operations such as merging images, performing bulk operations; shell script is still suited for that purpose even on NixOS and we already know how much they are unrestricted to be non-idempotent or irreproducible.

I think if we can wrap the procedures into lazy langauge (e.g. nix) with module system, we can do or handle various different things, without proposing shell hacks that are hard to get right.

## Future Goals

I'd like to personalize the setup, I do have all the keybind, bars and emacs setup that is making me very much productive. But,

* I'd like to achieve something like [Write once, never write again](https://www.youtube.com/watch?v=NfeKenZHfDQ).
* Improve accessibility (composable scripting, monitoring system, etc). Things that will actually help me _getting things done_.
* Research transparent cloud off-loading of the tasks (you'll laugh at me, but I broke the fans on my laptop, and I use auto-cpufreq to cap the CPU).
* Some way to host packages that is overlayed or not present in https://cache.nixos.org, I've been thinking about [attic](https://docs.attic.rs/tutorial.html#pushing) that allows upstream caching.

Journey to nix has been really interesting, this is a really good quote I found on [HN](https://news.ycombinator.com/item?id=28900008):

> my code is possible if people want it :) the real value of NixOS is hardware and OS config can be turned into libraries

This is the part 1 of the chasing productivity series, I'd keep posting updates while also getting things done this time!
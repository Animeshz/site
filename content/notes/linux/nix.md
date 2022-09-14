---
title: "Nix - Building a Robust Dev Environment"
slug: "nix"
---

<h1>{{ $frontmatter.title }}</h1>

## Nix - An introduction

Nix, a package manager and a configuration language (not just specific to NixOS), to make a reproducible self-contained builds, from flat text-files.

Its primary repository (called [nixpkgs](https://search.nixos.org/packages)) is quite like a AUR but without the restriction to use a particular distro in order to use it, it runs on *all the Linux distros available on the planet* as well as on the MacOS.

Plus unlike AUR, it uses a binary cache by which you can install pkgs directly (without hours of build). Its over 220TB large and distributed via CDN.

If something went wrong ***including any system level modifications*** from nix, can be easily rolled back using nix profiles (created automatically at every change).

This page contains my notes while installing nix on Void Linux.


## Installing Nix

```bash
sudo xbps-install nix             # 1
sudo usermod -aG nixbld (whoami)  # logout & login

sudo ln -s /etc/sv/nix-daemon /var/service
nix-channel --add http://nixos.org/channels/nixpkgs-unstable nixpkgs
nix-channel --update

# Specific to fish shell
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
fisher install lilyball/nix-env.fish
sudo mkdir -p /nix/var/nix/profiles/default/etc/profile.d
sudo cp /etc/profile.d/nix.sh /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
# re-open shell

# To confirm
echo $NIX_PATH
nix-env --version
nix-shell -p hello   # run 'hello' in the new shell
```

<sub>1. Installation with xbps just makes uninstall process easier (otherwise run the script in their website & create a runit service with one line: `exec /nix/var/nix/profiles/default/bin/nix-daemon`)</sub>

### Some useful fish abbreviations

```fish
# abbr ne 'nix-env'
abbr nc 'nix-channel --add'
abbr nu 'nix-channel --update'
abbr ns 'nix-shell'
abbr ng 'nix-collect-garbage -d'
abbr no 'nix store optimise'

abbr nr 'nix registry list'
abbr npi 'nix profile install'
abbr npr 'nix profile remove'
abbr nph 'nix profile history'
abbr nproll 'nix profile rollback --to'

abbr nfs 'nix shell'
abbr nfr 'nix run'
abbr nfd 'nix develop'

abbr nfshow 'nix flake show'
abbr nfmeta 'nix flake metadata'
abbr nfpinf 'nix path-info -rsSh'
```

## Opiniated Configuration

```bash
echo 'max-jobs = auto' | sudo tee --append /etc/nix/nix.conf   # Use multi-threads
echo 'experimental-features = nix-command flakes' | sudo tee --append /etc/nix/nix.conf # Use flakes
```

## Learning Nix

[Nix - Getting started](https://nix-tutorial.gitlabpages.inria.fr/nix-tutorial/getting-started.html)<br>
[NixShorts - Your First Derivation](https://github.com/justinwoo/nix-shorts/blob/master/posts/your-first-derivation.md)<br>
[LearnXinYminutes - Nix](https://learnxinyminutes.com/docs/nix)
[Nix - The cool stdLib](https://ryantm.github.io/nixpkgs/functions/library/strings)

[This video](https://www.youtube.com/watch?v=qjq2wVEpSsA) talks in-depth how Nix and NixOS are so close to be perfect.

[Using file to manage packages - non-nixos users](https://unix.stackexchange.com/questions/369234/how-to-configure-a-nix-environment-outside-of-nixos)
[Declaring dependencies](https://discourse.nixos.org/t/poetry2nix-flakes-add-runtime-dependencies/15930/3)<br>
[Runtime dependencies in shell scripts](https://discourse.nixos.org/t/how-to-create-a-script-with-dependencies/7970/6) or [makeWrapper on nixpkgs](https://gist.github.com/CMCDragonkai/9b65cbb1989913555c203f4fa9c23374) or [substituteInPlace in home-manager](https://github.com/nix-community/home-manager/blob/master/home-manager/default.nix)

Misc:


[Nix Modules - Docs](https://nixos.wiki/wiki/NixOS_modules) | [nix_modules src](https://github.com/NixOS/nixpkgs/blob/master/lib/modules.nix#L373)<br>
[Nix Pills](https://nixos.org/guides/nix-pills/our-first-derivation.html)


## Nix Flakes

A new de-facto standard to write nix files, making everything clean and easier to understand. Quite like a rust crate, also forms a lockfile for automated reproducibility.

* Learn more:<br>
  [https://edolstra.github.io/talks/nixcon-oct-2019.pdf](https://edolstra.github.io/talks/nixcon-oct-2019.pdf)<br>
  [https://serokell.io/blog/practical-nix-flakes](https://serokell.io/blog/practical-nix-flakes)<br>
  [https://ianthehenry.com/posts/how-to-learn-nix/flakes](https://ianthehenry.com/posts/how-to-learn-nix/flakes)
* Official Docs: [https://nixos.wiki/wiki/Flakes](https://nixos.wiki/wiki/Flakes)

[The new `nix *` commands vs the traditional `nix-*` commands](https://blog.ysndr.de/posts/guides/2021-12-01-nix-shells/#tldr-nix-develop)


<!- Home Manager: https://www.youtube.com/watch?v=OgUvDXxHlLs --->

## Extra (Personal Favourites)

* [lib.mkDefault](https://discourse.nixos.org/t/what-does-mkdefault-do-exactly/9028/2)
* [Include all nix modules under a path](https://www.reddit.com/r/NixOS/comments/j5pa9o/getting_all_configs_from_folder)
* [Sample config from a long time nix user](https://github.com/nuxshed/dotfiles/blob/main/flake.nix)
* [Setup Binary Cache](https://nixos.wiki/wiki/Binary_Cache) + [Use it](https://nixos.org/manual/nix/stable/command-ref/conf-file.html)
* [nix path-info command](https://nixos.org/manual/nix/unstable/command-ref/new-cli/nix3-path-info.html)

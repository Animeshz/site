---
title: "Creating Yet Another Distribution: ZXCV Linux (Part 1)"
description: "What's better than gaining complete control? Change my mind!"
created: 2023-07-18 11:40 PM
image: ""
tags: ["linux", "scratch"]
draft: true
---

# Creating Yet Another Distribution: ZXCV Linux (Part 1)

You know what, I'm going to build an experimental distro that is not going to be a fork (to-be-honest).

And its going to rise from my few year-long struggle. Namely, it'll include

* A first-class support for remote build agent: because I literally nuked my laptop fan and I'm not going to kill my CPU building everything from the source.
* Easy way to create a customized iso #void-linux.
* Allow switching software by changing a line #nix.
* TODO...


## Motivation

You know what immediately comes to the mind after reading this?

Yes, the good ol' [xkcd#927](https://xkcd.com/927):

![XKCD#927](https://imgs.xkcd.com/comics/standards.png)

Before anyone get mad at me, let me quickly shed some light on current situtation.

TODO...


## The Setup

I'm going to use nix as the package manager for my distro.

More - TODO...


## Step 1: Setting up remote building

I nuked my laptop fan, and I constantly use [auto-cpufreq](https://github.com/AdnanHodzic/auto-cpufreq) to force the powersave governor and turbo off. And I can't bear to make my laptop a compiling machine.

In one sense its better to use remote building as well, because
* Cloud Servers generally have commercial-grade fast internet speed.
* Your local machine doesn't get battery drained / dissipate heat / workflow slowed down.

So let's set up a remote building agent.

### Attempt #1

For the time being, I would like to use github actions:

```yaml
name: Remote Build Agent

on:
  workflow_dispatch

jobs:
  agent:
    runs-on: ubuntu-latest
    steps:
      - name: Setup nix
        run: |
          apt-get install -y nix
          nix-store --init

          mkdir -p /etc/nix
          openssl genrsa -out /etc/nix/signing-key.sec 2048
          chmod 600 /etc/nix/signing-key.sec

          echo "=============== RSA PUBLIC KEY START ==============="
          openssl rsa -in /etc/nix/signing-key.sec -pubout
          echo "=============== RSA PUBLIC KEY END   ==============="

      - name: Setup tmate session
        uses: mxschmitt/action-tmate@v3
```

Okay, seems like tmate session doesn't allow running non-interactive commands `ssh <something>@nyc1.tmate.io 'ls /'` fails.

```bash
# Copy public key in actions output
$ xclip -sel -o | sudo tee /etc/nix/signing-key.pub

$ nix-build \
    --max-jobs 0 \
    --builders "ssh-ng://rCAqGVD9CY89c7ERvahtH6WZ5@nyc1.tmate.io x86_64-linux - 4 10" \
    -I nixpkgs=channel:nixpkgs-unstable \
    --expr 'with import <nixpkgs> {}; hello.overrideAttrs (drv: { REBUILD = builtins.currentTime; })'
this derivation will be built:
  /nix/store/pry3j857bm6y4s7fjb4pqsra4ag07p91-hello-2.12.1.drv
cannot build on 'ssh-ng://rCAqGVD9CY89c7ERvahtH6WZ5@nyc1.tmate.io': error: cannot open connection to remote store 'ssh-ng://rCAqGVD9CY89c7ERvahtH6WZ5@nyc1.tmate.io': error: protocol mismatch, got 'Invalid command'
```

So nix-build didn't worked either.

Seeing this, before going full-on into this territory, I'd like to check if it actually works.

### Attempt #2

Let's test things locally on [LnL7/nix-docker](https://github.com/LnL7/nix-docker) for a moment.

```bash
$ nix-build -j0 -E 'with import <nixpkgs> { system = "x86_64-linux"; }; hello.overrideAttrs (drv: { REBUILD = builtins.currentTime; })'
this derivation will be built:
  /nix/store/hz8q03mwzfhy6ldp93cczydmc2hv6vy4-hello-2.12.1.drv
these 40 paths will be fetched (62.28 MiB download, 289.16 MiB unpacked):
  /nix/store/011g91lwk2l5qmzgrgmrjp2qpkjj1n0r-binutils-2.40-lib
  /nix/store/0ccvlygpc7p5zyfsyz8mmg9ycqkvrcp2-glibc-2.37-8-dev
  /nix/store/1ci6fn5jq64iqkcmhgzjxashsg8bm8p5-xz-5.4.3-bin
  ...
  /nix/store/xk6lvr5w3bgxm404x8lkgcka2xx3h40q-gnutar-1.34
  /nix/store/ylq35nr0zs7n54c96wx0vl3spwhcf3z9-bzip2-1.0.8-bin
  /nix/store/yrcf918h3vz3x9b36fnm0kf8snvjff9b-gnused-4.9
  /nix/store/z7zc7cm04j6dd7bghlczg7ryk93md6f4-expand-response-params
copying path '/nix/store/a7f7xfp9wyghf44yv6l6fv9dfw492hd3-bash-5.2-p15' from 'https://cache.nixos.org'...
copying path '/nix/store/2jdmi86cvcrjrgmjc9mx119zbq278ssi-acl-2.3.1' from 'https://cache.nixos.org'...
copying path '/nix/store/7lmanxby1n0lwb4a2wdjgrsqfk5vzxsg-bzip2-1.0.8' from 'https://cache.nixos.org'...
...
copying path '/nix/store/hhhjpdd06w42prplsak9r0w2y426pdwp-gcc-12.3.0' from 'https://cache.nixos.org'...
copying path '/nix/store/wgnrcbdh3nq4qd00xzj1sl2ps8fx70r0-binutils-wrapper-2.40' from 'https://cache.nixos.org'...
copying path '/nix/store/x7n44lfys59k5ajj9w1fkxw5391cnn5v-gcc-wrapper-12.3.0' from 'https://cache.nixos.org'...
copying path '/nix/store/fzb9wy1yz0hn69vxw12954szvrjnjjgk-stdenv-linux' from 'https://cache.nixos.org'...
building '/nix/store/hz8q03mwzfhy6ldp93cczydmc2hv6vy4-hello-2.12.1.drv' on 'ssh-ng://nix-docker'...
copying 60 paths...
copying path '/nix/store/6kyaqlxcmfadiiq0mcdj1symv1jsp58w-xgcc-12.3.0-libgcc' to 'ssh-ng://nix-docker'...
copying path '/nix/store/aw137ya6rvy61zw8ydsz22xwarsr8ynf-libunistring-1.1' to 'ssh-ng://nix-docker'...
copying path '/nix/store/vh4pdds47783g12fmywazdx3v3kx0j4x-libidn2-2.3.4' to 'ssh-ng://nix-docker'...
copying path '/nix/store/ayg065nw0xi1zsyi8glfh5pn4sfqd8xg-glibc-2.37-8' to 'ssh-ng://nix-docker'...
copying path '/nix/store/x7n44lfys59k5ajj9w1fkxw5391cnn5v-gcc-wrapper-12.3.0' to 'ssh-ng://nix-docker'...
...
copying path '/nix/store/xk6lvr5w3bgxm404x8lkgcka2xx3h40q-gnutar-1.34' to 'ssh-ng://nix-docker'...
copying path '/nix/store/xyff06pkhki3qy1ls77w10s0v79c9il0-reproducible-builds.sh' to 'ssh-ng://nix-docker'...
copying path '/nix/store/ylq35nr0zs7n54c96wx0vl3spwhcf3z9-bzip2-1.0.8-bin' to 'ssh-ng://nix-docker'...
copying path '/nix/store/yrcf918h3vz3x9b36fnm0kf8snvjff9b-gnused-4.9' to 'ssh-ng://nix-docker'...
copying path '/nix/store/fzb9wy1yz0hn69vxw12954szvrjnjjgk-stdenv-linux' to 'ssh-ng://nix-docker'...
copying path '/nix/store/pa10z4ngm0g83kx9mssrqzz30s84vq7k-hello-2.12.1.tar.gz' to 'ssh-ng://nix-docker'...
querying info about '/nix/store/dxsg1bizilppinbqi7376ygd5q2ijsgh-hello-2.12.1' on 'https://cache.nixos.org'...
downloading 'https://cache.nixos.org/dxsg1bizilppinbqi7376ygd5q2ijsgh.narinfo'...
building '/nix/store/hz8q03mwzfhy6ldp93cczydmc2hv6vy4-hello-2.12.1.drv'...
unpacking sources
...
```

Huh? Really? Downloading into local machine then copying into build machine?

I tried `--builders-use-substitutes` no luck, probably because this option requires you to be in trusted-users (undocumented).

Then tried setting this on `/etc/nix/nix.conf`, but it wasn't working either, unless I add a channel and update it on the build machine (container here).

And you know what? cache was directly getting downloaded into building machine (docker container in this case), but building the gnu's hello project pulled about 1.87G of things in docker and 1.4G in my machine, all GC-able, wth?

I'm just fond of this type of nix abstraction, and I'm out, not wasting anymore of my data connection.

### Attempt #3

Let's try manually exporting and importing.

```bash
nix-store --export /nix/store/z3fb7fk6515c0f3wvkibxxll7cxsq1dr-eww-0.4.0.drv /nix/store/m67prpgwaha9n934b4g0k00flg5jx91z-eww-0.4.0 > hmm
docker run --name nix-docker -d -p 3022:22 lnl7/nix:ssh
sudo docker cp hmm nix-docker:/hmm

docker exec -it nix-docker bash
> nix-store --import < /hmm
> error: path '/nix/store/46bvmvqbvn8afdkgfwwaw2bmykjq3fcc-pango-1.50.14' is not valid
```

Hmm, Seems like it doesn't work unless nix-store --export actually exports a complete closure as `nix-store --export $(nix-store --query --requisites <things>)`.

Well, then, what's the point of `nix store copy`, `nix-copy-closure`? I'm not too sure...

### Rethink the whole scenario

Okay, so while trying this out I do know how nix works

* `nix-instantiate -A derivation-attribute` or `nix-eval '<path.to.derivation>.drvPath'` inherently produce a derivation closure (bunch of `.drv` files) and output the requested root-derivation's path.
* These closures can be copied form machine to machine, `nix-build <root-derivation>.drv` or `nix-store --realise <root-derivation>.drv` will recursively build (or realise as they say) the derivation on the store.
* This prints the built root-derivation's output path, closure of that can be copied from machine to machine.

Also [reference #1 (reddit)](https://www.reddit.com/r/NixOS/comments/l5221x/comment/gm9xre8) and [reference #2 (gist)](https://gist.github.com/danbst/09c3f6cd235ae11ccd03215d4542f7e7) for the same.

In either case the current nix-implementation require you to export/import (or copy) the whole closure of whatever be it derivation or the build output. There doesn't seem to be partial export and depend on build-cache / substituters for missing items.


## Step 2: Making a bootable ISO

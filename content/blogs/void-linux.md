---
title: "Unmasking the hidden gems of Void Linux"
description: "Void Linux, is arguably one of the most underrated Linux distributions with incredible scripting potential. The article delves deep into some of my favorite features of it."
created: 2023-05-25 2:51 PM
image: /blogs/void-linux/void-wall.png
tags: ["demystifying", "linux"]
---

# {{ $frontmatter.title }}

<img alt="Void Linux Logo" src="/blogs/void-linux/void-wall.png" style="margin: auto;">

**My** previous article ([Demystifying UEFI](./demystifying-uefi.md)) had an outstanding response. It became the top post of the month on r/embedded and even made it to the top 10 of the year. It was even recognized by Google Discover, which I myself received as a recommendation, showing me the positive impact it had. So, I am grateful to everyone who found value in my last article.

It had got a lot of up's for and also questions as why I've been using _xbps_ to install dependencies.

So here I'll explain every single thing I saw and experienced that led me to make a permanent shift to Void Linux.

## A bit of an interesting story

Looking back to the day I first installed Linux, I have gained more and more control over my setup ever since.

I went from windows -> kali -> parrot -> deb -> fedora -> windows -> pop -> windows -> arch -> _void_, and never looked back since then.

My distro-hopping finally stopped at _void_, and I'm on it for more than 2 years now.

The reason is simple, its by far its the most scripted distro I ever seen. _See_ everybody likes using ready-to-use products, but as you move with them you feel to lose control over your environment (things break if you try to swap components), feel restricted and hence unproductive. But if you choose minimalism, getting things done becomes very tedious and time-consuming.

Here comes the perfect bet, a mix-n-match of pseudo-minimalism and a lot of automation for getting things done faster than ever before. A scripted distribution, Void.

Since I started using void, I learned quite a lot, and it had let me swap almost every single component without ever breaking my installation. And I'm going to unravel everything I know about Void Linux.

## Some boring random statistics

Initial release of Void Linux was back in 2008, but it is getting traction in recent years.

According to Wikipedia, as of Feb 2023, Void Linux had taken a ranking of #4 with score of 9.08 on [DistroWatch](https://distrowatch.com/dwres.php?resource=ranking) based on user reviews, and as of now (May 2023), it has jumped to take position of _#1 Linux distro_ by user reviews with a score of 9.25.

On [r/unixporn discord server](https://discord.gg/TnJ4h5K) statistics shows that its been in use for ricing by 55 people (#3), sitting next to arch (444 people) and ubuntu (61 people).

Wide compatibility - its one of the first few distro that works on arm platforms and successfully runs on miniature devices like [RaspberryPi](https://www.raspberrypi.org). Side-roast: Arch Linux doesn't.


## Why is void so cool?

Ok, enough of statistics. What really makes void so good, why would anyone want to use it?


### Extremely useful scripts (xtools)

**A lot** of times we know name of a command, but we forget about the package that supplies it, _xlocate_ exactly comes to the rescue. This comes under [xtools](https://github.com/leahneukirchen/xtools).

There are variety of tools provided, my personal favourite ones are:

* **xlocate:** reverse package search (by files).
  ```bash
  $ xlocate bin/pdfunite
  poppler-23.05.0_1  /usr/bin/pdfunite

  $ xlocate bin/fuser
  fuse-2.9.9_1     /usr/bin/fusermount
  fuse3-3.14.1_1   /usr/bin/fusermount3
  glusterfs-9.4_3  /usr/bin/fusermount-glusterfs
  psmisc-23.6_1    /usr/bin/fuser

  $ xlocate 'bin/fuser$'
  psmisc-23.6_1  /usr/bin/fuser
  ```
* **xhog:** analyze pkg by its installation size.
  ```bash
  $ xhog
  ...
  alsa-utils-1.2.8_1                        2434KB
  7zip-22.01_2                              2587KB
  ...
  ```
* **xchroot:** chroot that performs all mounts to /dev /sys /proc, /etc/resolv.conf for making chroot ready for everything that can also be extended for [display forwarding](https://github.com/Animeshz/scripts/blob/main/snips/xc).
  ```bash
  $ xchroot masterdir/
  => Entering chroot masterdir/
  [xchroot masterdir/] #
  ```
* **xetcchanges (a life-saver):** Show changes of files on /etc from initial pkg installation.
  ```diff
  $ xetcchanges | less
  --- acpid-2.0.34_2/etc/acpi/handler.sh
  +++ /etc/acpi/handler.sh        2023-04-02 01:32:22.897996102 +0530
  @@ -18,13 +18,16 @@
   maxspeed=$(cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq)
   setspeed="/sys/devices/system/cpu/cpu0/cpufreq/scaling_setspeed"

  +join() { local ifs=$1; shift; echo "$*"; }
  +PATH=$PATH:$(join ':' $(ls /home | xargs -I{} echo /home/{}/.scripts/acpi))

   case "$1" in
       button/power)
           case "$2" in
               PBTN|PWRF)
  -                logger "PowerButton pressed: $2, shutting down..."
  -                shutdown -P now
  +                logger "PowerButton pressed: $2, suspending..."
  +                slp
  ```
* **xilog:** Shows installed pkgs by their date of installation.
  ```bash
  $ xilog
  ...
  exa-0.10.1_3                           : 2023-05-24 23:36 IST
  mksh-R59c_2                            : 2023-05-25 01:17 IST
  ```
* **xmandoc:** Read man-page of not installed pkg.
  ```bash
  $ xmandoc zsh
  ```
* **xgensum/xnew/xrevshlib:** Some pkging tools.
  ```bash
  $ xnew mypkg             # create new pkg
  $ xgensum -i mypkg       # generate checksum and put it in-place
  $ xrevshlib libprotobuf  # check all pkgs depending on shlibs of libprotobuf
  ```
* **xvoidstrap:** Bootstrap a new void install with just one-word command.
  ```
  $ mkdir new-root
  $ xvoidstrap new-root/
  ```

These are so good for a power user, you get complete insight of your installation via a few simple to use no-flag commands.

There are even more of them, these were just my favourites!

---

### Custom ISO (void-mklive)

**Ah**, the released iso is way too outdated and has a limited set of pre-installed packages. No problem!

Void gives you ability to create your own iso, with packages as latest as today! As well to add packages, directories and kernel-parameters to the iso.

Just clone the [void-mklive](https://github.com/void-linux/void-mklive) repository, and run mklive\.sh:

```bash
git clone https://github.com/void-linux/void-mklive && cd void-mklive
sudo ./build-x86-images.sh -b base -- -a x86_64 \
  -r 'https://mirrors.dotsrc.org/voidlinux/current' \  # custom mirror
  -p 'iwd bash dialog fish-shell neovim kitty starship chromium vscode gcc make rofi herbstluftwm grub grub-x86_64-efi xorg btop linux-firmware-intel mesa-dri vulkan-loader mesa-vulkan-intel intel-video-accel xf86-video-intel' \
  -C "acpi_osi='Windows 2020' net.ifnames=0 nvme.noacpi=1"
```

As an example, this will create latest iso with given packages and kernel parameters.

This is not just limited to iso generation, you can even create netboot images, rootfs tarball and platformfs tarball.

---

### Hybrid Package Management

**In** general, there are two types of package management:

1. **Binary Based:** Online repository provides pre-built softwares, in form of binary blobs (zip).
    - Advantage is that you don't have to build big packages like kernel or chromium yourself, which takes hours to build.
2. **Source Based:** Online repository provides templates, which builds the software in target machine only.
    - Advantage is that you can customize all the compilation parameters as you want, and also easily _version bump_ by just changing a line. Or apply patches or external files if you need.

Void provides best of both worlds!

Void's online repository provides binary-based package management, as expected by most modern distributions.

Whereas it also distributes all packages in form of templates at [void-linux/void-packages](https://github.com/void-linux/void-packages). The builder is popularly known for `xbps-src`.

```bash
$ git clone https://github.com/void-linux/void-packages && cd void-packages
$ ./xbps-src binary-bootstrap  # setup chroot (one-time)
$
$ cp myfix.patch srcpkgs/dwm/patches  # (optional) if you want to patch
$ ./xbps-src pkg dwm
```

One of the greatest advantage of this build-system unlike others is that none of the builds interfere with the host system, everything happens under the isolated chroot, and final build gets packaged into a `*.xbps` binary file in `hostdir/binpkgs` directory.

It can then be installed with general `sudo xbps-install -R hostdir/binpkgs dwm`, and same directory can serve as a custom-mirror e.g. [my personal on netlify](https://github.com/Animeshz/void-xpackages).

And there you go, you're now a mirror provider!

---

### Strict Package Standards

**Unlike** AUR where each package is splitted into different repositories and everything depends on owner of that package, Void uses just a single repository [void-linux/void-packages](https://github.com/void-linux/void-packages) for every single package.

With this, void don't accept any random packages until [all the criterias](https://github.com/void-linux/void-packages/blob/master/CONTRIBUTING.md#package-requirements) have been satisfied and package is throughly tested on all the platforms.

This means rolling release (shipping latest-versions) while being completely **stable**. It even tracks the [common/shlibs](https://github.com/void-linux/void-packages/blob/master/common/shlibs) to map libraries to pkgs, so it can perform partial upgrade without breaking anything (unlike Arch xD).

<sub>**PS:** Now this is controvertial as seen by reddit comments, its actually a personal taste if everything should go in one repository or not, but having multiple people verify the package status over different machine / architectures before its merged and distributed is a good to have.</sub>

---

### Easy (runit) Service Creation

**Everybody** I see who try void for the first time generally _disregards_ void because of this

```bash
                            converts to
sudo systemctl enable --now abc    sudo ln -s /etc/sv/abc /var/service
sudo systemctl disable --now abc   sudo rm /var/service/abc
sudo systemctl start abc           sudo sv up /var/service/abc
sudo systemctl stop abc            sudo sv down /var/service/abc
systemctl status abc               sudo sv status /var/service/abc  # also: sudo sv status /var/ser
```

Obviously its not so intuitive for beginners.

But they never see the simplicity & easyness of _service creation_, i.e. this `/etc/systemd/system/rc-local.service`

```bash
# /etc/systemd/system/rc-local.service
#  SPDX-License-Identifier: LGPL-2.1+
#
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.

# This unit gets pulled automatically into multi-user.target by
# systemd-rc-local-generator if /etc/rc.local is executable.
[Unit]
Description=/etc/rc.local Compatibility
Documentation=man:systemd-rc-local-generator(8)
ConditionFileIsExecutable=/etc/rc.local
After=network.target

[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
RemainAfterExit=yes
GuessMainPID=no

# /usr/lib/systemd/system/rc-local.service.d/debian.conf
[Unit]
# not specified by LSB, but has been behaving that way in Debian under SysV
# init and upstart
After=network-online.target

# Often contains status messages which users expect to see on the console
# during boot
[Service]
StandardOutput=journal+console
StandardError=journal+console
```

shrinks down to just 2 lines `/etc/sv/rc-local/run`

```bash
#!/bin/sh
[ -x /etc/rc.local ] && /etc/rc.local
exec chpst -b rc-local pause
```

This is incredible, now you never have to look for options in the docs, just create a shell script at `/etc/sv/<serv>/run`, that's it!

<sub>**Sidenote:** although in runit, rc.local already runs from `/etc/runit/2` ([stage 2](http://smarden.org/runit)), so this is not even required.</sub>

---

### Vanilla experience

**Things** start to get clumsy, the time you start shipping themes bundled to packages. Attempting to modify what's bundled is likely to break the system.

Void in 99% of cases ships vanilla configurations. Only in terms of optional simplicity it ships with extra items such as global pipewire & wireplumber service (for audio), as its not shipped by the owner and also because its initially also tedious to set them up per-user basis.

---

### Debian & Fedora ♥ Void (xdeb)

**One** of great thing about void, even being an independent distribution is that, its scriptable and keeps compatibility with other packaging standards.

You can always install any `*.deb` and `*.rpm` package in void with ease! `xbps-src` automatically handles the extraction.

There's even a dedicated script [xdeb](https://github.com/toluschr/xdeb) just for that if you don't wanna clone void-packages repository, installation is as simple as:

```bash
./xdeb -Sde <name>.deb
sudo xbps-install -R binpkgs <name>
```

<sub>**PS:** Note that [xdeb is not official way of installing softwares](https://www.reddit.com/r/voidlinux/comments/13rcz03/comment/jljl9cw/?utm_source=share&utm_medium=web2x&context=3), prefer making package templates under xbps-src if possible. xdeb doesn't perform a lot of checks that should be done to keep safety of void installation, it does however automatically detects dependencies so I showed it for quick reference.</sub>

---

### Further down the rabbit-hole

This is not the end, it goes even further. I did not even touch upon other scripts such as [xmirror - Fast CDNs](https://voidlinux.org/news/2023/02/1-new-repo-fastly.html), xbps - the package manager itself, more over runit (stages), the musl libc, etc. to keep the article short and crisp.

If you want you can go further down the rabbit-hole and be complete guru of linux, without wasting much time in LFS, while still getting what LFS can offer (source-based complete control), Void is probably going to be one of the best bet available for you!


## Conclusion

**Whatever** takes over dozen of lines, takes hardly 1 or 2 lines in void.

Alot of helper scripts are life-saver, if anything goes bad, even deletion of /etc, you can rescue that (with xetcchanges), there's a complete control over the distribution, and hardly any risk is involved at any point of time.

Hopefully, it gave you a broad perspective of potentials of linux and about void's philosphical differences from other distros. It should be enough for you to start using Linux how it should be!

Backlinks:
* [r/voidlinux](https://www.reddit.com/r/voidlinux/comments/13rcz03/article_unmasking_the_hidden_gems_of_void_linux) | r/linux
* [LinkedIn](https://www.linkedin.com/posts/animeshz_unmasking-the-hidden-gems-of-void-linux-activity-7067433287912165377-I7in)
* [DistroWatch](https://distrowatch.com/void)

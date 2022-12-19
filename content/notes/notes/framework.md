---
title: "Framework"
created: 2022-10-13
---

# {{ $frontmatter.title }}

## Useful Keys

```lua
F2    BIOS
F12   Boot Menu

Fn+Esc    Fn Lock
Fn+Space  Backlit level++
```


## fw-ectool

Since framework uses chromium-ec for its EmbeddedController, its possible to use ectool to control various low-level hardware that are not exposed to the kernel in most-cases.

Here are my favourite usecases:

```bash
sudo fw-ectool fanduty 0    # sets fan speed to 0%, or any desired level
sudo fw-ectool autofanctrl  # reset to automatic fan ctrl
sudo fw-ectool pwmgetfanrpm # get current fan rpm

sudo fw-ectool led right query  # query available colors (right)
sudo fw-ectool led left <color|off|auto>  # set custom colors on various leds
sudo fw-ectool led right <color|off|auto>
sudo fw-ectool led power <color|off|auto>

sudo fw-ectool fwchargelimit 80   # limit charging to hit maximum 80

```

Read [this](https://www.howett.net/posts/2021-12-framework-ec) for further use of this tool (written by same guy who patched ectool to work for framework).


## Bios Update

Framework BIOS updates can be triggerred from within Linux (requires `fwupd` package):

```bash
sudo fwupdmgr enable-remote lvfs-testing
grep -qxF 'DisableCapsuleUpdateOnDisk=true' /etc/fwupd/uefi_capsule.conf || echo 'DisableCapsuleUpdateOnDisk=true' | sudo tee --append /etc/fwupd/uefi_capsule.conf

sudo fwupdmgr update
```


## More Information

* [Framework Laptop - ArchWiki](https://wiki.archlinux.org/title/Framework_Laptop)
* [Framework Discord](https://discord.gg/Framework) & [Framework Community](https://community.frame.work)


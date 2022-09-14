---
title: "Linux Troubleshooting"
slug: "linux-troubleshooting"
---

<h1>{{ $frontmatter.title }}</h1>

::: info Note
*A lot of commands listed here uses xbps (VoidLinux's package manager) for installation purposes, package names may vary distro to distro.*
:::

## Unicode Glyphs Missing:
```
sudo xbps-install noto-fonts-ttf noto-fonts-emoji font-unifont-bdf
```

## High Battery Usage

Refer to [Battery-Saving Section in Linux-Setup](./linux-setup).

## xdg-open: no method available for opening 'scheme://url'

```bash
cd /usr/share/applications      # for autocompletion
cd ~/.local/share/applications

# Set default browser
xdg-settings set default-web-browser brave-browser.desktop

# Set default app for 'scheme://'  (EITHER OF TWO WAYS)
xdg-settings set default-url-scheme-handler <scheme> brave-browser.desktop
xdg-mime default brave-browser.desktop x-scheme-handler/<scheme>

# Query mime-type of a file
xdg-mime query filetype <file>
# Get/Set default app for certain mime-type
xdg-mime query default text/plain
xdg-mime default brave-browser.desktop application/pdf
xdg-mime default nvim.desktop text/plain
xdg-mime default ranger.desktop inode/directory


# TODO: Should be in a note where we create .desktop entry ourselves instead
# Note: if MimeType= association is changed within a .desktop entry
sudo update-desktop-database
sudo update-desktop-database ~/.local/share/applications
```


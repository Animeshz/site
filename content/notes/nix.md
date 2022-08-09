+++
title = "Nix - The unbreakable dev environment"
slug = "nix"
date = "2022-08-02T13:10:17+05:30"
updated = "2022-08-07T15:03:47+05:30"
+++

Nix, a package manager for NixOS is not just available to the NixOS but any other distro available on the planet.

This page contains my notes while installing nix on Void Linux.

## Installing Nix

```bash
sudo xbps-install nix
sudo usermod -aG nixbld (whoami)   # logout & login

sudo ln -s /etc/sv/nix-daemon /var/service
nix-channel --add http://nixos.org/channels/nixpkgs-stable nixpkgs
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

### Some useful fish abbreviations

```fish
# abbr ne 'nix-env'
abbr nc 'nix-channel --add'
abbr nu 'nix-channel --update'
abbr ns 'nix-shell'
abbr ng 'nix-collect-garbage -d'
```

## Opiniated Configuration

```bash
echo 'max-jobs = auto' | sudo tee --append /etc/nix/nix.conf   # Use multi-threads
```

## Learning Nix

https://nixos.org/manual/nix/stable/expressions/language-values.html

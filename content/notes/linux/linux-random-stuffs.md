---
title: "Random Stuffs"
slug: "linux-random"
created: 2022-09-02 12:00 AM
---

<h1>{{ $frontmatter.title }}</h1>

## Process Monitoring (/usr/bin/time)

`time` is a shell builtin which measures time taken by a process to complete its execution, its implementation depends on type of shell you're using.

We're **not talking about that time** here, we're talking about literally `/usr/bin/time` command (binary). It can be invoked as:
* `/usr/bin/time <cmd>`
* `eval $(which time) <cmd>`
* `command time <cmd>`

in order to skip any time builtin present in the shell and run the possibly hidden time command in the system.

Its a very useful resource monitor. In the man page, its general format is described as:
```ruby
%Uuser %Ssystem %Eelapsed %PCPU (%Xtext+%Ddata %Mmax)k
%Iinputs+%Ooutputs (%Fmajor+%Rminor)pagefaults %Wswaps
```

It looks very cryptic, but what it really is:
```
TIME CPU (MEMORY_USAGE)
I/O (DISK_ACCESS + SHARED_MEMORY_ACCESS) DISK_WRITE_AS_MEMORY
```

There's a [very good article explaining PageFaults & Swaps](https://scoutapm.com/blog/understanding-page-faults-and-memory-swap-in-outs-when-should-you-worry), in case you want to read more about them.


## Advertising Linux as a Audio Sinking Device

```bash
bluetoothctl
[...]# power on
[...]# advertise.name FW
[...]# advertise on

# A few yes here
```

Note that these commands donot work from outside (in non-interactive mode).


## Running & Chrooting into cross-architecutre binaries

Install `qemu-user-static` and run [this script](https://github.com/Animeshz/scripts/tree/main/main/qemu-binfmt) as superuser:

```bash
sudo qemu-binfmt --register
```

*Note: This script needs to be ran again after every reboot, so making it run at startup is recommended.*

## Preparing a void root in subdirectory (with/without xbps)

If you have xbps available, you can simply set `$XBPS_TARGET_ARCH` and specify `-r subdir` to install packages in that subdirectory.

```bash
XBPS_TARGET_ARCH=x86_64-musl xbps-install -r subdir -iR https://repo-default.voidlinux.org/current/musl -S base-files dash xbps
```

In case of non-void system, you can even bootstrap a small void-root without xbps. Create awk and bash script as follows, and run the bash script.

```bash
# FILE: /xbps-deps-extract.awk
BEGIN {
    FS = "[<>]"
    OFS = " "
}

function descend(node) {
    if (isarray(map[node]["run_depends"])) for (dep in map[node]["run_depends"]) {
        if (match(dep, /^([^&=]+)(&gt;|&lt;)?(=|-)[0-9]/, depname)) {
            descend(depname[1])
        }
    }
    if (!uniq[node]++) print map[node]["filename-sha256"], map[node]["pkgver"]
}

/^\t<key>/ { pkg = $3 }
/^\t\t<key>/ { field = $3; getline; if ($3 != "") map[pkg][field] = $3; }
/^\t\t\t<.*>$/ { map[pkg][field][$3] }

END {
    descend(FOR)
}

# FILE: /xbps-bootstrap
#!/usr/bin/env bash
set -e  # Exit immediately if any part of script fails

if [[ $EUID -ne 0 ]]; then
  >&2 echo "This script must be run as root"
  exit 1
fi


XBPS_MIRROR='https://mirrors.dotsrc.org/voidlinux/current/musl'
XBPS_TARGET_ARCH='x86_64-musl'

CURRENT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
TMP_DIR=/var/run/pun/initial_setup
BUILD_CACHE_DIR=/pun/build_cache


mkdir -p ${TMP_DIR}
mkdir -p ${BUILD_CACHE_DIR}
pushd ${TMP_DIR} >/dev/null

wget -cq --show-progress "${XBPS_MIRROR}/${XBPS_TARGET_ARCH}-repodata"
tar xf "${XBPS_TARGET_ARCH}-repodata"

install_pkg() {
  awk -v FOR="$1" -f "${CURRENT_DIR}/xbps-deps-extract.awk" index.plist > install-deps.txt

  # I know not the best way: terminal output becomes clogged as multiple writes to stdout
  while read checksum pkgver; do
    filename="${pkgver}.${XBPS_TARGET_ARCH}.xbps"
    wget -cq --show-progress "${XBPS_MIRROR}/${filename}" && printf '%s %s\n' "$checksum" "$filename" | sha256sum --check >/dev/null &
  done < install-deps.txt
  wait

  pushd ${BUILD_CACHE_DIR} >/dev/null
  while read checksum pkgver; do
    filename="${pkgver}.${XBPS_TARGET_ARCH}.xbps"
    tar xf "${TMP_DIR}/$filename" ./INSTALL 2>/dev/null || true
    [[ -x INSTALL ]] && ./INSTALL pre
    tar xf "${TMP_DIR}/$filename" --exclude-from <(printf './%s\n' 'REMOVE' 'INSTALL' 'props.plist' 'files.plist')
    [[ -x INSTALL ]] && ./INSTALL post
    rm ${BUILD_CACHE_DIR}/INSTALL 2>/dev/null || true
  done < ${TMP_DIR}/install-deps.txt
  popd >/dev/null
}

for pkg in base-files dash xbps; do
  install_pkg $pkg
done

popd >/dev/null
```

Now you should be able to run the commands present in subdir in an isolated environment (subdir as its root) via chroot:

```bash
sudo chroot subdir dash
sudo chroot subdir xbps-install --help
```

Be sure to read [Running binaries in seperate root](/blogs/working-with-binaries.html#let-s-go) to make them work without chroot.

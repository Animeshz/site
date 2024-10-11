---
title: "BinFmt: The hidden secret of runtime execution"
description: "A kernel feature that nobody talks about."
created: 2024-10-10 11:40 PM
image: /blogs/binfmt/cover.jpg
tags: ["linux", "demystifying", "low-level"]
---

# {{ $frontmatter.title }}

You know how a binary runs? Yes, a runtime (ld-linux)!

![Runtime](/blogs/binfmt/runtime.jpg)

You know what comes before runtime? Yes, a compilation process!

```bash
$ zig cc -o main main.c
```

And what about in between? Oh well...

## One of most misunderstood concept

Back in the days, when I was introduced to docker or somewhere around that time, I got to know about this thing called
as binfmt_misc.

I was trying to make the raspberry pi a personal build server to compile x86 code (somewhat transparently) because I
puffed my laptop's cooling fans (which btw is still puffed, except that I can now compile binaries without heating
because I disabled cpu turbo via auto-cpufreq, and really at 100% cpu without fans the laptop just runs fine, never goes
beyond 70-72C).

So, back to where we were, yes, binfmt_misc, this allowed me to run arm compiled binary in my laptop, and x86 binary in
raspberry pi. Woah, that's too much, I know, let's go back a little and instead of theory, go by a practical example!

## Running Arm binary transparently in x86 CPU

Ever wondered if you can do

```bash
$ ./my-favourite-arm-program
```

on your present laptop that's not arm?

How cool is it?

### Install and register qemu

I'm surprised the setup is just a set of basic steps, yet docs are so frustratingly bad around it.

I have automated it in a [script](https://github.com/Animeshz/scripts/raw/main/main/qemu-binfmt), you may also read it
if you like.

```bash
$ sudo xbps-install qemu-user-static
$ wget https://github.com/Animeshz/scripts/raw/main/main/qemu-binfmt && chmod +x qemu-binfmt
$ ./qemu-binfmt --register
```

This script ad-hoc mounts the `binfmt_misc` filesystem, for persistence you may wanna add the following to your `/etc/fstab`.

```bash
none  /proc/sys/fs/binfmt_misc binfmt_misc defaults 0 0
```

### Voila, run non-architectural binaries

```bash
# Note: zig cc does not support static linking in *-gnu ABI
$ zig cc -o main main.c -target aarch64-linux-musl
# OR aarch64-linux-gnu-gcc -static main.c -o main
# OR aarch64-linux-musl-gcc -static main.c -o main

$ file ./main
./main: ELF 64-bit LSB executable, ARM aarch64, version 1 (SYSV), statically linked, with debug_info, not stripped

$ ./main
Hello World
```

## A note on dynamically linked binaries

Without passing `-static` in gcc, or targeting `*-gnu` in zig cc compiler, output binary is dynamically linked:

```bash
$ zig cc -o main main.c -target aarch64-linux-gnu
# OR aarch64-linux-gnu-gcc main.c -o main

$ file ./main
./main: ELF 64-bit LSB executable, ARM aarch64, version 1 (SYSV), dynamically linked, interpreter /lib/ld-linux-aarch64.so.1, for GNU/Linux 2.0.0, with debug_info, not stripped
```

You'll notice it requires interpreter at `/lib/ld-linux-aarch64.so.1`. And actually most other binaries are generally
dynamically linked.

Running it directly will result in:

```bash
$ ./main
qemu-aarch64-static: Could not open '/lib/ld-linux-aarch64.so.1': No such file or directory
```

In that case, there are 2 options

- If you have a chroot, run in that (chroot with binfmt works flawlessly).
- Install libc of that architecture separately (see below).

You'll need libc for particular architecture and need to pass `-L` to qemu binary (`qemu-aarch64`), or with binfmt case,
you can just set env variable `QEMU_LD_PREFIX` while running.

```bash
$ sudo xbps-install cross-aarch64-linux-gnu-libc
$ QEMU_LD_PREFIX=/usr/aarch64-linux-gnu ./main

```

## Misc Info

### Run jar directly

You don't need to type `java` or `java -jar` in front of jar files every damn time.

```bash
$ ./my-program.jar
# OR
$ ./MyJava.class
```

is enough!

See [[ArchWiki] Binfmt Misc for Java](https://wiki.archlinux.org/title/Binfmt_misc_for_Java).

### That's also how WSL runs .exe

This is exactly how inside of WSL (Windows Subsystem for Linux), you can execute a windows executable (.exe) from a bash
shell, running inside actual emulated linux kernel.

```bash
clip.exe < file.txt
```

### Chrooting into Raspberry Pi

```bash
# mount raspberry pi at /mnt/rpi
sudo mount /dev/sda2 /mnt/rpi -o rw,uid=(id -u),gid=(id -g)

sudo chroot /mnt/rpi
```

You can perform

- apt update
- install extra packages
- or test a service

before even booting first time, and what not?



## Further reading

Running cross-arch binaries was one usecase, running jars as showed earlier is another, you may make
e.g. `./screenshot-xxx.jpg` launch a image viewer.

See

- [binfmt_misc - Kernel SysAdmin Docs](https://docs.kernel.org/admin-guide/binfmt-misc.html)
- [binfmt_misc - RedHat Docs](https://docs.kernel.org/admin-guide/binfmt-misc.html)
- Zig made cross-compilation of C/C++ easy (https://zig.guide/working-with-c/zig-cc).
- [Qemu userspace emulation (debian)](https://ughe.github.io/2018/07/19/qemu-aarch64) - although don't follow the
  troubleshooting steps they're not safe (use `QEMU_LD_PREFIX` instead).


Backlinks:

- r/linux | r/voidlinux
- Linkedin

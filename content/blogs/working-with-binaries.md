---
title: "Working with Binaries"
description: "Running system-incompatible binaries"
created: 2022-09-26 12:00 AM
tags: ["low-level"]
draft: true
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

![Cover Image](/blogs/working-with-binaries/cover.jpg)

I really struggled first when I was introduced to cross-compilation in C. It was when I tried to compile a C as a library (.so/.dll) for exposing a few functionality to JVM/NodeJS in my keyboard-mouse-kt project.

It was really troublesome to see that cross-compilers don't exist in alpine repositories and only a few selected ones are on debian. So I literally made my own docker image with my own build of [cross-compilers](https://github.com/Animeshz/mainstream-cross-compilers). It was fun! And I still refer to them.

I've been tinkering with binaries ever since then, like for example [setuid to gain superuser without sudo](https://www.youtube.com/watch?v=EJtUW2AklVs&list=PLI_rLWXMqpSkAYfar0HRA7lykydwmRY_2&index=2) and stuffs like that.

And today I found something very interesting, and its not on exploitation, but could be something very useful for something like multiple-version package installation by putting them into directory of their own, see below.


## Running binaries in seperate root (even linked against musl libc in glibc environment)

### Abstract

For new ones, libc is something that exposes functionalities like `printf` and similar so that you can interface with the world outside the very basic primitives processor defines like add or subtract.

There are many libc implementations, in Windows there's one standard `msvcrt.dll` (generally referred to as MSVC), in Linux there are two implementations: glibc (33MB, from GNU) and musl (4MB, by Rich Felker). The other one is trying to replace the former which has legacy garbage.

> FunFact: MinGW (even though uses gnu-gcc compilers) links with msvcrt and not glibc.

### Let's go

I've recently tried to unify multiple package managers and had to deal with many edge-cases while trying to reduce the system modification while installation yet giving binary/fonts/config access to the user, there could've been many ways, symlinking, bind-mounts, overlayfs/aufs, fusefs like the one bedrock-linux do, etc. Even though any of them would've worked, there was one major problem, the packages from big repositories are made for libraries present in `/usr/lib` and against system libc/interpreter.

Once you have prepared a sepearte root (e.g. of musl based linux) say in `/another_root` (explained in [Linux/RandomStuffs](/notes/linux/linux-random-stuffs#process-monitoring-usr-bin-time)), the way we execute binaries in seperate root is either by `chroot`ing, or by:

```bash
LD_LIBRARY_PATH=/another_root/usr/lib /another_root/usr/lib/ld-musl-x86_64.so.1 /another_root/usr/bin/<binary>
```

Bla bla bla, too much to modify.

Fortunately there's [NixOS/patchelf](https://github.com/NixOS/patchelf) available which exactly modifies binaries search path and interpreter. So the following will replace all absolute path symlink, the libc interpreter, and the library search path for that particular executable.

```bash
fd -tl . /another_root | xargs -I{} sudo sh -c 'lnk=$(readlink {} | grep "^/") && ln -sf /another_root$lnk {}'
fd -tx . /another_root/usr/bin | xargs -I{} sudo sh -c 'file {} | grep ELF > /dev/null && echo {}' | xargs -I{} sudo -E sh -c 'ip=$(patchelf --print-interpreter {} 2>/dev/null) && patchelf --set-interpreter /another_root$ip {}'
fd -tx . /another_root/usr/bin | xargs -I{} sudo sh -c 'file {} | grep ELF > /dev/null && echo {}' | xargs -I{} sudo -E sh -c 'patchelf --set-rpath /another_root/usr/lib {}'
```

Now the musl executables should work, and those programs may be able to access the host glibc-system executables too.

```bash
# both of these work!!!
/usr/bin/ls
/another_root/usr/bin/ls  # This one may even correspond to musl linked executable!

# musl executable calling glibc-system executable, and it works too!
/another_root/usr/bin/dash -c /usr/bin/ls
```

This means that you can easily add these executables in your `$PATH` without any modification to `$LD_LIBRARY_PATH` and other stuffs that could've previously even break your system e.g. with version-mismatch if there were two glibc versions. They'll now work as expected (that easily).

<MultiplexAd />

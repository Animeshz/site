+++
title = "Random Stuffs"
slug = "linux-random"
date = "2022-08-10T14:14:08+05:30"
updated = "2022-08-10T14:14:08+05:30"
+++

## Process Monitoring (/usr/bin/time)

`time` is a shell builtin which measures time taken by a process to complete its execution, its implementation depends on type of shell you're using.

We're **not talking about that time** here, we're talking about literally `/usr/bin/time` command (binary). It can be invoked as:
* `/usr/bin/time <cmd>`
* `eval $(which time) <cmd>`
* `command time <cmd>`

in order to skip any time builtin present in the shell and run the possibly hidden time command in the system.

Its a very useful resource monitor. In the man page, its general format is described as:
```
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

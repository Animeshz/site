---
title: "CLI Tools"
slug: "cli-tools"
---

# {{ $frontmatter.title }}

## Awk

`awk <action> <inputfile>` OR `some-command | awk <action>`

**Action Syntax:**

```awk
BEGIN {...}

# Each condition is ran for each line before going to the next line
CONDITION {...}
CONDITION {...}
...

END {...}
```

1. Newline & spaces doesn't matter.
2. Empty `CONDITION` is a `1` (non-zero, true).
3. Only `CONDITION` without a block is equivalent to `CONDITION {print}` that is futher equivalent to `CONDITION {print $0}`, $0 is variable that contains current line.

e.g. `awk '' filename`

**TODO:** Add more

## VSCode Keybinds

```lua
Ctrl+b    Toggle left panel
```

---
title: "Rust"
slug: "rust"
---

# {{ $frontmatter.title }}

## Optimizing release builds

Set the following optimization options in `Cargo.toml` for optimizing for release builds (`cargo build --release`).

```toml
[profile.release]
codegen-units = 1
opt-level = 3
strip = true
lto = true
```
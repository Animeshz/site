---
title: "Mono-Repos to the Rescue: Organizing and Archiving Old GitHub Projects"
description: "Declutterring the GitHub Profile"
created: 2024-03-14 02:10 PM
image: /blogs/mono-repos-archiving-github-projects/poster-full.png
tags: ["git", "github", "version-control"]
---

# Mono-Repos to the Rescue: Organizing and Archiving Old GitHub Projects

Has your number of GitHub repos increased over time? And they all seem strong point of reference and you don't want to
delete them? Let's dive into mono-repos for their safe and sound archival!

![Poster](/blogs/mono-repos-archiving-github-projects/poster.png)

## Mono Repos

Mono Repos are not a direct component in version control systems like git by itself, rahter its just a concept of
merging together multiple repositories into a single one for grouping them together, and they're getting popular now a
days after a long time.

![Example](/blogs/mono-repos-archiving-github-projects/example.png)

I've recently moved most of my repositories that were either doing nothing (either prototypes or not-in-use or are just
old) into a the public mono-repository [Animeshz/archives-public](https://github.com/Animeshz/archives-public) and a
private one named archives-private.

## Goals

Since mono repos are not a direct concept in git, a lot of guides or articles shows different ways of achieving this,
and some are not good enough because saying something a mono repo can also be done by just copy pasting the repository
and deleting its `.git` folder, which in my opinion loses a lot of information about it.

So I do have some design goals while doing it, namely,

* All the commits should be preserved as-is, with dates and authors.
* The commits should be easily identifyable to which repository it belonged.
* The repositories that will go into the mono-repo should have a designated directory of residence and should not clog
  other files and folders.

## The approach

I've gone through many approaches ranging from `git rebase`, `git filter-branch`, `git env-filter` and many more, which
I'll link in the end if you want to have a read, but I'll quickly wrap my approach and compare it with other
approaches.

First of all, creating a repository which will be our mono-repo, with [https://github.new](github.new), and cloning it as usual,

```bash
git clone https://github.com/Animeshz/archives-public
```

Then each repository that has to be archived, we clone it with the specific branch,

```bash
git clone https://github.com/<user>/<repository-name> --branch <branch-name>
cd <repository-name>
```

First, we'll make its history linear so that we can export the whole branch as patch with `git format-patch` later
on. We'll do this by removing the merge diamond, that is created by canonical merges [see my previous
article](/blogs/using-git-for-effective-collaboration.html#situations-on-merge), which can be done by rebase.

This can be done by `git rebase` which will rewrite the history by applying commit one after another chronologically,

```bash
git rebase --root -X theirs
git merge --ff $(git commit-tree remotes/origin/${BRANCH:-HEAD}^{tree} -m "Fix after making history linear" -p HEAD)
```

The `-X theirs` accepts the merger branch's changes as `git merge` happens to do to keep the merge diamond, and then
make a merge commit which accounts for the conflict resolution, here we do something similar, we accept theirs and then
whatever delta we see from the rebase completion to the original state of the repository were, we apply it with a fast
forward merge. Effectively making our history linear.

![Rebase Demo](/blogs/mono-repos-archiving-github-projects/rebase-demo.png)

Now, we can proceed with our main logic, rewriting history such that the whole repo is contained in a directory as well
as renaming commits such that they're identifyable to be part of current repo,

We can do this by `git filter-branch` and `git env-filter`, but `git filter-branch` when ran, itself suggests the use of
[newren/git-filter-repo](https://github.com/newren/git-filter-repo). So we'll go with suggested method.

```bash
nix profile install nixpkgs#git-filter-repo  # or by your package-manager

NAME=<repo-name>
git filter-repo --replace-message <(echo "regex:^==>[$NAME] ") --path-rename :"$NAME"/
```

This should move all the files into subdirectory going by name `$NAME` rewriting the commit history, also prefixing each
commit message by `[$NAME] `.

::: warning
While almost all the inbuilt git commands allows you reverting changes, this command repacks the git objects and garbage
collect immediately, thus loosing the ability to go back with `git reflog`, if you don't want this behavior you can pass
`--partial` to not garbage collect in the end.<br>See
[docs](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html) for
more info.
:::

For instance for repo named `overengineered-pastebin`, something like this will happen:

```
$ git log --format=fuller -p
...
commit 3520a5c93bb65103f23532d4d37ffcc33c727587
Author:     Animesh Sahu <animeshsahu19@yahoo.com>
AuthorDate: Fri Nov 4 12:03:22 2022 +0530
Commit:     Animesh Sahu <animeshsahu19@yahoo.com>
CommitDate: Fri Nov 4 12:03:22 2022 +0530

    [overengineered-pastebin] Your commit message

diff --git a/overengineered-pastebin/frontend/src/components/LanguageSelektor.vue b/overengineered-pastebin/frontend/src/components/LanguageSelektor.vue
...
```

Now the only thing remaining to do is to export the commits and import them into our mono-repo,

```bash
git format-patch -k --no-stat --stdout --root HEAD > my.patch

cd /path/to/archives-public/
git am -k -3 --committer-date-is-author-date --empty=drop "/path/to/archiving/repo/my.patch"
```

This should super-impose the new repo contained in a designated directory by previous commands with the mono-repo by
applying the commits from the repo that is to be archived.

## Final Script

I've turned this into an interactive script by using [charmbracelet/gum](https://github.com/charmbracelet/gum).

```bash
#!/bin/bash

MONOREPO="$(realpath "$1")"
REPO="$(gum input --placeholder "Repository URL")"
BRANCH="$(gum input --placeholder "Branch (empty for default)")"
NAME="$(gum input --placeholder "Custom name of subrepo")"

NAME="${NAME:-${REPO##*/}}"
NAME="${NAME%.git}"
options=""

if [[ -n "$BRANCH" ]]; then
    options+="-b $BRANCH"
fi

[[ -d "/tmp/$NAME" ]] && gum confirm "Delete directory /tmp/$NAME (already exists)" && rm -rf "/tmp/$NAME"
git clone $options "$REPO" "/tmp/$NAME"
cd "/tmp/$NAME"

git rebase --root -X theirs
git merge --ff $(git commit-tree remotes/origin/${BRANCH:-HEAD}^{tree} -m "Fix after making history linear" -p HEAD)

git filter-repo --replace-message <(echo "regex:^==>[$NAME] ") --path-rename :"$NAME"/ -f

git format-patch -k --no-stat --stdout --root HEAD > my.patch

cd $MONOREPO && git am -k -3 --committer-date-is-author-date --empty=drop "/tmp/$NAME/my.patch"

gum confirm "Delete cloned repo" && rm -rf /tmp/$NAME
```

## Conclusion

I've crunched down 110+ repositories on my github profile into bare 26, splitting them into archives-public and
archives-private, removing stale forks in between as well. This let me clean up the profile for an ergonomic view into
it.

![Repo Final](/blogs/mono-repos-archiving-github-projects/repo-ss.jpg)

## References

1. Rebase way of doing it (way too slow),
    - https://stackoverflow.com/a/73314321/11377112
    - https://stackoverflow.com/a/69551810/11377112
    ```bash
    git -c rebase.instructionFormat='%s%nexec GIT_COMMITTER_DATE="%cD" GIT_AUTHOR_DATE="%aD" git commit --amend -m "bhao bhao: $(git show -s --format=%%s)"' rebase -i --root
    ```
2. Manual patching with sed
    - https://medium.com/@TimHolzherr/how-to-move-your-git-repository-into-a-monorepo-without-loosing-its-history-9b9d2da27155
3. Using `git filter-branch`
    - https://leyanlo.medium.com/how-to-move-one-git-repository-into-a-subdirectory-of-another-with-rebase-2b297b628c57.
4. Git filter-repo manual
    - https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html

## Further Reading

Backlinks

- [r/github](https://www.reddit.com/r/github/comments/1bei6h6/monorepos_to_the_rescue_organizing_and_archiving)
- [HN](https://news.ycombinator.com/item?id=39702247)
- [LinkedIn](https://www.linkedin.com/posts/animeshz_mono-repos-to-the-rescue-organizing-and-activity-7173990964946956288-0lQg)

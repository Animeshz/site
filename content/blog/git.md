---
title: "Git - Your best friend"
slug: "git"
---

# {{ $frontmatter.title }}

Git is a robust tool, to manage your complex to complex workflows. It was primarily made for managing the Linux Kernel (by Linus Torvalds itself) which today recieves and accepts over 8.5 changes/hour.

There are various use-cases of git:

* It helps you to parallely work on different parts of a single project.
* Stop working on one feature for a bit, work on another and resume later, etc.
* Keep history of a software safe, revert to any point if needed.

and many more.


## Installation

On Unix systems (Linux/Mac) git should most probably be pre-installed, on Windows follow the [installation-instructions](https://git-scm.com/download/win).

Once installed, open your favourite terminal, and run:

```bash
git config --global user.name <your-name>
git config --global user.email <your-email>  # should match the one in your github/gitlab
```

You don't need to have github/gitlab account yet, just make sure to put the email that you'd be using for github/gitlab.


## Get Started

### Create/Clone a git repository

Now open your favourite terminal in any directory (possibly empty), and run:

```bash
# Creates a new repository
git init

# Clone an existing repository from web
git clone https://github.com/Animeshz/site && cd site
```

This will initialize a git repository, namely a `.git` folder would've created in that directory.

### Your First Commit

Commits record changes in a git repository.

Create any file and write anything. And now run:

```bash
git status  # you should see that it reports you created a new file

git add .
git commit -m 'My First Commit'

git log     # yay! you committed for the first time
```

This creates a commit in the repository you just initialized a moment earlier.


## Concept of Remotes

A git repository, can be moved to/from any other locations, just as you see above that you can clone repository over https.

A **remote** is simply any path or url, you wish to publish your repostitory to.

```bash
git remote                          # lists all remotes
git remote add <name> <path-or-url> # adds a remote
git remote remove <name>            # removes a remote

# misc stuffs
git remote get-url <name>
git remote set-url <name> <path-or-url>
```

If you've cloned a repository you would automatically have a remote named `origin` added up pointing to the url you used to clone the repository.

### Hosting to Github/Gitlab

[Github](https://github.com) and [Gitlab](https://gitlab.com) are two **most popular free-to-use git repository** hosting services. To host your repository there, simply create a free account and head over to [github.com/new](https://github.com/new) or [gitlab.com/projects/new](https://gitlab.com/projects/new) to create your repository.

These services have stopped authentication using passwords, so in order to push something you also have to create either [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) or [SSH Key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh). Creating a SSH key is quite overwhelming initially, so I'd recommend creating a PAT.

Then add a remote to the repository url:

```bash
# PAT
git remote add origin https://<user>:<PAT>@github.com/<user>/<repository>

# SSH
git remote add origin https://github.com/<user>/<repository>
```

### Hosting to local path

You don't need Github/Gitlab to keep your work safe, **for instance if you work to freelance/privately** you can still use git and keep your changes safe in a HDD.

```bash
cd /path/to/HDD && mkdir repo-destination && cd repo-destination
git init --bare

cd /path/to/your/repo
git remote add origin /path/to/HDD/repo-destination
```

### Pushing Changes

Now you'd be able to push your commits by running:

```bash
git push
```

**Note:** You may need to run `git push -u origin main` in case you're pushing for the first time.


## Contributing to Others Repository

### Forks

Used to create a copy of repository in your account within github/gitlab.

There's a fork button in top of repository, tap to fork it! **You can only make changes in your account. If you want to contribute to others, you'd need to first fork it to your account make changes and then send a PR.**

![Fork Btn](https://docs.github.com/assets/cb-23088/images/help/repository/fork_button.png)

### Pull

Used to update local repository to sync with any remote.

```bash
git remote add upstream <fork\'s original url>
git pull upstream main
```

**Note:** If you already made some changes in your local copy of repository you may need to run `git pull --rebase upstream main` instead.

### Branches

Used to work on different parts of the project parallely.

```bash
git branch    # list out all branches in current repository
git checkout -b <name>  # creates and switches to branch <name>
git checkout <name>     # switches to branch <name>
```

`main` is the name of default branch, and you were working on the main branch since then.

### Merge

Used to merge one branch into another (done by project maintainers).

Parallel work are merged into one by using merge!

```bash
# pulls the changes from <branch-name> and merge into current branch
git merge <branch>
git merge <remote>/<branch>
```

**MergeConflicts:** Refer to the [Advanced Merging](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging) to know about it, or understand how to resolve it.

### PR/MR

PullRequest (AKA MergeRequest) are used to make the upstream project maintainer know that you're trying to contribute to his/her repository. He/She may accept your PR/MR, ask more changes, or reject it.

To create a PR, head over to github/gitlab's upstream repository, append `/pulls` to the url and click `New pull request`

### Issues

Generally look for issues, or create them first if you see any undesired behavior in the project or any potential feature is missing. Then try to solve them and send a PR. Issues are present in any repository by appending `/issues` at the url.


## Other Useful Stuffs

### Diff

Git's diff uses [Unix's Unified Diff Format](https://en.wikipedia.org/wiki/Diff#Unified_format) and are very useful to **review your changes before committing**.

```bash
git diff
git diff --staged  # if you ran 'git add .'
```

### Shallow Clone

```bash
# Clones only the latest 1 commit from the repository
git clone --depth=1 <url>

# Unshallow (in case you need full history later)
git fetch --unshallow
```

### Reverting

You can revert to any commit in the past by:

```bash
# Checkout commit leaving current branch in detached state
git checkout <commit-hash>

# Reset current branch to <commit-hash>
git reset --soft <commit-hash>
git reset --hard <commit-hash>  # overwrites untracked files too, riskier
```

A commit-hash look like `6b1328c` can be viewed using `git log`, and alternatively `HEAD~2` is fancy way of referring to 3rd last commit in current branch.

**Note: You don't need to know this if you know rebase (below).**

### Rebase (Chance to edit commits)

Ever happened you created commit at wrong stage, or named the commit wrong, or anything like that? Rebase is at your rescue.

```bash
git config --global core.editor code  # set default editor to vscode

git rebase -i HEAD~n   # n is number of commits you wanna open editor for
git rebase -i --root   # edit every single commit from root of the branch
```

Your preferred editor should pop up with the following looking contents:

```git-rebase
pick 611ca3b Changes 1
pick c399eb9 Changes 2
pick 76e2269 Changes 3

# Rebase 5c7e4cf..76e2269 onto 5c7e4cf (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.``
#
```

You can move the lines up/down to change the order of commit, or delete them to remove the commit from middle of the repository.

You can change the command (one letter as well as full-name is accepted), from `pick` to anything as listed. They're self-explainatory there.

### RefLog

Like `git log` but also shows every incident when the tip of the branch (HEAD) is changed (from rebase/pull/merge/etc). Useful to revert any risky operations which changed commit-history.

```bash
git reflog show
```

From the collected hash (looking like `5c7e4cf`) you can view the changes in that commit: `git show 5c7e4cf`.

### Stash

Another very useful feature of git is to stash your work temporarily, start working on other stuffs, and then come-back to where you were.

```bash
git add .
git stash push -m 'My first stash'

# work-tree should now be reset to last commit

git stash list
git stash pop 0     # apply and removes latest (0th) stash
git stash apply 0   # applies but doesn't remove latest (0th) stash
```


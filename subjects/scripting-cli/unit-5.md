# Unit 5 — Git & GitHub CLI Cheat Sheet

A concise, practical cheat sheet for distributed version control with **Git** and automation with the **GitHub CLI (`gh`)**.

---

## 1. Core Technical Definitions

> **Three Trees Architecture:** The 3 tiers of Git: Working Tree (local files on disk), Staging Area / Index (prepared commit snapshot), and Local Repo (`HEAD` committed history).
>
> **Merge vs Rebase:** `git merge` unites branches by creating an explicit merge commit node; `git rebase` rewrites history by replaying commits sequentially on top of the target base.
>
> **Detached HEAD:** State where `HEAD` points directly to a specific commit hash rather than a named local branch pointer.
>
> **Git Hooks:** Executable scripts located in `.git/hooks/` triggered automatically by Git events (e.g. `pre-commit`, `commit-msg`).

---

## 2. Setup & Identity Configuration

| Command | Purpose | Example |
|---|---|---|
| `git config --global user.name` | Set global username for commits | `git config --global user.name "Alice"` |
| `git config --global user.email` | Set global email address | `git config --global user.email "alice@example.com"` |
| `git config --global init.defaultBranch` | Set default main branch name | `git config --global init.defaultBranch main` |
| `git config --list --show-origin` | Display all configured settings and file origins | `git config --list` |
| `git init` | Initialize a new local Git repository | `git init my-app` |
| `git clone` | Clone an existing remote repository | `git clone https://github.com/org/repo.git` |

---

## 3. Staging & Daily Committing

| Command | Purpose | Example |
|---|---|---|
| `git status` | Show status of modified, staged, and untracked files | `git status -s` (short format) |
| `git add` | Stage specific file or all changed files | `git add src/index.js` or `git add -A` |
| `git commit -m` | Record staged changes into commit history | `git commit -m "feat(auth): add JWT login"` |
| `git commit --amend` | Modify last commit message or add staged files | `git commit --amend --no-edit` |
| `git restore` | Discard working tree changes (uncommitted edits) | `git restore file.js` |
| `git restore --staged` | Unstage a staged file without losing modifications | `git restore --staged file.js` |
| `git rm` | Remove file from working tree and stage removal | `git rm old_config.json` |

### Important options

```text
git status -s          → short status display (M = modified, A = added, ?? = untracked)
git add -p             → interactively review and stage individual hunks/chunks
git commit -am "msg"   → stage all tracked modified files and commit in one step
git commit --amend -m  → rewrite message of the most recent commit
```

---

## 4. Branching, Merging & Rebasing

| Command | Purpose | Example |
|---|---|---|
| `git switch -c` | Create and switch to a new branch | `git switch -c feature/payments` |
| `git switch` | Switch between existing local branches | `git switch main` |
| `git branch -a` | List all local and remote tracking branches | `git branch -a` |
| `git branch -d` | Safely delete a merged branch | `git branch -d feature/payments` |
| `git branch -D` | Force delete an unmerged branch | `git branch -D old-experiment` |
| `git merge` | Merge specified branch into current branch | `git merge feature/payments` |
| `git rebase` | Re-apply current commits on top of another branch | `git rebase main` |
| `git rebase -i` | Interactively squash, reorder, or edit commits | `git rebase -i HEAD~3` |

### Merge vs Rebase Quick Rule

```text
git merge  → creates an explicit merge commit; preserves complete historical context
git rebase → linearizes commit history; never rebase commits already pushed to public branches!
git merge --abort  /  git rebase --abort → safely cancel in-progress conflict resolution
```

---

## 5. History, Diffs & Inspection

| Command | Purpose | Example |
|---|---|---|
| `git log --oneline` | Compact one-line commit log | `git log --oneline -n 10` |
| `git log --graph` | Visual ASCII branching graph | `git log --oneline --graph --all` |
| `git diff` | Show unstaged differences in working directory | `git diff` |
| `git diff --staged` | Show staged differences ready to commit | `git diff --staged` |
| `git show` | Display details and diff of specific commit | `git show a1b2c3d` |
| `git blame` | Display author and commit for each line of a file | `git blame app.js -L 10,25` |

---

## 6. Undoing, Stashing & History Recovery

| Command | Purpose | Example |
|---|---|---|
| `git stash` | Temporarily shelve uncommitted dirty changes | `git stash push -m "wip refactor"` |
| `git stash pop` | Apply most recent stashed state and drop it from stash | `git stash pop` |
| `git stash list` | View all shelved stashes | `git stash list` |
| `git revert` | Create a new commit that safely inverts changes | `git revert <commit-hash>` |
| `git reset --soft` | Move HEAD back; keeps changes staged | `git reset --soft HEAD~1` |
| `git reset --hard` | Discard all commits and working edits (**destructive**) | `git reset --hard HEAD~1` |
| `git cherry-pick` | Apply specific commit from another branch | `git cherry-pick <commit-hash>` |
| `git reflog` | Safety net: view full history of all HEAD movements | `git reflog` |

---

## 7. Remote Synchronization

| Command | Purpose | Example |
|---|---|---|
| `git remote -v` | List all configured remote repository URLs | `git remote -v` |
| `git remote add` | Link a new remote server | `git remote add origin https://github.com/u/repo.git` |
| `git fetch` | Download remote objects/branches without merging | `git fetch origin` |
| `git pull` | Fetch and merge changes from remote tracking branch | `git pull origin main` |
| `git pull --rebase` | Fetch and rebase local commits on top of remote | `git pull --rebase origin main` |
| `git push` | Upload local commits to remote branch | `git push -u origin main` |
| `git push --tags` | Push all local tags to remote repository | `git push origin --tags` |

---

## 8. GitHub CLI (`gh`) Automation

| Command | Purpose | Example |
|---|---|---|
| `gh auth login` | Authenticate CLI with GitHub account | `gh auth login` |
| `gh repo clone` | Clone repository from GitHub | `gh repo clone owner/repo` |
| `gh repo create` | Create a new repository on GitHub | `gh repo create my-app --public --source=.` |
| `gh pr create` | Create a new Pull Request | `gh pr create --title "feat: auth" --body "Details" --draft` |
| `gh pr list` | List open Pull Requests | `gh pr list --state open` |
| `gh pr checkout` | Check out Pull Request branch locally | `gh pr checkout 42` |
| `gh pr merge` | Squash and merge PR directly from terminal | `gh pr merge 42 --squash --delete-branch` |
| `gh issue create` | File a new GitHub Issue | `gh issue create --title "Bug" --body "Description"` |
| `gh release create` | Publish a GitHub Release with auto-generated notes | `gh release create v1.0.0 --generate-notes` |
| `gh run list` | View status of GitHub Actions workflow runs | `gh run list` |

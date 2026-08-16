# Unit 9 — Package & Runtime CLIs Cheat Sheet

A minimal, practical reference for programming language package managers (**npm**, **pip**, **cargo**, **go**) and system package tools.

---

## 1. Core Technical Definitions

> **Package Manager:** Tool that resolves, downloads, compiles, and tracks external library dependencies for an application or OS.
>
> **Lockfile (`package-lock.json`, `poetry.lock`, `Cargo.lock`):** Pinned cryptographic snapshot guaranteeing exact dependency versions across environments.
>
> **Virtual Environment (`.venv`):** Isolated directory containing a dedicated language interpreter and site-packages, preventing dependency collision.
>
> **DevDependency:** Build, test, or lint tools required only during development, excluded from production artifact builds.

---

## 2. Node.js Ecosystem: `npm` / `pnpm` / `yarn` / `npx`

| Action | `npm` | `pnpm` | `yarn` |
|---|---|---|---|
| **Initialize Project** | `npm init -y` | `pnpm init` | `yarn init -y` |
| **Install All Dependencies** | `npm install` (or `npm ci`) | `pnpm install` | `yarn install` |
| **Add Production Package** | `npm install axios` | `pnpm add axios` | `yarn add axios` |
| **Add Dev Dependency** | `npm install -D typescript` | `pnpm add -D typescript` | `yarn add -D typescript` |
| **Update Packages** | `npm update` | `pnpm update` | `yarn upgrade` |
| **Uninstall Package** | `npm uninstall axios` | `pnpm remove axios` | `yarn remove axios` |
| **Run Script** | `npm run build` | `pnpm build` | `yarn build` |
| **Execute Remote Binary** | `npx create-vite@latest` | `pnpm dlx create-vite` | `yarn dlx create-vite` |
| **Clean Cache** | `npm cache clean --force` | `pnpm store prune` | `yarn cache clean` |

---

## 3. Python Ecosystem: `pip` / `venv` / `uv` / `poetry`

| Action | Standard `pip` + `venv` | Modern `uv` (Ultra-fast) | `poetry` |
|---|---|---|---|
| **Create Virtualenv** | `python -m venv .venv` | `uv venv` | `poetry env use python` |
| **Activate Virtualenv** | `source .venv/bin/activate` *(Linux/macOS)*<br>`.\.venv\Scripts\Activate.ps1` *(Windows)* | `source .venv/bin/activate` | `poetry shell` |
| **Install Package** | `pip install requests` | `uv pip install requests` | `poetry add requests` |
| **Install from Requirements** | `pip install -r requirements.txt` | `uv pip install -r reqs.txt` | `poetry install` |
| **Freeze Dependencies** | `pip freeze > requirements.txt` | `uv pip compile pyproject.toml`| `poetry lock` |
| **Uninstall Package** | `pip uninstall -y requests` | `uv pip uninstall requests` | `poetry remove requests` |

---

## 4. Rust Ecosystem: `cargo`

| Command | Purpose | Example |
|---|---|---|
| `cargo new` | Create a new binary or library crate | `cargo new my_app --bin` |
| `cargo build` | Compile current project in debug mode | `cargo build` |
| `cargo build --release` | Compile optimized production binary | `cargo build --release` |
| `cargo run` | Compile and run main binary | `cargo run -- --port 8080` |
| `cargo test` | Execute unit and integration tests | `cargo test` |
| `cargo check` | Fast syntax and type checking without code generation | `cargo check` |
| `cargo add` | Add crate dependency to `Cargo.toml` | `cargo add serde --features derive` |
| `cargo update` | Update dependencies within `Cargo.lock` | `cargo update` |
| `cargo clippy` | Run linter and static analysis checks | `cargo clippy` |

---

## 5. Go Toolchain: `go`

| Command | Purpose | Example |
|---|---|---|
| `go mod init` | Initialize a new Go module | `go mod init github.com/user/myapp` |
| `go get` | Download and add dependency module | `go get github.com/gin-gonic/gin` |
| `go mod tidy` | Add missing and remove unused modules | `go mod tidy` |
| `go run` | Compile and run Go source files on the fly | `go run main.go` |
| `go build` | Compile executable binary | `go build -o server main.go` |
| `go test` | Run tests across package directories | `go test -v ./...` |
| `go fmt` | Automatically format Go source code files | `go fmt ./...` |

---

## 6. System Package Managers Quick Reference

| System / OS | Package Manager | Install Example | Update Repository Index |
|---|---|---|---|
| **Windows** | `winget` | `winget install Git.Git` | `winget upgrade --all` |
| **macOS** | `brew` (Homebrew) | `brew install node` | `brew update && brew upgrade` |
| **Ubuntu / Debian** | `apt` | `sudo apt install -y curl` | `sudo apt update` |
| **Fedora / RHEL** | `dnf` | `sudo dnf install -y htop` | `sudo dnf check-update` |
| **Arch Linux** | `pacman` | `sudo pacman -S neovim` | `sudo pacman -Syu` |

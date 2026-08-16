# Unit 1 — CLI Fundamentals Cheat Sheet

A compact, practical reference for core command-line interface fundamentals across Linux, macOS, and Windows.

---

## 1. Core Technical Definitions

> **Standard Streams (I/O):** Pre-connected communication channels (`stdin`, `stdout`, `stderr`) initialized by the OS kernel for every running process.
>
> **Pipes vs Redirection:** Redirection (`>`, `<`) routes data between a command and disk files; Pipes (`|`) stream data in-memory directly between processes.
>
> **Exit Status Code:** An integer (`0` = success, `1`–`255` = error) returned by every terminated command to report execution state.
>
> **Environment Variables:** Dynamic key-value pairs stored in memory, defining runtime settings and automatically inherited by child processes.
>
> **PATH Resolution:** Semicolon/colon separated list of directories searched sequentially from left-to-right to find executable binaries.

---

## 2. Standard Streams (I/O)

| Stream Name | FD | Default Source / Sink | Description |
|---|---|---|---|
| **Standard Input (`stdin`)** | `0` | Keyboard / Stream | Input data fed into a command |
| **Standard Output (`stdout`)** | `1` | Terminal Display | Standard non-error output from command |
| **Standard Error (`stderr`)** | `2` | Terminal Display | Diagnostic and error messages from command |

---

## 3. Redirection Operators

### 3.1 Redirection Operators by Shell (Linux / macOS / Windows)

| Operator | Purpose | Linux / macOS Example | Windows CMD Example | PowerShell Example |
|---|---|---|---|---|
| `>` | Redirect stdout (overwrite) | `echo "hi" > file.txt` | `echo hi > file.txt` | `"hi" > file.txt` |
| `>>` | Redirect stdout (append) | `echo "log" >> app.log` | `echo log >> app.log` | `"log" >> app.log` |
| `<` | Redirect stdin from file | `mysql db < backup.sql` | `cmd < input.txt` | `Get-Content in.txt \| cmd` |
| `2>` | Redirect stderr (overwrite) | `make 2> errors.log` | `compile 2> err.log` | `compile 2> err.log` |
| `2>>` | Redirect stderr (append) | `app 2>> errors.log` | `app 2>> err.log` | `app 2>> err.log` |
| `2>&1` | Merge stderr into stdout | `cmd > all.log 2>&1` | `cmd > all.log 2>&1` | `cmd > all.log 2>&1` |
| `&>` | Redirect stdout & stderr | `cmd &> all.log` | `cmd > all.log 2>&1` | `cmd *> all.log` |
| Discard Output | Black hole / Null sink | `cmd > /dev/null 2>&1` | `cmd > NUL 2>&1` | `cmd \| Out-Null` |

### 3.2 Important Options & Redirection Patterns

```text
2> /dev/null   → silence all error output on Linux/macOS
> NUL 2>&1     → silence all output completely on Windows CMD
*> output.log  → redirect all 6 PowerShell streams (Output, Error, Warning, Verbose, Debug, Info)
<<< "string"   → herestring: pass direct string into stdin (Bash/Zsh)
<< 'EOF'       → heredoc: pass multi-line text block to stdin
```

---

## 4. Pipelines (`|`)

| Mechanism | Linux / macOS (POSIX) | Windows CMD | PowerShell Core |
|---|---|---|---|
| **Data Format** | Byte / Text stream | ASCII / ANSI Text stream | Strongly-typed .NET Objects |
| **Basic Pipe** | `cat log \| grep ERROR` | `type log \| find "ERROR"` | `Get-Content log \| Select-String "ERROR"` |
| **Pipe Both Streams** | `cmd \|& grep "fail"` | `cmd 2>&1 \| find "fail"` | `cmd 2>&1 \| Select-String "fail"` |
| **Count Lines** | `cat file \| wc -l` | `type file \| find /c /v ""` | `(Get-Content file).Count` |

---

## 5. Exit Codes & Conditional Chaining

| Operator | Meaning | Example | Behavior |
|---|---|---|---|
| `&&` | Logical AND | `build && deploy` | Runs right command ONLY if left command succeeds (Exit `0`) |
| `\|\|` | Logical OR | `test -f f \|\| touch f` | Runs right command ONLY if left command fails (Exit $\neq 0$) |
| `;` | Sequential | `mkdir d ; cd d` | Runs sequentially regardless of success or failure |
| `&` | Background (POSIX) | `python -m http.server &` | Runs command asynchronously in background subshell |

### 5.1 Inspecting Exit Status Codes

| Shell | Syntax | Success Value | Error Value |
|---|---|---|---|
| **Bash / Zsh (Linux/macOS)** | `echo $?` | `0` | `1` – `255` |
| **Windows CMD** | `echo %ERRORLEVEL%` | `0` | Non-zero |
| **PowerShell** | `$LASTEXITCODE` or `$?` | `0` (or `$true`) | Non-zero (or `$false`) |

---

## 6. Command Anatomy & Parameter Parsing

```text
command  -a  -b 20  --flag  --option=value  arg1  arg2
───┬───  ────┬────  ──────────────┬───────  ─────┬─────
Command  Short flags    Long options      Positional arguments
```

### 6.1 Argument Syntax Reference

| Component | Linux / macOS (POSIX / GNU) | Windows CMD | PowerShell |
|---|---|---|---|
| **Short Flags** | `-a`, `-la` (grouped) | `/a`, `/s`, `/q` | `-f`, `-v` |
| **Long Options** | `--all`, `--file=data.txt` | `/format:table` | `-Path "data.txt"` |
| **Positional Args** | `$1`, `$2`, `$3` | `%1`, `%2`, `%3` | `$args[0]`, `$param1` |
| **All Arguments** | `"$@"` or `"$*"` | `%*` | `$args` or `$PSBoundParameters` |
| **Argument Count** | `$#` | *(count in batch loop)* | `$args.Count` |
| **Script Name** | `$0` | `%0` | `$MyInvocation.MyCommand.Name` |

---

## 7. Variables & Quoting Mechanics

| Type | Linux / macOS (Bash/Zsh) | Windows CMD | PowerShell |
|---|---|---|---|
| **Set Local Variable** | `VAR="hello"` | `set VAR=hello` | `$Var = "hello"` |
| **Access Variable** | `$VAR` or `${VAR}` | `%VAR%` | `$Var` |
| **Single Quotes `'...'`** | Literal (no expansion) | Treated as regular text | Literal (no expansion) |
| **Double Quotes `"..."`** | Interpolates `$VAR`, `$(cmd)` | Expands `%VAR%` | Interpolates `$Var`, `$($cmd)` |
| **Command Substitution** | `DATE=$(date +%F)` | `for /f %%i in ('date /t') do...` | `$Date = (Get-Date)` |
| **Environment Variable** | `export PORT=8080` | `setx PORT "8080"` | `$env:PORT = "8080"` |
| **Path Variable** | `$PATH` (colon separated) | `%PATH%` (semicolon separated) | `$env:PATH` |

---

## 8. Fundamental Cross-Platform Cheat Sheet

| Task | Linux / macOS (Bash/Zsh) | Windows CMD | Windows PowerShell |
|---|---|---|---|
| **Print text** | `echo "Hello"` | `echo Hello` | `Write-Host "Hello"` |
| **Current directory** | `pwd` | `cd` | `Get-Location` (`pwd`, `gl`) |
| **List directory** | `ls -la` | `dir /a` | `Get-ChildItem -Force` (`gci`, `ls`) |
| **Clear screen** | `clear` (`Ctrl+L`) | `cls` | `Clear-Host` (`cls`, `clear`) |
| **Read stdin prompt** | `read -p "Name: " val` | `set /p val="Name: "` | `$val = Read-Host "Name"` |
| **Locate executable** | `which node` / `type -a node` | `where node` | `Get-Command node` |
| **Print all env vars** | `env` / `printenv` | `set` | `Get-ChildItem env:` |
| **Sleep / Pause** | `sleep 5` | `timeout /t 5` | `Start-Sleep -Seconds 5` |

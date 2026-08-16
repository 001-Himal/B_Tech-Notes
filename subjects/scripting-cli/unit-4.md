# Unit 4 — Shell Scripting: Bash & PowerShell Cheat Sheet

A concise, side-by-side practical cheat sheet for shell scripting, control structures, error handling, and automation across **Bash** and **PowerShell**.

---

## 1. Core Technical Definitions

> **Shebang (`#!`):** The first line in a Unix script pointing to the absolute path of the interpreter binary (e.g. `#!/usr/bin/env bash`).
>
> **Strict Mode (`set -euo pipefail`):** Bash mode causing scripts to fail fast on errors (`-e`), unset variables (`-u`), and pipeline crashes (`-o pipefail`).
>
> **Variable Scoping (`local` / `param`):** Enforces local variable lifetime within functions to prevent mutating global shell state.
>
> **Exit Trap (`trap` / `finally`):** Guaranteed cleanup handlers invoked on script exit, interruption, or termination signal.

---

## 2. Script Headers & Execution Setup

| Aspect | Bash (`.sh`) | PowerShell (`.ps1`) |
|---|---|---|
| **Header Line** | `#!/usr/bin/env bash` | `<# Script Metadata / Parameters #>` |
| **Strict Error Mode** | `set -euo pipefail` | `$ErrorActionPreference = "Stop"` |
| **Make Executable** | `chmod +x script.sh` | File permissions / Unrestricted execution policy |
| **Execution Permission** | `./script.sh` | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| **Run Script** | `./script.sh` or `bash script.sh` | `pwsh ./script.ps1` or `.\script.ps1` |

---

## 3. Variables & Data Structures Side-by-Side

| Feature | Bash Syntax | PowerShell Syntax |
|---|---|---|
| **Define Variable** | `NAME="Alice"` (no spaces around `=`) | `$Name = "Alice"` |
| **Access Variable** | `"$NAME"` or `"${NAME}"` | `$Name` |
| **Readonly / Constant** | `readonly PORT=8080` | `Set-Variable -Name PORT -Value 8080 -Option ReadOnly` |
| **Integer Arithmetic** | `COUNT=$(( 10 + 5 ))` | `$Count = 10 + 5` |
| **Array Creation** | `ITEMS=("one" "two" "three")` | `$Items = @("one", "two", "three")` |
| **Array Access** | `${ITEMS[0]}` (length: `${#ITEMS[@]}`) | `$Items[0]` (length: `$Items.Count`) |
| **Append to Array** | `ITEMS+=("four")` | `$Items += "four"` |
| **Hash Table / Map** | `declare -A MAP=( [k]="v" )` | `$Map = @{ "k" = "v"; "host" = "127.0.0.1" }` |
| **Access Map Value** | `${MAP[k]}` | `$Map["k"]` or `$Map.host` |

---

## 4. Conditionals & Operators

### Comparison Operators

| Comparison | Bash (Numeric / String) | PowerShell |
|---|---|---|
| **Equal** | `-eq` / `==` | `-eq` |
| **Not Equal** | `-ne` / `!=` | `-ne` |
| **Greater / Greater Equal** | `-gt` / `-ge` | `-gt` / `-ge` |
| **Less / Less Equal** | `-lt` / `-le` | `-lt` / `-le` |
| **String Empty / Non-Empty** | `-z "$s"` / `-n "$s"` | `[string]::IsNullOrEmpty($s)` |
| **Regex Match** | `[[ "$s" =~ ^[0-9]+$ ]]` | `$s -match "^\d+$"` |
| **File Exists / Is File** | `[[ -e "$f" ]]` / `[[ -f "$f" ]]` | `Test-Path -PathType Leaf "$f"` |
| **Directory Exists** | `[[ -d "$d" ]]` | `Test-Path -PathType Container "$d"` |

### If-Else Statements

```bash
# Bash:
if [[ $CPU -ge 90 ]]; then
    echo "Critical: $CPU%"
elif [[ $CPU -ge 75 ]]; then
    echo "Warning: $CPU%"
else
    echo "OK: $CPU%"
fi
```

```powershell
# PowerShell:
if ($CPU -ge 90) {
    Write-Warning "Critical: $CPU%"
} elseif ($CPU -ge 75) {
    Write-Warning "Warning: $CPU%"
} else {
    Write-Host "OK: $CPU%" -ForegroundColor Green
}
```

### Switch Statements

```bash
# Bash:
case "$ROLE" in
    "web") echo "Nginx" ;;
    "db")  echo "PostgreSQL" ;;
    *)     echo "Default" ;;
esac
```

```powershell
# PowerShell:
switch ($Role) {
    "web"   { "Nginx" }
    "db"    { "PostgreSQL" }
    Default { "Default" }
}
```

---

## 5. Loops & Iteration

### For Loops

```bash
# Bash (List):
for server in "web01" "web02" "db01"; do
    echo "Pinging $server..."
done

# Bash (Range):
for ((i=1; i<=5; i++)); do echo "Step $i"; done
```

```powershell
# PowerShell (List):
foreach ($server in @("web01", "web02", "db01")) {
    Write-Host "Pinging $server..."
}

# PowerShell (Range):
1..5 | ForEach-Object { Write-Host "Step $_" }
```

### Reading Files Line by Line

```bash
# Bash (Safe line reader):
while IFS= read -r line; do
    echo "Line: $line"
done < "data.txt"
```

```powershell
# PowerShell:
Get-Content "data.txt" | ForEach-Object {
    Write-Host "Line: $_"
}
```

---

## 6. Functions & Parameter Handling

### Bash Functions

```bash
log_event() {
    local LEVEL="$1"
    local MSG="$2"
    echo "[$(date +%T)] [$LEVEL] $MSG"
}

# Invocation:
log_event "INFO" "Application started."
```

### PowerShell Functions

```powershell
function Write-LogEvent {
    param(
        [Parameter(Mandatory=$true)]
        [ValidateSet("INFO", "WARN", "ERROR")]
        [string]$Level,

        [Parameter(Mandatory=$true)]
        [string]$Message
    )
    $Timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$Timestamp] [$Level] $Message"
}

# Invocation:
Write-LogEvent -Level "INFO" -Message "Application started."
```

---

## 7. Error Handling & Trap Mechanics

### Bash Traps & Exit Handling

```bash
#!/usr/bin/env bash
set -euo pipefail

# Cleanup temp files on exit:
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"; echo "[Done] Cleaned temp files."' EXIT

# Catch errors with line numbers:
trap 'echo "Error on line $LINENO. Exit code: $?" >&2' ERR
```

### PowerShell Try / Catch / Finally

```powershell
$ErrorActionPreference = "Stop"

try {
    $Data = Get-Content "C:\missing_file.json"
} catch [System.IO.FileNotFoundException] {
    Write-Error "File not found: $_"
} catch {
    Write-Error "Unexpected failure: $($_.Exception.Message)"
} finally {
    Write-Host "Routine finished cleanup."
}
```

---

## 8. Production Automation Boilerplate Templates

### Bash Template

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-./output}"

main() {
    echo "🚀 Starting automated process..."
    mkdir -p "$TARGET_DIR"
    echo "✅ Task completed successfully."
}

main "$@"
```

### PowerShell Template

```powershell
[CmdletBinding()]
param(
    [string]$TargetDir = "$env:TEMP\Output"
)

$ErrorActionPreference = "Stop"

function Main {
    Write-Host "🚀 Starting automated process..." -ForegroundColor Cyan
    if (!(Test-Path $TargetDir)) { New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null }
    Write-Host "✅ Task completed successfully." -ForegroundColor Green
}

Main
```

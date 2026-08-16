# Unit 2 — Windows CLI & PowerShell Cheat Sheet

A concise, practical cheat sheet covering Windows Command Prompt (`cmd.exe`), PowerShell (`pwsh`), syntax tables, essential options, and scripting automation.

---

## 1. Core Technical Definitions

> **CMD vs PowerShell:** CMD streams plain ASCII text between processes; PowerShell passes live, strongly-typed .NET objects through the pipeline preserving properties and methods.
>
> **Execution Policy:** Windows security barrier (e.g. `Restricted`, `RemoteSigned`, `Unrestricted`) controlling whether `.ps1` scripts can be executed.
>
> **Cmdlet (`Verb-Noun`):** Standard PowerShell commands (e.g. `Get-Process`, `Set-Location`) that output structured .NET objects.
>
> **Environment Drive (`$env:`):** Built-in PowerShell virtual drive allowing direct read/write access to OS environment variables.

---

## 2. Navigation & Directory Management

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `cd` / `chdir` | Change directory | `cd Documents` |
| `dir` | List files and folders in directory | `dir` |
| `tree` | Graphically display directory structure | `tree /f` |
| `mkdir` / `md` | Create new directory | `mkdir projects` |
| `rmdir` / `rd` | Remove / delete directory | `rmdir /s /q old_folder` |
| `pushd` | Store current directory and navigate to path | `pushd C:\Logs` |
| `popd` | Return to directory saved by `pushd` | `popd` |
| `cls` | Clear terminal screen | `cls` |

### Important options

```text
cd ..         → move up one directory level
cd \          → jump to root of current drive
cd /d D:\docs → switch drive and directory simultaneously
dir /a        → show all files including hidden/system
dir /b        → bare format (names only, no headers/summaries)
dir /s        → list files recursively in subdirectories
dir /o:n      → sort by name (/o:s size, /o:d date)
tree /f       → show files in each folder as well as tree
rmdir /s /q   → remove directory tree silently (without confirmation)
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Set-Location` (`cd`, `chdir`, `sl`) | Change active working directory | `Set-Location Documents` |
| `Get-ChildItem` (`dir`, `ls`, `gci`) | List directory contents or registry keys | `Get-ChildItem -Recurse` |
| `New-Item` (`mkdir`, `md`, `ni`) | Create a new directory | `New-Item -ItemType Directory -Name "projects"` |
| `Remove-Item` (`rmdir`, `rd`, `ri`, `rm`) | Delete directory and subfolders | `Remove-Item -Recurse -Force ./old_folder` |
| `Push-Location` (`pushd`) | Push directory onto navigation stack | `Push-Location C:\Logs` |
| `Pop-Location` (`popd`) | Pop directory from navigation stack | `Pop-Location` |
| `Clear-Host` (`cls`, `clear`) | Clear the PowerShell console screen | `Clear-Host` |

---

## 3. File Management

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `copy` | Copy one or more files | `copy file.txt backup.txt` |
| `xcopy` | Copy files and directory trees | `xcopy C:\src D:\dst /e /h /y` |
| `robocopy` | Robust file and folder mirror/copy | `robocopy C:\data D:\backup /mir /z` |
| `move` | Move or rename files and directories | `move data.txt C:\archive\` |
| `ren` / `rename` | Rename a file or directory | `ren old.txt new.txt` |
| `del` / `erase` | Delete one or more files | `del /f /q temp.txt` |
| `type` | Display contents of a text file | `type config.json` |

### Important options

```text
copy /y          → overwrite destination without prompt
copy a.txt+b.txt → concatenate multiple files into one
xcopy /e /i /y   → copy all subfolders (including empty) silently
robocopy /mir    → mirror directory tree (deletes files in dest not in src)
robocopy /z      → resume copy in case of network interruption
del /f /q /s     → force delete matching files in subdirectories silently
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Copy-Item` (`cp`, `copy`, `cpi`) | Copy files and directory hierarchies | `Copy-Item report.pdf C:\Backup\` |
| `Move-Item` (`mv`, `move`, `mi`) | Move or rename files and folders | `Move-Item log.txt C:\Logs\` |
| `Rename-Item` (`ren`, `rni`) | Rename an existing file or directory | `Rename-Item file.txt newfile.txt` |
| `Remove-Item` (`rm`, `del`, `ri`) | Delete files matching wildcard pattern | `Remove-Item -Force *.tmp` |
| `Get-Content` (`cat`, `type`, `gc`) | Read and stream text file contents | `Get-Content server.log -Tail 20` |

---

## 4. Search & Text

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `find` | Search for a basic text string in files | `find /i "error" app.log` |
| `findstr` | Search for regular expression patterns in files | `findstr /s /i /n "CRITICAL" *.log` |
| `more` | Display output one screen at a time | `type large.txt \| more` |
| `sort` | Sort lines of text input | `sort names.txt /o sorted.txt` |
| `fc` | Compare two files and display differences | `fc /n file1.txt file2.txt` |

### Important options

```text
find /i      → case-insensitive text search
find /v      → invert search (display lines NOT matching string)
find /c      → count number of matching lines
findstr /s   → search matching files in current and all subdirectories
findstr /n   → print line numbers before matched text
findstr /r   → interpret search string as regular expression
fc /b        → perform binary byte-by-byte comparison
fc /n        → display line numbers on differences in text mode
sort /r      → sort lines in reverse alphabetical order
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Select-String` (`sls`) | Search for patterns in files (grep equivalent) | `Select-String -Pattern "ERROR" -Path *.log` |
| `Sort-Object` (`sort`) | Sort pipeline objects by property | `Get-Content names.txt \| Sort-Object -Descending` |
| `Compare-Object` (`diff`) | Compare two sets of objects or file contents | `Compare-Object (Get-Content f1.txt) (Get-Content f2.txt)` |
| `Out-Host -Paging` | Display paged output one screen at a time | `Get-Content large.txt \| Out-Host -Paging` |

---

## 5. System Information

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `systeminfo` | Display detailed OS and hardware configuration | `systeminfo` |
| `hostname` | Display current computer name | `hostname` |
| `ver` | Display Windows OS version | `ver` |
| `whoami` | Display current logged-in username | `whoami` |
| `winver` | Open GUI popup showing Windows version & build | `winver` |
| `driverquery` | Display list of installed hardware drivers | `driverquery /v /fo table` |

### Important options

```text
systeminfo /fo csv   → output system information in CSV format
systeminfo /s remote → query system information of a remote machine
whoami /user         → display username and unique Security ID (SID)
whoami /groups       → display security group memberships
whoami /priv         → display current security privileges and rights
driverquery /v       → verbose driver list showing file paths and states
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Get-ComputerInfo` (`gin`) | Query comprehensive OS and hardware specs | `Get-ComputerInfo` |
| `Get-CimInstance Win32_OperatingSystem` | Query OS version and build metadata | `Get-CimInstance Win32_OperatingSystem \| Select-Object Caption, Version` |
| `Get-WindowsDriver` | List installed system and third-party drivers | `Get-WindowsDriver -Online -All` |
| `$env:COMPUTERNAME` | Return computer name from environment | `$env:COMPUTERNAME` |

---

## 6. Processes & Tasks

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `tasklist` | Display all currently running processes | `tasklist` |
| `taskkill` | Terminate process by PID or image name | `taskkill /im notepad.exe /f` |
| `start` | Launch a program, file, or URL in a new window | `start https://google.com` |
| `timeout` | Pause batch execution for specified seconds | `timeout /t 10 /nobreak` |
| `waitfor` | Send or wait for a signal across a network | `waitfor /s remote_pc build_done` |

### Important options

```text
tasklist /v                  → display verbose process info (CPU, window title)
tasklist /svc                → list Windows services hosted inside each process
tasklist /fi "MEMUSAGE gt 50000" → filter processes using > 50 MB RAM
taskkill /pid 1234 /f        → force terminate process by Process ID
taskkill /im node.exe /f /t  → force kill process and all child processes spawned
timeout /t 5 /nobreak        → pause 5s ignoring user keyboard presses
start "" "C:\App.exe"        → launch detached application process
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Get-Process` (`ps`, `gps`) | Inspect active processes and resource stats | `Get-Process \| Where-Object { $_.CPU -gt 10 }` |
| `Stop-Process` (`kill`, `spps`) | Force terminate a running process | `Stop-Process -Name notepad -Force` |
| `Start-Process` (`saps`, `start`) | Launch executable with parameters | `Start-Process notepad.exe -ArgumentList "file.txt"` |
| `Start-Sleep` (`sleep`) | Suspend script execution for seconds | `Start-Sleep -Seconds 10` |

---

## 7. Users & Permissions

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `net user` | Manage local user accounts | `net user alice P@ss123 /add` |
| `net localgroup` | Manage local user security groups | `net localgroup Administrators alice /add` |
| `net accounts` | View or configure password and logon policies | `net accounts /minpwlen:8` |
| `icacls` | Display and modify NTFS Access Control Lists | `icacls "C:\data" /grant Alice:(OI)(CI)F` |
| `runas` | Run a program under credentials of another user | `runas /user:Administrator cmd.exe` |
| `whoami` | Display active user identity and privileges | `whoami /all` |

### Important options

```text
net user <user> /delete         → remove user account
net user <user> /active:yes     → enable a disabled account
net user <user> *               → prompt securely to reset password
icacls <dir> /grant User:(OI)(CI)F → grant Full Control with folder/container inheritance
icacls <dir> /deny User:(OI)(CI)W  → deny write permissions
icacls <dir> /reset /t          → reset permissions to default inherited recursively
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Get-LocalUser` / `New-LocalUser` | Create and manage local Windows users | `New-LocalUser -Name "Alice" -NoPassword` |
| `Get-LocalGroup` / `Add-LocalGroupMember` | Add user account to security group | `Add-LocalGroupMember -Group "Administrators" -Member "Alice"` |
| `Get-Acl` / `Set-Acl` | Inspect and configure NTFS permissions | `Get-Acl -Path "C:\Data" \| Format-List` |

---

## 8. Networking

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `ipconfig` | Display and manage IP address and adapter config | `ipconfig /all` |
| `ping` | Test network connectivity to host via ICMP | `ping 8.8.8.8` |
| `tracert` | Trace packet route and hop latency to destination | `tracert google.com` |
| `pathping` | Trace route with per-hop packet loss statistics | `pathping 1.1.1.1` |
| `nslookup` | Query DNS records for domain names / IP addresses | `nslookup github.com` |
| `netstat` | Display active TCP/UDP ports and connections | `netstat -ano` |
| `arp` | View and modify ARP IP-to-MAC resolution table | `arp -a` |
| `route` | View and modify local IP routing table | `route print` |
| `curl` | Transfer data to/from server via HTTP/HTTPS/FTP | `curl -I https://example.com` |
| `ssh` | Connect to remote system via OpenSSH client | `ssh user@192.168.1.50` |

### Important options

```text
ipconfig /flushdns  → flush and purge DNS resolver cache
ipconfig /release   → release current DHCP IP address
ipconfig /renew     → request new IP address from DHCP server
ping -t <host>      → ping continuously until interrupted with Ctrl+C
ping -n 4 -l 64     → send 4 packets with 64-byte payload size
tracert -d <host>   → trace route without performing DNS lookups on IPs
netstat -ano        → show all connections (-a), numbers (-n), and PID (-o)
netstat -b          → show executable name responsible for socket (Admin)
route print         → list active IPv4 and IPv6 network routes
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Get-NetIPConfiguration` (`gip`) | Inspect network adapters and IP config | `Get-NetIPConfiguration` |
| `Test-NetConnection` (`tnc`) | Test TCP port connectivity and ICMP ping | `Test-NetConnection google.com -Port 443` |
| `Resolve-DnsName` | Query DNS servers for record resolution | `Resolve-DnsName github.com` |
| `Get-NetTCPConnection` | List active TCP sockets and owning PIDs | `Get-NetTCPConnection -State Listen` |
| `Invoke-WebRequest` (`iwr`) | Send HTTP/HTTPS requests (curl equivalent) | `Invoke-WebRequest -Uri https://api.github.com` |

---

## 9. Disk & Storage

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `diskpart` | Interactive command-line disk partition manager | `diskpart` |
| `chkdsk` | Check disk volume for filesystem and physical errors | `chkdsk C: /f /r` |
| `fsutil` | Manage NTFS filesystem parameters and volume health | `fsutil volume diskfree C:` |
| `format` | Format a storage disk or volume | `format D: /fs:NTFS /q /v:Backup` |
| `label` | Create, change, or delete volume label of a disk | `label D: DataDrive` |
| `vol` | Display volume label and serial number | `vol C:` |
| `defrag` | Analyze and defragment / trim disk drives | `defrag C: /u /v` |
| `compact` | Display or configure NTFS file compression on disk | `compact /c /s:C:\Logs` |

### Important options

```text
chkdsk C: /f       → fix filesystem errors on disk
chkdsk C: /r       → locate bad sectors and recover readable data (implies /f)
fsutil dirty query → check if volume dirty bit is set (needs chkdsk)
format D: /fs:exFAT /q → format quickly using exFAT filesystem
defrag C: /o       → perform optimal defrag/trim for media type (SSD/HDD)
compact /c /s /i   → compress directory and subdirectories, ignoring errors
compact /u /s      → uncompress directory and all subfolders
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Get-Volume` / `Get-Disk` | Query storage volumes and physical disks | `Get-Volume` |
| `Repair-Volume` | Scan and repair filesystem errors | `Repair-Volume -DriveLetter C -Scan` |
| `Format-Volume` | Format disk volume with filesystem | `Format-Volume -DriveLetter D -FileSystem NTFS -Quick` |
| `Optimize-Volume` (`defrag`) | Defragment HDD or TRIM SSD storage | `Optimize-Volume -DriveLetter C -Defrag -Verbose` |

---

## 10. Services

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `sc` | Comprehensive service controller utility | `sc query state= all` |
| `net start` | List all running services or start a service | `net start wuauserv` |
| `net stop` | Stop an active running service | `net stop wuauserv` |
| `net pause` | Pause an active service that supports pausing | `net pause Spooler` |
| `net continue` | Resume a paused service | `net continue Spooler` |

### Important options

```text
sc query <svc>               → query current running state of service
sc qc <svc>                  → query configuration (startup type, binary path)
sc config <svc> start= auto  → set startup type (note: space after '=' is REQUIRED)
sc config <svc> start= disabled → disable service startup
sc create <name> binPath= "C:\svc.exe" → install new Windows service
sc delete <svc>              → permanently remove service from registry
```

### PowerShell equivalents

| PowerShell Cmdlet / Alias | Purpose | Example |
|---|---|---|
| `Get-Service` (`gsv`) | List services matching pattern | `Get-Service -Name *sql*` |
| `Start-Service` (`sasv`) | Start one or more stopped services | `Start-Service -Name Spooler` |
| `Stop-Service` (`spsv`) | Terminate a running service | `Stop-Service -Name Spooler -Force` |
| `Restart-Service` | Stop and restart service instance | `Restart-Service -Name wuauserv` |
| `Set-Service` | Configure service startup type | `Set-Service -Name Spooler -StartupType Automatic` |

---

## 11. Environment & Variables

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `set` | Display, create, or modify session environment variables | `set PORT=8080` |
| `echo` | Print text or variable values to terminal | `echo %USERPROFILE%` |
| `setx` | Create or update permanent environment variables | `setx PATH "%PATH%;C:\bin"` |
| `where` | Locate and display path of executable binaries in PATH | `where python` |

### Important options & built-in variables

```text
set                    → display all current session environment variables
set /a VAR=10+5        → evaluate numerical arithmetic expression
set VAR=               → delete variable from current session
setx VAR "val"         → save variable permanently in Current User registry
setx VAR "val" /m      → save variable permanently in System-wide registry (Admin)
where /r C:\ *.exe     → recursively search drive for executable file
```

### Common Built-in Variables

```text
%PATH%        → semicolon-separated list of executable search paths
%TEMP% / %TMP% → path to user temporary directory
%USERPROFILE% → current user home path (C:\Users\<user>)
%APPDATA%     → roaming application data directory
%SYSTEMROOT%  → Windows system directory (C:\Windows)
%COMPUTERNAME%→ NetBIOS name of local computer
```

### PowerShell equivalents

| PowerShell Cmdlet / Syntax | Purpose | Example |
|---|---|---|
| `$env:<NAME> = "val"` | Set session environment variable | `$env:PORT = 8080` |
| `[Environment]::SetEnvironmentVariable()` | Set permanent environment variable in registry | `[Environment]::SetEnvironmentVariable("API", "key", "User")` |
| `Get-ChildItem env:` | List all session environment variables | `Get-ChildItem env:` |
| `Get-Command` / `where.exe` | Locate binary file location in PATH | `Get-Command git` |

---

## 12. Archives & Compression

### Windows CMD

| Command | Purpose | Example |
|---|---|---|
| `tar` | Archive and compress files (Native in Windows 10+) | `tar -czvf backup.tar.gz ./data` |

### Important options

```text
tar -czvf archive.tar.gz folder\  → create compressed gzip tar archive with verbose log
tar -xzvf archive.tar.gz -C out\  → extract gzip tar archive to destination folder
tar -tvf archive.tar.gz           → list files inside archive without extracting
tar -cf archive.zip folder\       → create standard zip archive
tar -xf archive.zip -C out\       → extract zip archive
```

### PowerShell equivalents

| PowerShell Cmdlet | Purpose | Example |
|---|---|---|
| `Compress-Archive` | Create compressed ZIP archive | `Compress-Archive -Path .\logs\* -DestinationPath .\logs.zip -Force` |
| `Expand-Archive` | Extract ZIP archive to folder | `Expand-Archive -Path .\logs.zip -DestinationPath .\extracted -Force` |

---

## 13. Package Management (`winget`)

### Windows CLI

| Command | Purpose | Example |
|---|---|---|
| `winget search` | Search for packages across online repositories | `winget search git` |
| `winget install` | Install specified package by ID or name | `winget install Git.Git` |
| `winget list` | List all installed packages and versions | `winget list` |
| `winget upgrade` | List or perform package updates | `winget upgrade --all` |
| `winget uninstall` | Uninstall an installed application package | `winget uninstall Git.Git` |
| `winget show` | Display detailed package metadata and info | `winget show Microsoft.PowerToys` |

### Important options

```text
winget install <id> --silent              → install silently in the background
winget install <id> --exact               → match exact package ID
winget install <id> --accept-source-agreements --accept-package-agreements → bypass prompts
winget upgrade --all --include-unknown    → upgrade all installed software
winget export -o packages.json            → export installed packages list to JSON
winget import -i packages.json            → batch install packages from JSON manifest
```

---

## 14. PowerShell Core

### PowerShell Cmdlets

| PowerShell Cmdlet (Aliases) | Purpose | Example |
|---|---|---|
| `Get-Command` (`gcm`) | Find cmdlets, functions, and executables | `Get-Command *-Service` |
| `Get-Help` (`help`, `man`) | Display documentation and examples | `Get-Help Get-Process -Examples` |
| `Get-Member` (`gm`) | Inspect properties and methods of object | `Get-Process \| Get-Member` |
| `Get-ChildItem` (`dir`, `ls`, `gci`) | List items in directory or registry | `Get-ChildItem -Path C:\Logs -Recurse` |
| `Set-Location` (`cd`, `chdir`, `sl`) | Change current working directory | `Set-Location C:\Projects` |
| `Copy-Item` (`cp`, `copy`, `cpi`) | Copy file or directory tree | `Copy-Item src/ dst/ -Recurse` |
| `Move-Item` (`mv`, `move`, `mi`) | Move file or directory | `Move-Item old.log ./archive/` |
| `Rename-Item` (`ren`, `rni`) | Rename an existing item | `Rename-Item file.txt doc.txt` |
| `Remove-Item` (`rm`, `del`, `ri`) | Delete files or directories | `Remove-Item -Path ./temp -Recurse -Force` |
| `Where-Object` (`where`, `?`) | Filter pipeline objects by condition | `Get-Process \| Where-Object { $_.CPU -gt 10 }` |
| `Select-Object` (`select`) | Select specific properties or count | `Get-Process \| Select-Object Id, Name -First 5` |
| `ForEach-Object` (`foreach`, `%`) | Perform action on each pipeline item | `Get-Service \| ForEach-Object { $_.Name }` |
| `Sort-Object` (`sort`) | Sort objects by property values | `Get-Process \| Sort-Object CPU -Descending` |

### PowerShell Pipeline Patterns (`|`)

```powershell
# Filter & Select Pattern:
Get-Process | Where-Object { $_.WorkingSet64 -gt 100MB } | Select-Object Id, ProcessName, CPU

# Sort & Limit Pattern:
Get-ChildItem -Path C:\Logs -File | Sort-Object Length -Descending | Select-Object -First 10

# Foreach Pipeline Action Pattern:
Get-Service -Name "wuauserv", "Spooler" | ForEach-Object { Stop-Service -Name $_.Name -PassThru }
```

---

## 15. Scripting & Automation

### Batch Scripting (`.bat` / `.cmd`)

| Feature | Syntax | Example |
|---|---|---|
| **Header** | `@echo off` | Prevents printing each command line to screen |
| **Variables** | `set VAR=val` / `%VAR%` | `set PORT=8080` & `echo %PORT%` |
| **Arguments** | `%0` (script), `%1`..`%9`, `%*` (all) | `echo First arg: %1` |
| **Conditionals** | `if "%1"=="" ( ... ) else ( ... )` | `if exist "data.txt" ( del data.txt )` |
| **Exit Code Check** | `if %ERRORLEVEL% NEQ 0 ( ... )` | `if %ERRORLEVEL% EQU 0 ( echo Success )` |
| **Loops (Files)** | `for %%f in (*.txt) do ( ... )` | `for %%f in (*.log) do ( echo %%f )` |
| **Loops (Numbers)** | `for /L %%i in (start,step,end) do` | `for /L %%i in (1,1,5) do ( echo Count: %%i )` |

### PowerShell Scripting (`.ps1`)

| Feature | Syntax | Example |
|---|---|---|
| **Execution Policy** | Set script permission | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| **Variables** | `$Name = "val"` | `$LogPath = "C:\logs\app.log"` |
| **Conditionals** | `if (cond) { } elseif (cond) { } else { }` | `if ($CPU -ge 90) { Write-Warning "High CPU" }` |
| **Comparison** | `-eq`, `-ne`, `-gt`, `-ge`, `-lt`, `-le`, `-like` | `if ($status -eq "Running") { ... }` |
| **Switch** | `switch ($val) { "A" { } Default { } }` | `switch ($env) { "Prod" { ... } "Dev" { ... } }` |
| **Loops** | `foreach ($x in $list) { }` / `while () { }` | `foreach ($s in $services) { Get-Service $s }` |
| **Functions** | `function Name { param() ... }` | `function Ping-Host { param([string]$IP) Test-Connection $IP }` |
| **Error Handling** | `try { ... } catch { ... } finally { ... }` | `try { Get-Content "f.txt" -ErrorAction Stop } catch { Write-Error $_ }` |

---

## 16. CLI Utilities & Help

### Windows CLI

| Command / Utility | Purpose | Example |
|---|---|---|
| `<command> /?` | Display built-in help for any CMD command | `robocopy /?` |
| `help` | Display list of CMD commands or help for command | `help xcopy` |
| `where` | Locate binary file location in system PATH | `where python` |
| `Get-Help` | Display full PowerShell cmdlet documentation | `Get-Help Get-Service -Detailed` |
| `Get-Command` | Search and discover cmdlets, aliases, and functions | `Get-Command *Network*` |
| `Get-Alias` | Discover alias mappings for cmdlets | `Get-Alias -Definition Get-ChildItem` |
| `Get-Member` | Discover object properties, methods, and event signatures | `Get-Date \| Get-Member` |

### Important options

```text
<command> /?          → view command syntax, flags, and return codes in CMD
Get-Help <cmd> -Online   → launch official web documentation in browser
Get-Help <cmd> -Examples → show copy-paste ready practical examples only
Get-Help <cmd> -ShowWindow → open searchable help popup window
Get-Alias ls          → find underlying cmdlet mapped to alias 'ls' (Get-ChildItem)
Get-Command -Module * → list all commands provided by loaded modules
```

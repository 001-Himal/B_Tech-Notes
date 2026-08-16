# Unit 3 — Linux CLI & GNU Utilities Cheat Sheet

A minimal, practical reference for Linux Bash, GNU core utilities, system administration, and their Windows / PowerShell equivalents.

---

## 1. Core Technical Definitions

> **POSIX & Bash:** POSIX is the standard Unix API/CLI specification; Bash is the GNU Project's enhanced Bourne-Again SHell.
>
> **Inode:** Kernel data structure storing a file's metadata (size, owner, permissions, block pointers) excluding its name.
>
> **Process vs Thread / PID:** A Process is an isolated running program with its own memory space and unique integer PID; Threads share memory within the same process.
>
> **Systemd & Daemons:** Systemd is the Linux init system (PID 1) that spawns, monitors, and restarts background system services (daemons).

---

## 2. Navigation & Directory Management

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `pwd` | Print working directory path | `pwd` | `cd` / `Get-Location` |
| `cd` | Change directory | `cd /var/log` | `cd` / `Set-Location` |
| `ls` | List directory contents | `ls -lah` | `dir` / `Get-ChildItem` |
| `mkdir` | Create new directory | `mkdir -p src/utils` | `mkdir` / `New-Item` |
| `rmdir` | Remove empty directory | `rmdir old_dir` | `rmdir` / `Remove-Item` |
| `tree` | Tree view of directory hierarchy | `tree -L 2` | `tree /f` |

### Important options

```text
cd -         → toggle back to previous working directory
cd ~         → jump to current user's home directory ($HOME)
ls -lah      → long list (-l), all/hidden files (-a), human-readable sizes (-h)
ls -lt       → sort by modification time (newest first)
ls -lS       → sort by file size (largest first)
mkdir -p     → create parent directories as needed without error
```

---

## 3. File Operations & Viewing

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `touch` | Create empty file or update timestamp | `touch index.html` | `type NUL > file` / `New-Item` |
| `cp` | Copy files and directories | `cp -r src/ dist/` | `copy` / `Copy-Item` |
| `mv` | Move or rename file/folder | `mv old.txt new.txt` | `move` / `Move-Item` |
| `rm` | Remove / delete files and folders | `rm -rf ./temp` | `del` / `Remove-Item` |
| `cat` | Concatenate and display file content | `cat server.log` | `type` / `Get-Content` |
| `head` | Output the first N lines of file | `head -n 20 app.log` | `Get-Content -Head 20` |
| `tail` | Output the last N lines of file | `tail -n 20 app.log` | `Get-Content -Tail 20` |
| `ln` | Create hard or soft (symbolic) link | `ln -s /opt/bin/app /usr/bin/app` | `mklink` / `New-Item -ItemType SymbolicLink` |

### Important options

```text
cp -r        → recursively copy directories
cp -p        → preserve file attributes (timestamps, permissions)
rm -rf       → force recursive removal without prompting (destructive)
tail -f      → follow log file live in real-time as it updates
ln -s src dst→ create soft (symbolic) link
```

---

## 4. Search & Text Processing

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `grep` | Search text using regular expressions | `grep -rn "ERROR" /var/log/` | `findstr` / `Select-String` |
| `find` | Search files by name, size, type, or date | `find . -name "*.log" -mtime +7` | `where /r` / `Get-ChildItem -Filter` |
| `sed` | Stream editor for filtering and replacing text | `sed -i 's/foo/bar/g' file.txt` | `(gc f) -replace 'a','b' \| sc f` |
| `awk` | Pattern scanning and column slicing language | `awk '{print $1, $4}' access.log` | `Select-Object` |
| `cut` | Extract specific byte, character, or delimiter fields | `cut -d: -f1 /etc/passwd` | `Select-Object` |
| `sort` | Sort lines of text files | `sort -nr numbers.txt` | `sort` / `Sort-Object` |
| `uniq` | Report or omit repeated adjacent lines | `sort file.txt \| uniq -c` | `Sort-Object -Unique` |
| `wc` | Print newline, word, and byte counts | `wc -l access.log` | `(Get-Content f).Count` |
| `diff` | Compare files line by line | `diff -u old.conf new.conf` | `fc` / `Compare-Object` |

### Important options

```text
grep -i      → case-insensitive match
grep -v      → invert match (exclude matching lines)
grep -rnE    → recursive (-r), show line numbers (-n), extended regex (-E)
find . -type f -name "*.py" -exec chmod +x {} +  → find and run command on matches
sed -i       → edit file in-place (no backup)
awk -F:      → specify field separator (e.g. colon in /etc/passwd)
```

---

## 5. System Information & Resources

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `uname -a` | Print kernel version and system architecture | `uname -a` | `ver` / `systeminfo` |
| `hostnamectl` | Query and change system hostname | `hostnamectl status` | `hostname` |
| `lscpu` | Display CPU architecture details | `lscpu` | `Get-CimInstance Win32_Processor` |
| `free -h` | Display free and used memory in RAM | `free -h` | `Get-CimInstance Win32_OperatingSystem` |
| `df -h` | Display disk space usage of filesystems | `df -h` | `fsutil` / `Get-Volume` |
| `du -sh` | Estimate file/folder space usage | `du -sh /var/log/*` | `Get-ChildItem \| Measure-Object` |
| `uptime` | Show how long system has been running | `uptime -p` | `(Get-CimInstance Win32_OperatingSystem).LastBootUpTime` |
| `lsblk` | List block storage devices and partitions | `lsblk -f` | `diskpart` / `Get-Disk` |

---

## 6. Process & Job Control

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `ps aux` | Snapshot of all running processes | `ps aux \| grep nginx` | `tasklist` / `Get-Process` |
| `top` / `htop` | Interactive real-time process monitor | `htop` | `taskmgr` / `Get-Process` |
| `kill` | Send termination signal to PID | `kill -15 1420` | `taskkill /pid` / `Stop-Process` |
| `kill -9` | Force kill process (`SIGKILL`) | `kill -9 1420` | `taskkill /f /pid` |
| `killall` | Kill all processes matching program name | `killall node` | `taskkill /im` |
| `pkill` / `pgrep` | Signal or search processes by regex name | `pkill -f "python server.py"` | `Stop-Process -Name` |
| `jobs` | List active background jobs in shell | `jobs -l` | `Get-Job` |
| `bg` / `fg` | Resume job in background / foreground | `bg %1` / `fg %1` | `Receive-Job` |
| `nohup` | Run command immune to hangups / disconnects | `nohup ./run.sh &` | `Start-Process -NoNewWindow` |

---

## 7. Permissions & User Management

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `chmod` | Change file access permissions | `chmod 755 script.sh` | `icacls` |
| `chown` | Change file owner and group | `chown -R user:www-data /var/www` | `takeown` / `icacls` |
| `sudo` | Execute command as superuser / root | `sudo systemctl restart nginx` | `runas /user:Administrator` |
| `useradd` | Create a new user account | `sudo useradd -m -s /bin/bash alice` | `net user /add` |
| `usermod` | Modify user account / groups | `sudo usermod -aG sudo alice` | `net localgroup Administrators /add` |
| `passwd` | Update user's authentication password | `sudo passwd alice` | `net user alice *` |
| `id` / `whoami` | Print user and group IDs | `id` / `whoami` | `whoami /all` |

### Numeric Permissions Quick Reference

```text
4 = Read (r)  |  2 = Write (w)  |  1 = Execute (x)
755 → User: rwx (7) | Group: r-x (5) | Others: r-x (5)  (Standard binaries/dirs)
644 → User: rw- (6) | Group: r-- (4) | Others: r-- (4)  (Standard files)
600 → User: rw- (6) | Group: --- (0) | Others: --- (0)  (SSH private keys)
chmod +x file.sh → add execute permission
```

---

## 8. Networking & Connectivity

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `ip a` | Show all IP addresses and interfaces | `ip a` | `ipconfig /all` |
| `ip r` | Show IP routing table | `ip route` | `route print` |
| `ss` / `netstat` | Investigate sockets, ports, and connections | `ss -tuln` | `netstat -ano` |
| `ping` | Send ICMP ECHO_REQUEST to host | `ping -c 4 8.8.8.8` | `ping -n 4` |
| `traceroute` | Trace packet network route to destination | `traceroute google.com` | `tracert` |
| `dig` / `nslookup` | Query DNS name servers | `dig +short example.com` | `nslookup` / `Resolve-DnsName` |
| `curl` | Transfer data from/to HTTP/HTTPS servers | `curl -sSL https://get.docker.com` | `curl` / `Invoke-WebRequest` |
| `wget` | Non-interactive file downloader | `wget https://cdn.com/pkg.tar.gz` | `Invoke-WebRequest -OutFile` |
| `nc` (netcat) | Arbitrary TCP/UDP port listener / connector | `nc -zv 192.168.1.1 22` | `Test-NetConnection -Port` |

### Important options

```text
ss -tuln     → show listening (-l) TCP (-t) and UDP (-u) numeric ports (-n)
ss -tulnp    → show process name and PID owning the port (requires sudo)
curl -sSL    → silent (-s), follow redirects (-L), show errors (-S)
curl -I      → fetch HTTP headers only
```

---

## 9. Services & Systemd (`systemctl`)

| Command | Purpose | Example | Windows / PowerShell Equivalent |
|---|---|---|---|
| `systemctl start` | Start a system service | `sudo systemctl start nginx` | `net start` / `Start-Service` |
| `systemctl stop` | Stop a running service | `sudo systemctl stop nginx` | `net stop` / `Stop-Service` |
| `systemctl restart` | Restart service immediately | `sudo systemctl restart docker` | `Restart-Service` |
| `systemctl enable` | Enable service to start on boot | `sudo systemctl enable nginx` | `sc config start= auto` |
| `systemctl disable` | Prevent service starting on boot | `sudo systemctl disable nginx` | `sc config start= disabled` |
| `systemctl status` | View operational state and logs of service | `systemctl status postgresql` | `sc query` / `Get-Service` |
| `journalctl` | Query systemd event logs | `journalctl -u nginx -f` | Windows Event Viewer (`Get-WinEvent`) |

### Important options

```text
systemctl daemon-reload → reload systemd manager configuration after editing unit files
journalctl -u <svc> -n 50 --no-pager → view last 50 log lines for service
journalctl -f           → follow live kernel and system journal stream
```

---

## 10. Archives & Compression

| Command | Purpose | Example |
|---|---|---|
| `tar -czvf` | Create gzip compressed tarball (`.tar.gz`) | `tar -czvf archive.tar.gz ./src` |
| `tar -xzvf` | Extract gzip compressed tarball | `tar -xzvf archive.tar.gz -C /opt/` |
| `tar -tvf` | List contents of tar archive without extracting | `tar -tvf archive.tar.gz` |
| `tar -cjvf` | Create bzip2 compressed archive (`.tar.bz2`) | `tar -cjvf backup.tar.bz2 ./data` |
| `tar -xvf` | Auto-detect and extract archive (`.tar.*`) | `tar -xvf bundle.tar.xz` |
| `zip` / `unzip` | Create or extract standard ZIP archives | `zip -r data.zip folder/` & `unzip data.zip` |

---

## 11. Package Management Matrix

| Action | Debian / Ubuntu (`apt`) | RHEL / Fedora (`dnf`) | Arch Linux (`pacman`) |
|---|---|---|---|
| **Update Index** | `sudo apt update` | `sudo dnf check-update` | `sudo pacman -Sy` |
| **Install Package** | `sudo apt install -y pkg` | `sudo dnf install -y pkg` | `sudo pacman -S pkg` |
| **Remove Package** | `sudo apt remove pkg` | `sudo dnf remove pkg` | `sudo pacman -R pkg` |
| **Search Package** | `apt search keyword` | `dnf search keyword` | `pacman -Ss keyword` |
| **Upgrade System** | `sudo apt upgrade -y` | `sudo dnf upgrade -y` | `sudo pacman -Syu` |

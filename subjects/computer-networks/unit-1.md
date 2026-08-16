# Unit 1 — Introduction & Network Models

CSE306: Computer Networks — Unit I covers the complete foundation of computer networking: definitions, types, hardware, architecture, topologies, protocols, the OSI model, and the TCP/IP protocol suite.

---

## 1. Computer Networks

### What is a Computer Network?

A computer network is a collection of interconnected computers and other devices that communicate with each other to exchange data and share resources and services.

![Basic Computer Network Architecture](subjects/computer-networks/images/basic-network-diagram.jpg)

The computers can communicate because they are connected through networking devices (switches, routers) and use common communication protocols over physical or wireless links.

### Goals / Purposes of Computer Networks

> **1. Resource Sharing:** Allows multiple users to share expensive hardware resources such as printers, centralized storage arrays, internet gateways, and server compute.
>
> **2. Data Sharing:** Enables seamless exchange of files, database records, media streams, and collaborative workspaces.
>
> **3. Communication:** Real-time messaging, email, voice-over-IP (VoIP), and video conferencing.
>
> **4. Remote Access:** Employees and administrators can access internal applications and services securely from any location.
>
> **5. Centralized Management:** Organizations can enforce centralized authentication, security policies, backup routines, and software updates.
>
> **6. High Reliability & Redundancy:** Replicating files and services across multiple servers ensures high availability even if a single device fails.

---

## 2. Data Communication Basics

### What is Data Communication?

Data communication is the electronic transfer of data between two or more devices via a transmission medium.

```text
Sender ─────────[ Transmission Medium ]─────────→ Receiver
                    (Rule: Protocol)
```

For successful transmission, communicating nodes must follow standardized syntax and timing rules known as **protocols**.

![5 Components of Data Communication System](subjects/computer-networks/images/data-communication-components.jpg)

### Five Essential Components of Data Communication

| # | Component | Technical Role | Practical Example |
|---|---|---|---|
| **1** | **Sender** | Device that generates and initiates data transmission | Laptop, smartphone, IoT sensor |
| **2** | **Receiver** | Device designated to accept the incoming transmission | Web server, database host, printer |
| **3** | **Message** | Information payload being communicated | Binary file, HTTP request, video frame |
| **4** | **Transmission Medium** | Physical/wireless channel transporting signals | Twisted-pair Cat6, Fiber-optic, Wi-Fi radio waves |
| **5** | **Protocol** | Set of governing rules controlling data format, error check & timing | TCP/IP, HTTPS, IEEE 802.11 |

---

## 3. Communication Modes (Transmission Modes)

Communication mode defines the directional capability of data flow between two interconnected systems.

![Transmission Modes: Simplex, Half-Duplex, Full-Duplex](subjects/computer-networks/images/transmission-modes.jpg)

### Simplex Mode

Data travels strictly in **one direction** (unidirectional). The transmitter sends data; the receiver can only accept it with no mechanism to respond over the same channel.

```text
Sender [ A ] ──────────────────────────────────────────→ [ B ] Receiver
```

> **Examples:** Traditional keyboard to CPU, television broadcast, FM radio.

### Half-Duplex Mode

Data can travel in **both directions, but not simultaneously**. Each end can transmit or receive, but while one is transmitting, the other must listen.

```text
Sender / Receiver [ A ] ────────── (Time 1: →) ──────────→ [ B ] Receiver / Sender
Sender / Receiver [ A ] ←────────── (Time 2: ←) ────────── [ B ] Receiver / Sender
```

> **Examples:** Walkie-talkies (push-to-talk), legacy IEEE 802.3 shared-bus Ethernet with CSMA/CD.

### Full-Duplex Mode

Data travels in **both directions simultaneously**. Both communicating nodes can transmit and receive concurrently using separate physical channels or frequency division.

```text
Node [ A ] ⇄══════════════════════════════════════════════⇄ [ B ] Node
```

> **Examples:** Telephone call, modern switched Ethernet connections, bidirectional TCP socket connections.

### Transmission Modes Comparison

| Mode | Directionality | Simultaneous Tx/Rx? | Channel Efficiency | Practical Example |
|---|---|---|---|---|
| **Simplex** | Unidirectional ($A \to B$) | No | Low (one-way only) | Keyboard $\to$ Computer |
| **Half-Duplex** | Bidirectional ($A \rightleftarrows B$) | No (Alternating) | Moderate | Walkie-Talkie |
| **Full-Duplex** | Bidirectional ($A \rightleftarrows B$) | Yes (Simultaneous) | High (Full bandwidth) | Switched Ethernet, Phone Call |

---

## 4. Connection Types & Data Delivery

### Line Configuration: Point-to-Point vs Multipoint

![Point-to-Point Connection](subjects/computer-networks/images/point-to-point.jpg)

- **Point-to-Point:** A dedicated physical link between exactly two communicating devices. The entire bandwidth capacity of the channel is reserved exclusively for these two nodes (e.g. dedicated leased line between two core routers).

![Multipoint Connection Topology](subjects/computer-networks/images/multipoint-topology.jpg)

- **Multipoint (Multi-drop):** A single physical transmission medium is shared among three or more devices simultaneously (e.g. Wi-Fi airspace, legacy coax bus).

---

### Data Delivery Cast Modes: Unicast, Multicast & Broadcast

![Unicast vs Multicast vs Broadcast](subjects/computer-networks/images/unicast-multicast-broadcast.jpg)

| Mode | Addressing Scheme | Target Ratio | Practical Example |
|---|---|---|---|
| **Unicast** | Specific destination host IP/MAC | **$1 \to 1$** (One-to-One) | Loading a webpage via HTTPS (`192.168.1.10` $\to$ `93.184.216.34`) |
| **Multicast** | Class D multicast group IP (`224.0.0.0/4`) | **$1 \to \text{Group}$** (One-to-Many) | Live IPTV stream, Zoom video feed, OSPF router hellos |
| **Broadcast** | Broadcast address (`255.255.255.255` or subnet broadcast) | **$1 \to \text{All}$** (One-to-All) | ARP Request ("Who has IP `192.168.1.1`?"), DHCP Discover |

---

## 5. Types of Networks by Geographical Scale

Networks are classified based on the physical distance and geographic area they span.

![PAN, LAN, MAN, WAN Geographical Coverage](subjects/computer-networks/images/pan-lan-man-wan.jpg)

### 1. PAN — Personal Area Network
- **Coverage Range:** $\approx 1$ to 10 meters (centered around an individual).
- **Technologies:** Bluetooth (IEEE 802.15.1), Zigbee, USB, NFC.
- **Use Cases:** Connecting smartphone to smartwatch, wireless earbuds, or vehicle hands-free.

---

### 2. LAN — Local Area Network

![Local Area Network (LAN)](subjects/computer-networks/images/lan-diagram.jpg)

- **Coverage Range:** Within a room, office floor, single building, or small academic campus ($< 1 \text{ km}$).
- **Ownership:** Privately owned and managed by a single individual or organization.
- **Speed & Delay:** Very high data rates ($1\text{ Gbps} - 100\text{ Gbps}$), ultra-low latency ($< 1\text{ ms}$), minimal error rates.
- **Technologies:** Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11).

---

### 3. MAN — Metropolitan Area Network

![Metropolitan Area Network (MAN)](subjects/computer-networks/images/man-diagram.jpg)

- **Coverage Range:** Spans an entire city or large municipal region ($5\text{ km} - 50\text{ km}$).
- **Ownership:** Municipalities, telecom consortia, or ISP regional backbones.
- **Technologies:** Metro Ethernet, Dark Fiber Rings, Cellular 5G base stations, Cable TV networks.
- **Use Cases:** City smart-traffic surveillance, municipal banking networks, inter-branch university campuses.

---

### 4. WAN — Wide Area Network

![Wide Area Network (WAN)](subjects/computer-networks/images/wan-diagram.jpg)

- **Coverage Range:** Spans multiple cities, countries, continents, or the entire globe ($> 100\text{ km}$).
- **Ownership:** Multiple public/private Tier-1 Internet Service Providers (ISPs) interconnected via Internet Exchange Points (IXPs) and undersea fiber-optic cables.
- **Speed & Latency:** Variable speeds ($10\text{ Mbps} - 400\text{ Gbps}$), higher latency ($20\text{ ms} - 250\text{ ms}$) due to propagation distance.
- **Prime Example:** The global **Internet**.

---

### Geographical Scale Comparison Matrix

| Parameter | PAN | LAN | MAN | WAN |
|---|---|---|---|---|
| **Geographic Span** | Up to $10\text{ m}$ | Up to $1\text{ km}$ | $5 - 50\text{ km}$ | Worldwide ($> 100\text{ km}$) |
| **Data Transfer Rate** | $\approx 1 - 24\text{ Mbps}$ | $100\text{ Mbps} - 10\text{ Gbps}+$ | $100\text{ Mbps} - 1\text{ Gbps}$ | Variable ($10\text{ Mbps} - 400\text{ Gbps}$) |
| **Propagation Delay** | Negligible ($\mu\text{s}$) | Very Low ($< 2\text{ ms}$) | Moderate ($5 - 15\text{ ms}$) | High ($30 - 300\text{ ms}$) |
| **Cost & Complexity** | Minimal | Low / Moderate | High | Very High |
| **Fault Tolerance** | Low | High | Moderate | High (Mesh routing) |

---

## 6. Internet, Intranet & Extranet

![The Global Internet](subjects/computer-networks/images/internet-diagram.jpg)

### Internet
The **Internet** is the globally interconnected system of autonomous public and private computer networks utilizing the standardized **TCP/IP protocol suite**.
- **Access Level:** Public to anyone with an ISP subscription.
- **Governance:** Decentralized (IETF, ICANN, W3C standards).

---

### Intranet vs Extranet

![Internet vs Intranet](subjects/computer-networks/images/internet-vs-intranet.jpg)

![Intranet vs Extranet](subjects/computer-networks/images/intranet-vs-extranet.jpg)

- **Intranet:** A strictly **private, firewalled corporate network** accessible exclusively by internal employees to share confidential documents, HR portals, and internal tooling.

![Extranet Network Architecture](subjects/computer-networks/images/extranet-diagram.jpg)

- **Extranet:** A secure, controlled extension of an organization's Intranet enabling **authorized external third parties** (vendors, suppliers, certified partners, enterprise clients) to access specific resources via secure VPNs or authenticated portals.

### Network Scope Comparison

| Metric | Internet | Intranet | Extranet |
|---|---|---|---|
| **Target Audience** | General public worldwide | Internal employees / staff | Employees + Verified external partners |
| **Security Perimeter** | Public / Open access | High (Protected behind corporate Firewalls) | Strict (Firewalls + IP filtering + VPN tunnels) |
| **Hosting Model** | Distributed global servers | Internal on-prem / Private cloud | Hybrid VPN / Secured DMZ |

---

## 7. Network Architectures: Client-Server vs Peer-to-Peer (P2P)

Network architecture determines how compute tasks, storage, and control responsibilities are partitioned among participating nodes.

![Client-Server vs Peer-to-Peer Architecture](subjects/computer-networks/images/client-server-vs-p2p.jpg)

### Client-Server Architecture

- **Server:** High-performance host providing specialized services (HTTP, DNS, Database, Mail).
- **Client:** End-user device initiating request-response transactions with the server.
- **Strengths:** Centralized data integrity, simple role-based access control, streamlined backup routines, high horizontal scalability.
- **Weakness:** Server hardware represents a single point of failure if not load-balanced.

### Peer-to-Peer (P2P) Architecture

- **Peers (Servents):** All nodes possess equal privileges and can simultaneously act as both clients and servers.
- **Strengths:** Extreme fault tolerance, no expensive central infrastructure, bandwidth scales organically with node count.
- **Weakness:** Complex distributed security, decentralized data consistency challenges.
- **Examples:** BitTorrent file distribution, Bitcoin blockchain, WebRTC peer data channels.

---

## 8. Network Hardware & Devices

Network devices operate at distinct layers of the protocol stack to regenerate signals, filter frames, route packets, or bridge disparate protocols.

![Network Devices across OSI Layers](subjects/computer-networks/images/network-devices-osi.jpg)

### Hardware Device Directory

1. **Network Interface Card (NIC):** Physical PCIe card or embedded chip providing hardware layer connection, transceiver capabilities, and a globally unique burnt-in 48-bit **MAC Address** (Layer 1/2).
2. **Repeater:** Physical layer hardware that amplifies or reshapes weakened electrical/optical signals to extend maximum cable distance (Layer 1).
3. **Hub:** Legacy multi-port physical layer repeater. When an electrical signal enters one port, it blindly broadcasts it out across **all other ports**, causing massive collision domains (Layer 1).
4. **Bridge:** Layer 2 device that inspects source/destination MAC addresses to partition a large network into two distinct collision domains (Layer 2).
5. **Switch:** Intelligent multi-port Layer 2 bridge. Maintains a dynamic **MAC Address Table (CAM Table)** to switch Ethernet frames directly between source and destination ports with full collision isolation (Layer 2).
6. **Router:** Layer 3 internetworking gateway. Reads IP packet headers, maintains dynamic routing tables (OSPF, BGP), and determines optimal paths across independent IP subnets (Layer 3).
7. **Gateway:** Enterprise boundary device performing protocol translation between fundamentally incompatible network architectures (e.g. VoIP Gateway translating SIP to PSTN).
8. **Wireless Access Point (WAP):** Bridges IEEE 802.11 wireless radio frames with IEEE 802.3 wired Ethernet frames (Layer 2).
9. **Modem (Modulator-Demodulator):** Converts digital computer binary pulses into analog carrier signals suitable for telephone/cable lines, and vice versa.

---

### Hub vs Switch vs Router Comparison

![Hub vs Switch vs Router Comparison](subjects/computer-networks/images/hub-switch-router.jpg)

| Feature | Hub | Switch | Router |
|---|---|---|---|
| **OSI Operating Layer** | **Layer 1** (Physical) | **Layer 2** (Data Link) / L3 Switch | **Layer 3** (Network) |
| **Addressing Used** | None (Raw electrical bits) | **MAC Address** (48-bit hardware) | **IP Address** (32-bit / 128-bit logical) |
| **Data Forwarding Unit** | Bits | **Frames** | **Packets** |
| **Forwarding Decision** | Blind broadcast to all ports | Hardware CAM Table unicast | Software/ASIC Routing Table lookup |
| **Collision Domains** | Single shared collision domain | Separate collision domain per port | Separate collision domain per port |
| **Broadcast Domains** | Single broadcast domain | Single broadcast domain (without VLAN) | Separates broadcast domains per subnet |
| **Intelligent Filtering** | None | High (MAC filtering) | High (IP routing, ACLs, NAT, QoS) |

---

## 9. Network Software Architecture & Encapsulation

### Layered Architecture Philosophy

Network software is structured in a vertical hierarchy of abstraction layers. Each layer provides a well-defined set of services to the layer directly above it while abstracting internal implementation details.

> **1. Service:** What functionality a layer delivers to the upper adjacent layer.
>
> **2. Interface:** The software API or boundary mechanism used by an upper layer to request a service from a lower layer.
>
> **3. Protocol:** The standardized syntax, semantics, and synchronization rules followed by peer entities communicating across the network at the same layer.

---

### Data Encapsulation & Decapsulation

![Data Encapsulation and Decapsulation in OSI Model](subjects/computer-networks/images/data-encapsulation.png)

- **Encapsulation (Transmitting Host):** As data moves downwards from the Application layer to the Physical layer, each layer prepends a specialized **Header** (and the Data Link layer appends a **Trailer** with CRC checksum) containing addressing and control metadata.
- **Decapsulation (Receiving Host):** When raw bits arrive at the receiver, data moves upwards. Each corresponding layer inspects, validates, strips its respective header, and passes the payload upward.

```text
Application Layer  → [ DATA ]
Transport Layer    → [ TH | DATA ]                          → (Segment / Datagram)
Network Layer      → [ NH | TH | DATA ]                     → (Packet)
Data Link Layer    → [ DLH | NH | TH | DATA | DLT (CRC) ]   → (Frame)
Physical Layer     → 01010011 01100101 01101110 01100100   → (Raw Bits)
```

---

## 10. Network Topologies

Topology defines the geometric arrangement of nodes and physical/logical transmission links in a network.

![Network Topologies Overview](subjects/computer-networks/images/network-topologies.jpg)

### Topologies Comparative Breakdown

| Topology | Geometric Structure | Key Advantages | Key Disadvantages | Cable Fault Impact |
|---|---|---|---|---|
| **Bus** | Single central backbone cable with terminators at ends | Simple installation, minimum cable required for small setups | Backbone failure breaks entire network; difficult troubleshooting | **Catastrophic** (Network down) |
| **Star** | All end-stations connect to a central Switch/Hub | Easy expansion; single node failure does not affect others | Central switch failure crashes all attached hosts | **Isolated** to failed node |
| **Ring** | Nodes connected in a closed unidirectional/bidirectional loop | Equal access opportunity (token passing); predictable latency | Single link break can disrupt the entire ring (unless dual-ring FDDI) | **Critical** (Ring collapse) |
| **Mesh (Full)** | Every node connects directly to every other node: $\text{Links} = \frac{n(n-1)}{2}$ | Maximum redundancy, zero traffic bottleneck, ultimate reliability | Highly expensive, complex cabling and port density | **Zero impact** (Alternate paths) |
| **Tree** | Hierarchical parent-child branching rooted at core switch | Scalable hierarchical management; modular fault isolation | Core root switch failure disconnects dependent sub-branches | **Partial** to sub-branch |
| **Hybrid** | Combination of two or more topologies (e.g. Star-Bus) | Highly flexible, customizable for large enterprise campuses | High design complexity and installation cost | **Depends** on segment |

---

## 11. Network Protocol Elements

A network protocol is defined by three fundamental pillars:

```text
┌─────────────────────────────────────────────────────────────┐
│                     PROTOCOL ELEMENTS                       │
├───────────────────┬───────────────────┬─────────────────────┤
│      SYNTAX       │     SEMANTICS     │       TIMING        │
├───────────────────┼───────────────────┼─────────────────────┤
│ Data Format,      │ Meaning of bits,  │ Transmission speed, │
│ Field layout,     │ Actions triggered │ Sequencing,         │
│ Header sizes      │ by control flags  │ Timeout & flow ctrl │
└───────────────────┴───────────────────┴─────────────────────┘
```

1. **Syntax:** Dictates data format, field sizes, bit positions, and endianness (e.g., first 4 bits of IPv4 header define IP Version).
2. **Semantics:** Dictates interpretation of control fields and what corrective action is required (e.g., `SYN` flag initiates 3-way handshake; `RST` tears down socket).
3. **Timing:** Governs transmission clocking, transmission rate adaptation, and retransmission timeout intervals (e.g., TCP Sliding Window Flow Control).

---

## 12. OSI 7-Layer Reference Model

Developed by the **International Organization for Standardization (ISO)**, the Open Systems Interconnection (OSI) model provides an architectural framework dividing network communication into 7 distinct functional layers.

![OSI 7-Layer Reference Model with Protocols & PDUs](subjects/computer-networks/images/osi-7-layer-model.jpg)

### Detailed Layer Breakdown

```text
Layer 7: APPLICATION   ─── Network APIs, Human-Computer Interface (HTTP, DNS, SSH)
Layer 6: PRESENTATION  ─── Data Representation, Encryption, Compression (TLS, JSON, JPEG)
Layer 5: SESSION       ─── Dialog Management, Checkpointing, Session Tokens (RPC, NetBIOS)
Layer 4: TRANSPORT     ─── End-to-End Reliability, Port Multiplexing (TCP, UDP)
Layer 3: NETWORK       ─── Logical IP Addressing, Routing & Forwarding (IPv4, IPv6, ICMP)
Layer 2: DATA LINK     ─── Physical MAC Addressing, Framing & Error Check (Ethernet, Wi-Fi)
Layer 1: PHYSICAL      ─── Bit Transmission, Signaling & Physical Media (Voltages, Fiber, RF)
```

> **Mnemonic (Top-Down):** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing
>
> **Mnemonic (Bottom-Up):** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

---

### Complete OSI Layer Specification

| Layer # | Layer Name | Protocol Data Unit (PDU) | Primary Addressing | Core Responsibilities | Typical Protocols / Standards |
|---|---|---|---|---|---|
| **7** | **Application** | Data / Message | User / Process ID | User interface, application network services | HTTP, HTTPS, DNS, SMTP, FTP, SSH |
| **6** | **Presentation** | Data | — | Syntax formatting, TLS encryption/decryption, gzip compression | SSL/TLS, ASCII, UTF-8, JPEG, MPEG |
| **5** | **Session** | Data | Session ID | Session establishment, maintenance, synchronization checkpoints | NetBIOS, RPC, Sockets, PPTP |
| **4** | **Transport** | **Segment** (TCP) / **Datagram** (UDP) | **Port Number** (16-bit) | End-to-end delivery, flow control, error recovery, segmentation | TCP, UDP, QUIC, SCTP |
| **3** | **Network** | **Packet** | **IP Address** (32-bit/128-bit) | Logical addressing, inter-network packet routing, path determination | IPv4, IPv6, ICMP, OSPF, BGP |
| **2** | **Data Link** | **Frame** | **MAC Address** (48-bit) | Node-to-node framing, physical MAC addressing, CRC error detection | Ethernet (802.3), Wi-Fi (802.11), PPP |
| **1** | **Physical** | **Bits** | Physical Pin / Frequency | Electrical signal encoding, clock synchronization, raw bitstream | RS-232, 1000BASE-T, Fiber, Radio (RF) |

---

## 13. TCP/IP Protocol Suite

The **TCP/IP Model (Internet Protocol Suite)** is the practical, 4-layer architectural standard upon which the global Internet is built.

![TCP/IP 4-Layer Protocol Suite](subjects/computer-networks/images/tcpip-4-layer-model.jpg)

### The 4 Architectural Layers

1. **Application Layer (L4):** Combines OSI Layers 5, 6, and 7. Directly supports end-user network applications (HTTP, DNS, SMTP, SSH).
2. **Transport Layer (L3):** Provides host-to-host process communication over TCP (reliable, connection-oriented) or UDP (fast, connectionless).
3. **Internet Layer (L2):** Handles IP logical addressing, packet routing, and fragmentation across network boundaries using the **Internet Protocol (IP)**.
4. **Network Access / Link Layer (L1):** Combines OSI Layers 1 and 2. Encompasses physical drivers, network adapters, and protocols governing transmission across local network media (Ethernet, Wi-Fi).

---

### OSI Model vs TCP/IP Model Mapping & Comparison

![OSI Model vs TCP/IP Model Comparison](subjects/computer-networks/images/osi-vs-tcpip.jpg)

```text
OSI 7-Layer Model                    TCP/IP 4-Layer Architecture
┌─────────────────────────┐
│ Layer 7: Application    │ ──┐
├─────────────────────────┤   │
│ Layer 6: Presentation   │ ──┼───→  Layer 4: APPLICATION
├─────────────────────────┤   │      (HTTP, DNS, SSH, SMTP)
│ Layer 5: Session        │ ──┘
├─────────────────────────┤
│ Layer 4: Transport      │ ──────→  Layer 3: TRANSPORT (TCP, UDP)
├─────────────────────────┤
│ Layer 3: Network        │ ──────→  Layer 2: INTERNET (IP, ICMP, ARP)
├─────────────────────────┤
│ Layer 2: Data Link      │ ──┐
├─────────────────────────┤   └───→  Layer 1: NETWORK ACCESS
│ Layer 1: Physical       │          (Ethernet, Wi-Fi, Fiber, MAC)
└─────────────────────────┘
```

### Comprehensive Comparison Matrix

| Aspect | OSI Reference Model | TCP/IP Model |
|---|---|---|
| **Primary Nature** | Theoretical reference model developed by ISO | Practical implementation standard of the Internet |
| **Total Layers** | **7 Layers** | **4 Layers** |
| **Application Layer** | Partitioned into Application, Presentation, Session | Unified into a single Application layer |
| **Network & Lower Layers** | Separate Network, Data Link, and Physical layers | Combined as Internet and Network Access layers |
| **Protocol Independence** | Strict boundary separation; model designed before protocols | Protocols were created first; model designed around them |
| **Transport Reliability** | Supports both connection-oriented & connectionless | Supports connection-oriented (TCP) & connectionless (UDP) |
| **Industry Adoption** | Educational & conceptual architectural guide | Dominant commercial networking standard worldwide |

---

## 14. Exam Quick-Reference & High-Yield Summary

### ⚡ Layer vs Identifier vs Protocol Data Unit (PDU)

| Layer | Protocol Data Unit (PDU) | Addressing Scheme | Hardware Device |
|---|---|---|---|
| **Application** | Data / Message | Process ID / Port / URL | Gateway / Application Firewall |
| **Transport** | **Segment** (TCP) / **Datagram** (UDP) | **Port Number** (`0` – `65535`) | L4 Load Balancer |
| **Network** | **Packet** | **IP Address** (e.g. `192.168.1.1`) | **Router** / Layer 3 Switch |
| **Data Link** | **Frame** | **MAC Address** (`00:1A:2B:3C:4D:5E`) | **Switch** / Bridge / NIC |
| **Physical** | **Bits** (Electrical / Optical pulses) | Physical Pins / Frequencies | **Hub** / Repeater / Media Converter |

---

### Core Distinctions to Ace in Exams

> **1. Encapsulation vs Decapsulation:** Encapsulation appends headers moving **down** the stack ($7 \to 1$); Decapsulation parses and strips headers moving **up** the stack ($1 \to 7$).
>
> **2. Service vs Protocol:** A *Service* is what a layer provides to the layer above it; a *Protocol* is the formal rules used by peer entities across the network.
>
> **3. Hub vs Switch vs Router:** Hub broadcasts raw bits at Layer 1; Switch unicasts frames using Layer 2 MAC addresses; Router forwards packets between subnets using Layer 3 IP addresses.
>
> **4. Simplex vs Half-Duplex vs Full-Duplex:** Simplex is 1-way; Half-Duplex is 2-way alternating; Full-Duplex is 2-way simultaneous.

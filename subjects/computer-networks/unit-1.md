# Unit 1 — Introduction & Network Models

CSE306: Computer Networks — Unit I covers the complete foundation of computer networking: definitions, types, hardware, architecture, topologies, protocols, the OSI model, and the TCP/IP protocol suite.

## 1. Computer Networks

### What is a Computer Network?

A computer network is a collection of interconnected computers and other devices that communicate with each other to exchange data and share resources and services.

```
Computer A ───┐
Computer B ───┼── Switch ─── Router ─── Internet
Computer C ───┘
```

The computers can communicate because they are connected through networking devices and use common communication protocols.

### Goals / Purposes of Computer Networks

**1. Resource Sharing**

Allows multiple users to share resources such as:
- Printers
- Storage
- Internet connection
- Applications

**2. Data Sharing**

Allows users and systems to exchange files, documents, images, videos, and database information.

**3. Communication**

Networks enable email, messaging, voice calls, and video conferencing.

**4. Remote Access**

Users can access systems and resources from another location.

**5. Centralized Management**

Organizations can centrally manage users, data, security, and network resources.

**6. Reliability and Availability**

Data and services can be distributed across multiple systems, reducing dependence on a single device.

## 2. Data Communication Basics

### What is Data Communication?

Data communication is the exchange of data between two or more devices through a communication medium.

```
Sender → Communication Medium → Receiver
```

For successful communication, devices need to follow agreed rules called **protocols**.

### Components of Data Communication

A basic data communication system has five important components:

| # | Component | Description | Example |
|---|-----------|-------------|---------|
| 1 | **Sender** | The device that generates and sends the data | Computer, smartphone |
| 2 | **Receiver** | The device that receives the transmitted data | Computer, server |
| 3 | **Message** | The actual information being communicated | Text, image, audio, video, file |
| 4 | **Transmission Medium** | The physical or wireless path through which data travels | Ethernet cable, fiber-optic, radio waves |
| 5 | **Protocol** | The set of rules that controls communication between devices | TCP, HTTP, FTP |

## 3. Communication Modes

Communication mode describes the direction of data transmission between devices. There are three major modes:

### Simplex

In simplex communication, data travels in **only one direction**.

```
A ─────────→ B
```

A can transmit, but B cannot transmit back through the same communication arrangement.

> **Example:** Traditional keyboard → computer communication.

**Key point:** One-way communication.

### Half-Duplex

In half-duplex communication, data can travel in **both directions, but not at the same time**.

```
A ─────→ B
A ←───── B
```

One device transmits while the other receives, and then they can reverse roles.

> **Example:** Walkie-talkie — one person talks while the other listens.

**Key point:** Two-way, but one direction at a time.

### Full-Duplex

In full-duplex communication, data can travel in **both directions simultaneously**.

```
A ───────→ B
A ←─────── B
```

Both devices can transmit and receive at the same time.

> **Example:** Telephone conversation.

**Key point:** Two-way simultaneously.

### Comparison Table

| Mode | Direction | Simultaneous? | Example |
|------|-----------|---------------|---------|
| **Simplex** | One-way | No | Keyboard → computer |
| **Half-Duplex** | Two-way | No | Walkie-talkie |
| **Full-Duplex** | Two-way | Yes | Telephone |

> **Memory trick:** Simplex = One way · Half = Both ways, one at a time · Full = Both ways, simultaneously

## 4. Connection Types & Data Delivery

### Point-to-Point

A point-to-point connection provides a **dedicated communication link** between two devices.

```
A ═════════ B
```

The entire link is used by these two devices only.

> **Example:** A direct connection between two routers.

**Key idea:** One sender ↔ one receiver.

### Multipoint

A multipoint connection is a communication link **shared by multiple devices**.

```
       A
       |
B ─────┼───── C
       |
       D
```

A single communication medium can be shared among several devices.

**Key idea:** One medium ↔ multiple devices.

### Unicast

Communication from **one sender to one specific receiver**.

```
A ─────────→ B
```

> **Example:** Your computer requesting a webpage from a server.

**1 → 1**

### Multicast

Communication from **one sender to a selected group** of receivers.

```
        → B
A ──────→ C
        → D
```

Only members of the specific group receive the data.

**1 → Selected many**

### Broadcast

Communication from **one sender to all devices** within the relevant broadcast domain/network.

```
        → B
A ──────→ C
        → D
        → E
```

**1 → All**

## 5. Types of Networks

### PAN — Personal Area Network

A Personal Area Network connects devices within a **very small area** around an individual.

**Example:** Phone connected to smartwatch, earbuds, wireless keyboard.

**Characteristics:**
- Very small range
- Usually personal devices
- Bluetooth is commonly used

### LAN — Local Area Network

A Local Area Network connects devices within a **limited geographical area**.

**Examples:** Home, office, computer laboratory, building, campus.

**Characteristics:**
- Small geographical area
- Usually privately managed
- Generally high-speed communication
- Ethernet and Wi-Fi are common technologies

### MAN — Metropolitan Area Network

A Metropolitan Area Network connects networks across a **city or metropolitan area**.

**Example:** An organization connecting multiple offices located throughout one city.

### WAN — Wide Area Network

A Wide Area Network connects networks across a **large geographical area** — multiple cities, countries, or continents.

**Example:** The Internet.

### Comparison Table

| Network | Coverage | Example |
|---------|----------|---------|
| **PAN** | Personal / small area | Phone + smartwatch |
| **LAN** | Building / campus | College lab |
| **MAN** | City | City-wide network |
| **WAN** | Very large / global | Internet |

> **Memory:** PAN → LAN → MAN → WAN (Small → Large → Larger → Global)

## 6. Internet, Intranet & Extranet

### Internet

The Internet is a **global system of interconnected networks** that communicate using the TCP/IP protocol suite. It is a public/global network.

**Examples:** Websites, email, online services, cloud services.

### Intranet

An intranet is a **private network** used within an organization to provide internal resources and services to authorized users.

**Example:** A company's internal employee portal.

### Extranet

An extranet is a **private network or controlled extension** of an organization's network that provides authorized external users with access to selected resources.

**Example:** A company allowing selected suppliers to access its inventory system.

### Easy Distinction

| Type | Access |
|------|--------|
| **Internet** | Everyone / public |
| **Intranet** | Organization's internal users |
| **Extranet** | Organization + authorized external users |

## 7. Network Architectures

### Client-Server Architecture

A client-server architecture is a network architecture in which **clients request services** from servers, and **servers provide them**.

```
Client A ──┐
Client B ──┼──→ Server
Client C ──┘
```

- **Client** — A device/application that requests a service.
- **Server** — A device/application that provides a service.

> **Example:** Browser (client) requesting a webpage from a web server.

**Advantages:**
- Centralized management
- Easier data management
- Better resource control
- Suitable for large networks

**Disadvantage:** The server can become a critical dependency if not designed for redundancy.

### Peer-to-Peer (P2P)

In a peer-to-peer network, devices can act as **both clients and servers**, sharing resources directly with one another.

```
A ↔ B
↕   ↕
C ↔ D
```

There is no requirement for one central server to provide all services.

**Advantages:**
- Simple for small networks
- No dedicated central server required
- Direct resource sharing

**Disadvantages:**
- Difficult to centrally manage
- Security can be harder to control
- Less suitable for large organizations

### Comparison

| Feature | Client-Server | P2P |
|---------|---------------|-----|
| Central server | Yes | Not required |
| Management | Centralized | Decentralized |
| Scalability | Better | Limited |
| Administration | Easier | More difficult |
| Suitable for | Large networks | Small/simple networks |

## 8. Network Hardware & Devices

Network hardware refers to the physical devices and components used to connect devices and enable network communication.

### NIC — Network Interface Card

A NIC is a hardware component that provides a device with the capability to **connect to a network**.

- Provides network connectivity
- Sends and receives network data
- Has a **MAC address**
- Types: Wired NIC, Wireless NIC
- **Layer:** Physical (L1) and Data Link (L2)

### Hub

A hub is a basic networking device that connects multiple devices and **broadcasts incoming data to all of its ports**.

```
       PC
        |
PC ─── Hub ─── PC
        |
       PC
```

If A sends data to B, the hub also sends the signal toward all other connected ports.

**Characteristics:**
- No intelligent forwarding
- Does not use destination MAC addresses
- Shared communication medium
- **Layer 1 — Physical**

### Switch

A switch connects devices in a LAN and **forwards Ethernet frames** toward the appropriate destination using **MAC addresses**.

```
PC A ──┐
PC B ──┼── Switch
PC C ──┤
PC D ──┘
```

The switch learns which MAC addresses are associated with which ports. When a frame arrives, it examines the destination MAC address and forwards it appropriately.

**Characteristics:**
- Uses MAC addresses
- Reduces unnecessary traffic compared with a hub
- Each switch port provides a separate link
- **Layer 2 — Data Link**

### Router

A router connects **different networks** and forwards packets between them using **IP addressing**.

```
LAN A ─── Router ─── LAN B
              |
           Internet
```

**Functions:**
- Connects different networks
- Uses IP addresses
- Determines where packets should be forwarded
- Maintains routing information
- **Layer 3 — Network**

### Modem

Modem stands for **Modulator-Demodulator**. It converts signals between forms suitable for transmission over a particular access network and forms usable by network equipment.

- **Modulation** → transmission
- **Demodulation** → reception
- Example: A broadband modem connecting a home network to an ISP

### Repeater

A repeater **regenerates or reshapes a signal** to help it travel over a longer physical distance.

- Purpose: Overcomes signal degradation
- **Layer 1 — Physical**

### Bridge

A bridge connects network segments and forwards frames based on **MAC addresses**.

- **Layer 2 — Data Link**
- Modern switches perform bridge-like functions on multiple ports

### Gateway

A gateway acts as an **entry/exit point** between different networks or systems, and may perform protocol translation when required.

- The term gateway is broader than a router
- Can connect systems using different communication protocols

### Access Point

A Wireless Access Point provides wireless devices with access to a network, typically connecting wireless clients to a wired LAN.

```
Phone   ))))
Laptop  )))) → Access Point → Switch → Router
Tablet  ))))
```

### Quick Reference Table

| Device | Main Function | Main Layer |
|--------|---------------|------------|
| **NIC** | Network connectivity | L1/L2 |
| **Repeater** | Regenerates signals | L1 |
| **Hub** | Broadcasts signals to ports | L1 |
| **Bridge** | Connects LAN segments using MAC | L2 |
| **Switch** | Forwards frames using MAC | L2 |
| **Router** | Connects networks using IP | L3 |
| **Gateway** | Connects/translates between systems | Depends |
| **Access Point** | Provides wireless network access | L2 |
| **Modem** | Converts signals for access network | Depends |

### Hub vs Switch vs Router

```
Hub:    Device → Hub    → Everyone
Switch: Device → Switch → Correct device
Router: Network → Router → Another network
```

| | Hub | Switch | Router |
|-|-----|--------|--------|
| **Action** | Broadcasts | Selectively forwards | Routes between networks |
| **Address used** | None | MAC address | IP address |
| **Layer** | Layer 1 | Layer 2 | Layer 3 |
| **Efficiency** | Less efficient | More efficient | Connects networks |

## 9. Network Software Architecture

### Hardware vs Software Architecture

**Hardware architecture** describes the physical arrangement of networking devices, connections, and transmission media — computers, NICs, hubs, switches, routers, cables, wireless devices, and the connections between them.

**Software architecture** describes how networking functions are organized into **logical layers and protocols**. Instead of putting all networking functions into one huge system, networking divides them into manageable layers.

### Layered Architecture

Layered architecture divides network communication into a series of **logical layers**, where each layer performs a specific function.

**Why use layers?**

1. **Reduces complexity** — A complicated process becomes a collection of smaller tasks.
2. **Modularity** — Each layer focuses on its own responsibility.
3. **Standardization** — Different vendors can implement compatible networking functions.
4. **Easier troubleshooting** — A problem can be investigated layer by layer.
5. **Easier development** — Changes to one layer can often be made without redesigning other layers.

### Services, Interfaces & Protocols

**Service** — A function provided by one network layer to the layer immediately above it.

> Example: The Transport Layer provides end-to-end delivery services to the Application Layer.

**Interface** — Defines how one layer communicates with the layer directly above or below it. It specifies how services are accessed.

```
Upper Layer
     ↓
 Interface
     ↓
Lower Layer
```

**Protocol** — Defines the rules used by peer entities at the same layer to communicate.

> **Very important distinction:**
> - **Service** = What a layer provides
> - **Interface** = How that service is accessed
> - **Protocol** = Rules used for communication between corresponding entities

### Encapsulation

Encapsulation is the process in which each lower network layer **adds its own control information/header** (and sometimes trailer) to the data received from the layer above.

```
Application  →  [Data]
Transport    →  [Transport Header | Data]
Network      →  [Network Header | Transport Header | Data]
Data Link    →  [Frame Header | Network Header | Transport Header | Data | Trailer]
Physical     →  Bits
```

![Encapsulation Process](assets/images/encapsulation.png)

**Simple definition:** Encapsulation = headers/trailers are added as data moves down the layers.

### Decapsulation

Decapsulation is the **reverse process**. At the receiving device, each layer removes and processes the information added by its corresponding layer.

```
Bits → Frame → Packet → Segment → Data
```

**Simple definition:** Decapsulation = headers/trailers are processed and removed as data moves upward.

| | Encapsulation | Decapsulation |
|-|---------------|---------------|
| **Side** | Sender | Receiver |
| **Direction** | Data moves downward | Data moves upward |
| **Action** | Headers/trailers are added | Headers/trailers are removed |
| **Flow** | Application → Physical | Physical → Application |

## 10. Network Topologies

A **network topology** is the arrangement of network devices and communication links.

Two important views:
- **Physical topology** — Shows the actual physical arrangement of devices and cables.
- **Logical topology** — Shows how data flows logically through the network.

![Network Topologies](assets/images/network-topologies.png)

### Bus Topology

All devices share one main backbone.

```
PC ─── PC ─── PC ─── PC
──────── Backbone ────────
```

| Advantages | Disadvantages |
|------------|---------------|
| Simple | Backbone failure affects entire network |
| Low cable requirement | Troubleshooting can be difficult |
| Low cost for small networks | Performance degrades with more traffic |
| | Limited scalability |

### Star Topology

Every device connects to a **central device** (hub/switch).

```
       PC
        |
PC ── Switch ── PC
        |
       PC
```

| Advantages | Disadvantages |
|------------|---------------|
| Easy installation | Central device failure affects all |
| Easy troubleshooting | More cabling than bus |
| Easy expansion | Central device adds cost |
| One link failure doesn't affect others | |

### Ring Topology

Each device connects to two neighboring devices, forming a **ring**.

```
A ── B
|    |
D ── C
```

| Advantages | Disadvantages |
|------------|---------------|
| Predictable communication | Link/node failure can disrupt ring |
| Defined neighboring connections | More difficult to expand |

### Mesh Topology

Devices have **multiple connections**. In a full mesh, every device connects directly to every other device.

**Full mesh links formula:** Links = n(n − 1) / 2

| Advantages | Disadvantages |
|------------|---------------|
| High reliability | Expensive |
| Multiple paths | Complex |
| Excellent fault tolerance | Requires many physical links |

### Tree Topology

Devices are arranged **hierarchically**.

```
          Core
         /    \
      SW1      SW2
     /  \      /  \
   PC   PC   PC   PC
```

| Advantages | Disadvantages |
|------------|---------------|
| Hierarchical organization | Higher-level failures affect branches |
| Easy expansion | More complex than simple topologies |
| Suitable for larger networks | |

### Hybrid Topology

A hybrid topology **combines two or more topology types** (e.g., Star + Bus).

| Advantages | Disadvantages |
|------------|---------------|
| Flexible | Complex |
| Scalable | More expensive |
| Customizable to requirements | Requires careful management |

## 11. Network Protocols

### Definition

A network protocol is a **set of rules and conventions** that determines how devices communicate and exchange data. Without common protocols, devices may not understand each other's communication.

### Elements of a Protocol

A protocol generally defines three important elements:

**1. Syntax** — Defines the **structure or format** of data. Specifies what fields exist, their order, and their size/format.

> Syntax = What the data **looks like**.

**2. Semantics** — Defines the **meaning** of each field and what action should be taken.

> Semantics = What the data **means**.

**3. Timing** — Defines **when** data should be sent, at what rate, and how quickly the receiver should process it.

> Timing = **When/how fast** data is exchanged.

> **Memory:** Syntax → Structure · Semantics → Meaning · Timing → When/Speed

### Examples of Network Protocols

| Protocol | Purpose |
|----------|---------|
| **HTTP** | Web communication |
| **HTTPS** | Secure web communication |
| **FTP** | File transfer |
| **DNS** | Name resolution |
| **DHCP** | Automatic network configuration |
| **TCP** | Reliable transport |
| **UDP** | Connectionless transport |
| **IP** | Logical addressing and packet delivery |
| **SMTP** | Sending email |

## 12. OSI Model

### What is the OSI Model?

OSI stands for **Open Systems Interconnection**. The OSI model is a **seven-layer reference model** that organizes network communication into seven functional layers. It was developed by the **International Organization for Standardization (ISO)**.

### Why OSI Model?

- Standardize networking concepts
- Divide communication into manageable layers
- Understand how data travels
- Develop networking technologies
- Troubleshoot network problems
- Explain interactions between different networking functions

![OSI Model — 7 Layers](assets/images/osi-model.png)

### The Seven Layers

```
7  Application
6  Presentation
5  Session
4  Transport
3  Network
2  Data Link
1  Physical
```

> **Mnemonic:** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

---

### Layer 7 — Application

The Application Layer provides **network services that applications use** to communicate over a network.

**Functions:**
- Provides network services to applications
- Supports application-level communication
- Provides access to network resources

**Examples:** HTTP, FTP, DNS, SMTP

**PDU:** Data

---

### Layer 6 — Presentation

The Presentation Layer handles the **representation and transformation of data** so communicating systems can understand it.

**Functions:**
- **Translation** — Converts data between different representations
- **Encryption** — Transforms data into a protected form
- **Decryption** — Converts encrypted data back into usable data
- **Compression** — Reduces data size

**PDU:** Data

> **Memory:** Presentation = Translation + Encryption + Compression

---

### Layer 5 — Session

The Session Layer **establishes, manages, synchronizes, and terminates** communication sessions between applications.

**Functions:**
- Session establishment
- Session management
- Synchronization
- Session termination

**PDU:** Data

---

### Layer 4 — Transport

The Transport Layer provides **end-to-end communication** between applications.

**Functions:**
- Segmentation and reassembly
- Flow control
- Error control
- Reliable delivery (when provided by the protocol)
- Connection management

**Protocols:** TCP, UDP

**PDU:** TCP → Segment · UDP → Datagram

**Addressing:** Port number

---

### Layer 3 — Network

The Network Layer provides **logical addressing and routing** of packets between networks.

**Functions:**
- Logical addressing
- Routing
- Path selection
- Packet forwarding

**Example protocol:** IP

**PDU:** Packet

**Addressing:** IP address

**Device:** Router

---

### Layer 2 — Data Link

The Data Link Layer provides communication between **directly connected nodes** over a link.

**Functions:**
- Framing
- MAC addressing
- Error detection
- Media access control
- Link-level flow/control functions

**PDU:** Frame

**Addressing:** MAC address

**Devices:** Switch, Bridge

---

### Layer 1 — Physical

The Physical Layer is responsible for transmitting **raw bits** over the physical communication medium.

**Functions:**
- Bit transmission
- Electrical/optical/radio signaling
- Physical interfaces
- Cables and connectors
- Physical transmission characteristics

**PDU:** Bits

**Devices:** Hub, Repeater

---

### Complete OSI Table

| Layer | Name | Main Responsibility | PDU | Address |
|-------|------|---------------------|-----|---------|
| 7 | Application | Network services | Data | — |
| 6 | Presentation | Translation, encryption, compression | Data | — |
| 5 | Session | Session management | Data | — |
| 4 | Transport | End-to-end delivery | Segment/Datagram | Port |
| 3 | Network | Routing & logical addressing | Packet | IP |
| 2 | Data Link | Framing & MAC addressing | Frame | MAC |
| 1 | Physical | Bit transmission | Bits | — |

### OSI Encapsulation

When data travels from the sender's application toward the physical network:

```
Data → Segment → Packet → Frame → Bits
```

At the receiver:

```
Bits → Frame → Packet → Segment → Data
```

### Layer-to-Layer Communication

Each layer communicates **logically** with its corresponding layer on the other device using its protocol.

```
Computer A                 Computer B

Application  ←──────────→  Application
Transport    ←──────────→  Transport
Network      ←──────────→  Network
Data Link    ←──────────→  Data Link
Physical     ←──────────→  Physical
```

But physically, data travels **down** the sender's layers and **up** the receiver's layers.

## 13. TCP/IP Protocol Suite

### What is TCP/IP?

TCP/IP stands for **Transmission Control Protocol / Internet Protocol**. It is a collection of protocols used for communication across interconnected networks and forms the **foundation of the Internet**.

### TCP/IP Layers

```
4  Application
3  Transport
2  Internet
1  Network Access
```

### Layer 4 — Application Layer

Provides network services to applications. Combines functions from OSI's Application, Presentation, and Session layers.

**Examples:** HTTP, FTP, DNS, SMTP

### Layer 3 — Transport Layer

Provides **end-to-end communication** between applications.

**TCP:**
- Connection-oriented
- Reliable
- Ordered delivery
- Flow/error control mechanisms

**UDP:**
- Connectionless
- Lightweight
- No connection establishment
- Does not provide TCP's reliability mechanisms

**PDU:** TCP → Segment · UDP → Datagram

### Layer 2 — Internet Layer

Responsible for **logical addressing and packet delivery** between networks.

**Main protocol:** IP

**Functions:** Logical addressing, packet forwarding, routing-related delivery.

**PDU:** Packet

### Layer 1 — Network Access Layer

Handles communication over the **local network and physical medium**. Corresponds to OSI's Data Link + Physical layers.

**Functions:** Framing, local delivery, media access, physical transmission.

### TCP/IP Layer Summary

| TCP/IP Layer | Main Function | Examples |
|-------------|---------------|----------|
| Application | Application/network services | HTTP, FTP, DNS |
| Transport | End-to-end communication | TCP, UDP |
| Internet | IP addressing and packet delivery | IP |
| Network Access | Local/physical communication | Ethernet, Wi-Fi |

### OSI ↔ TCP/IP Mapping

![OSI vs TCP/IP Comparison](assets/images/osi-vs-tcpip.png)

```
OSI                         TCP/IP

Application ───────┐
Presentation ──────┼────→ Application
Session ───────────┘

Transport ──────────────→ Transport

Network ────────────────→ Internet

Data Link ────────┐
Physical ─────────┴────→ Network Access
```

**Remember:**
- OSI 7 + 6 + 5 → TCP/IP Application
- OSI 4 → TCP/IP Transport
- OSI 3 → TCP/IP Internet
- OSI 2 + 1 → TCP/IP Network Access

### OSI vs TCP/IP

| Feature | OSI | TCP/IP |
|---------|-----|--------|
| **Full name** | Open Systems Interconnection | Transmission Control Protocol/Internet Protocol |
| **Layers** | 7 | 4 |
| **Nature** | Reference model | Protocol suite |
| **Application layers** | 3 separate layers | Combined |
| **Transport** | Transport | Transport |
| **Network** | Network | Internet |
| **Lower layers** | Separate (DL + Physical) | Combined as Network Access |
| **Practical role** | Mainly conceptual/reference | Foundation of Internet networking |

## 14. Key Concepts & Connections

### Device → Address → Layer

| Device | Address/Identifier | Main Layer |
|--------|-------------------|------------|
| Hub | None | Physical |
| Switch | MAC | Data Link |
| Router | IP | Network |
| Application | Port / domain | Higher layers |

> **Core idea:** MAC = local/link-level · IP = network-level · Port = application/process-level

### Data Units — The Chain

```
Application      → DATA
Transport        → SEGMENT / DATAGRAM
Network          → PACKET
Data Link        → FRAME
Physical         → BITS
```

> **Memory:** Data → Segment → Packet → Frame → Bits

### Three Things You Must Never Mix Up

| Concept | Meaning |
|---------|---------|
| **Service** | What a layer provides |
| **Interface** | How the layer above accesses that service |
| **Protocol** | Rules used by corresponding entities to communicate |

## 15. Exam Preparation

### Important Definitions

You should be able to write these without thinking:

- **Computer Network:** A collection of interconnected devices that communicate to exchange data and share resources and services.
- **Protocol:** A set of rules and conventions governing communication between network devices.
- **Topology:** The arrangement of network devices and communication links.
- **LAN:** A network covering a limited geographical area such as a building or campus.
- **Router:** A device that connects different networks and forwards packets using IP addresses.
- **Switch:** A device that connects network devices and forwards frames using MAC addresses.
- **OSI Model:** A seven-layer reference model that organizes network communication into seven functional layers.
- **TCP/IP:** A protocol suite used for communication across interconnected networks, forming the foundation of Internet communication.
- **Encapsulation:** The process of adding protocol control information as data moves down through network layers.
- **Decapsulation:** The process of processing and removing protocol control information as data moves up through network layers.

### High-Value Differences

**Simplex vs Half-Duplex vs Full-Duplex** — One-way · Two-way one-at-a-time · Two-way simultaneously

**Point-to-Point vs Multipoint** — Dedicated link between two devices · Shared link with multiple devices

**Unicast vs Multicast vs Broadcast** — 1→1 · 1→selected group · 1→all

**Hub vs Switch vs Router** — Broadcasts · Forwards using MAC · Forwards between networks using IP

**Internet vs Intranet vs Extranet** — Public/global · Private/internal · Private + controlled external access

**Client-Server vs P2P** — Centralized · Distributed/peer-based

**Physical vs Logical Topology** — Actual arrangement · Logical flow of data

### Likely 2-Mark Questions

1. Define computer network.
2. What is a protocol?
3. Define LAN.
4. What is a WAN?
5. What is a network topology?
6. Define simplex communication.
7. What is half-duplex?
8. What is full-duplex?
9. What is unicast / multicast / broadcast?
10. What is a hub / switch / router / NIC?
11. What is an OSI model?
12. Name the seven OSI layers.
13. Name the four TCP/IP layers.
14. What is encapsulation / decapsulation?
15. What is a protocol's syntax / semantics / timing?

### Likely 5-Mark Questions

**Q1.** Explain different types of network topologies. *(Definition + Bus/Star/Ring/Mesh/Tree/Hybrid + advantages/disadvantages)*

**Q2.** Explain Hub, Switch and Router. *(Definition + function + address + layer + comparison)*

**Q3.** Explain communication modes. *(Simplex + Half-duplex + Full-duplex + diagram + examples)*

**Q4.** Explain the OSI model. *(Definition + purpose + 7 layers + functions + PDUs)*

**Q5.** Explain TCP/IP protocol suite. *(Definition + 4 layers + functions + examples)*

**Q6.** Explain protocol elements. *(Syntax + Semantics + Timing)*

### Likely 10-Mark Questions

**Q1.** Explain the OSI model in detail and compare it with TCP/IP.
> Structure: Introduction → 7 OSI layers → functions → PDU → TCP/IP → mapping → differences

**Q2.** Explain computer networks, their types, hardware and topologies.
> Structure: Definition → purposes → PAN/LAN/MAN/WAN → devices → topologies → comparison

**Q3.** Explain layered network architecture with encapsulation and decapsulation.
> Structure: Layered architecture → services → interfaces → protocols → encapsulation → decapsulation → diagram

### MCQ-Level Facts

- OSI has **7** layers. TCP/IP has **4** layers.
- Router → **Network Layer**. Switch → **Data Link Layer**. Hub → **Physical Layer**.
- IP address → **Network layer**. MAC address → **Data Link layer**. Port number → **Transport layer**.
- Frame → **Data Link**. Packet → **Network**. Segment → **TCP Transport**. Datagram → **UDP Transport**. Bits → **Physical**.
- Simplex → **one-way**. Half-duplex → **two-way, one at a time**. Full-duplex → **two-way simultaneously**.
- Unicast → **one-to-one**. Multicast → **one-to-selected group**. Broadcast → **one-to-all**.
- Syntax → **structure**. Semantics → **meaning**. Timing → **when/how fast**.

### ⚡ 2-Minute Unit 1 Revision

| Concept | Key Points |
|---------|------------|
| **Network** | Devices + communication + data/resource sharing |
| **Communication** | Sender + Receiver + Message + Medium + Protocol |
| **Direction** | Simplex → Half-duplex → Full-duplex |
| **Delivery** | Unicast → Multicast → Broadcast |
| **Size** | PAN → LAN → MAN → WAN |
| **Architecture** | Hardware + Software + Layers + Services + Interfaces + Protocols |
| **Devices** | Hub → Switch → Router |
| **Topologies** | Bus → Star → Ring → Mesh → Tree → Hybrid |
| **Protocol** | Syntax + Semantics + Timing |
| **OSI** | Application → Presentation → Session → Transport → Network → Data Link → Physical |
| **TCP/IP** | Application → Transport → Internet → Network Access |
| **Data journey** | Data → Segment → Packet → Frame → Bits |
| **Addressing** | Port → MAC → IP |
| **Core idea** | Encapsulation going down, decapsulation coming up |

```markdown
# QuickNotes System Architecture

## Requirements
- **Functional Requirements:** User account management, creating, reading, updating, and deleting notes, and tagging notes.
- **Non-Functional Requirements:** High availability (99.9% uptime), low read latency (< 100ms), and secure data transmission and storage.

---

## Load Estimates (1 Million Users)
- **Daily Active Users (DAU):** 100,000 (10% of total)
- **Writes per Second:** 100,000 writes / 86,400 seconds $\approx 1.16 \text{ writes/sec}$ (Peak: $\approx 6 \text{ writes/sec}$)
- **Reads per Second:** 1,000,000 reads / 86,400 seconds $\approx 11.57 \text{ reads/sec}$ (Peak: $\approx 60 \text{ reads/sec}$)
- **Annual Storage:** $100,000 \text{ users} \times 50 \text{ notes/yr} \times 2 \text{ KB/note} \approx 10 \text{ GB/year}$

---

## Architecture Diagram
```text
[Client / Browser]
         │
         ▼
     [  DNS  ]
         │
         ▼
     [  CDN  ] (Caches static frontend assets)
         │
         ▼
[ Load Balancer ] 
         │
         ├──► [ App Server 1 ] ◄──► [ Cache (Redis) ]
         │         │
         │         ├──► [ Primary Database (Writes) ]
         │         │         │
         │         │         ▼
         │         └──► [ Read Replica (Reads) ]
         │
         └──► [ Message Queue ] ──► [ Background Worker ]
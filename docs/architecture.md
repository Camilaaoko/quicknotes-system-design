```markdown
# QuickNotes System Architecture

## Requirements & Load Estimates (1 Million Users)
- **Daily Active Users (DAU):** 100,000 (10% of total)
- **Writes per Second:** $100,000 \text{ writes} / 86,400 \text{ seconds} \approx 1.16 \text{ writes/sec}$ (Peak: $\approx 6 \text{ writes/sec}$)
- **Reads per Second:** $1,000,000 \text{ reads} / 86,400 \text{ seconds} \approx 11.57 \text{ reads/sec}$ (Peak: $\approx 60 \text{ reads/sec}$)

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
Component Responsibilities
DNS: Resolves domain names to IP addresses to route client requests.

CDN: Caches and serves static frontend assets (HTML, CSS, JS) from edge locations close to users.

Load Balancer: Distributes incoming client HTTP traffic evenly across multiple application servers to prevent bottlenecks.

App Servers: Stateless backend servers that process API requests, authentication, and validation logic.

Cache (Redis): Stores frequent read queries in memory for sub-millisecond response times.

Primary Database & Read Replica: Primary handles write transactions, while read replicas scale out read query loads.

Message Queue & Worker: Offloads asynchronous background tasks (such as reminder emails or data exports) from the main request cycle.

Step-by-Step Request Flows
GET /api/v1/notes Flow:
Client sends request ➔ Load Balancer ➔ App Server ➔ Redis Cache (if hit, returns data immediately) OR Read Replica Database (if miss, queries database and caches result) ➔ Data returned to client.

POST /api/v1/notes Flow:
Client sends JSON payload ➔ Load Balancer ➔ App Server ➔ Validates input data ➔ Primary Database (saves note record) ➔ Returns 201 Created response with the new note object.

Trade-Offs & Single Point of Failure (SPOF) Mitigations
Trade-off (Consistency vs. Read Speed): Using database read replicas means users might experience a brief replication delay when fetching newly created notes, but it guarantees high read availability and system scalability.

SPOF Mitigations:

App Servers: Deployed across multiple redundant instances behind a load balancer so that if one server crashes, traffic automatically shifts to healthy servers.

Database: Configured with automated failover and read replicas to eliminate database downtime risks.
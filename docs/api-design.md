# QuickNotes API Design

## Endpoints Table

| Method | Path | Description | Success Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/notes` | List all notes for the authenticated user | `200 OK` |
| `GET` | `/api/v1/notes/:id` | Get a specific note by ID | `200 OK` |
| `POST` | `/api/v1/notes` | Create a new note | `201 Created` |
| `PUT` | `/api/v1/notes/:id` | Update an existing note | `200 OK` |
| `DELETE` | `/api/v1/notes/:id` | Delete a note | `204 No Content` |
| `GET` | `/api/v1/tags` | List all tags created by the user | `200 OK` |

---

## Request & Response Examples

### 1. Creating a Note (`POST /api/v1/notes`)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "title": "Project Planning",
    "body": "Outline system architecture and database schema."
  }
  Response Body (201 Created):

JSON
{
  "id": 42,
  "user_id": 7,
  "title": "Project Planning",
  "body": "Outline system architecture and database schema.",
  "created_at": "2026-10-12T21:00:00Z"
}
2. Listing Notes (GET /api/v1/notes)
Response Body (200 OK):

JSON
[
  {
    "id": 42,
    "user_id": 7,
    "title": "Project Planning",
    "body": "Outline system architecture and database schema.",
    "created_at": "2026-10-12T21:00:00Z"
  },
  {
    "id": 41,
    "user_id": 7,
    "title": "Shopping List",
    "body": "Milk, Bread, Coffee beans",
    "created_at": "2026-10-11T14:30:00Z"
  }
]
Standard Error Status Codes & Payloads
400 Bad Request: Sent when validation fails (e.g., missing title or title exceeds 100 characters).

Error Body: {"error": "Validation Failed", "message": "Title is required and must not exceed 100 characters."}

401 Unauthorized: Sent when missing or invalid authentication tokens.

Error Body: {"error": "Unauthorized", "message": "Authentication token is missing or expired."}

403 Forbidden: Sent when a user attempts to access or modify a note they do not own.

Error Body: {"error": "Forbidden", "message": "You do not have permission to access this resource."}

404 Not Found: Sent when a requested note ID or endpoint does not exist.

Error Body: {"error": "Not Found", "message": "Note with ID 999 not found."}

500 Internal Server Error: Sent when an unexpected database or server failure occurs.

Error Body: {"error": "Internal Server Error", "message": "An unexpected error occurred. Please try again later."}
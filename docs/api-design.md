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

### Creating a Note (`POST /api/v1/notes`)
- **Request Body:**
  ```json
  {
    "title": "Project Planning",
    "body": "Outline system architecture and database schema."
  }
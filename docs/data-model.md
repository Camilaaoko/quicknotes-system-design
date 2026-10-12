```markdown
# QuickNotes Data Model

## Entities & Schemas

1. **`users`**: Stores user account profiles.
   - `id` (INTEGER, PK, Auto-increment)
   - `username` (TEXT, Unique, Not Null)
   - `email` (TEXT, Unique, Not Null)

2. **`notes`**: Stores note content.
   - `id` (INTEGER, PK, Auto-increment)
   - `user_id` (INTEGER, FK referencing `users(id)`, Not Null)
   - `title` (TEXT, Not Null)
   - `body` (TEXT)
   - `created_at` (DATETIME, Default CURRENT_TIMESTAMP)

3. **`tags`**: Stores custom labels for categorizing notes.
   - `id` (INTEGER, PK, Auto-increment)
   - `name` (TEXT, Not Null)

4. **`note_tags`**: Join table connecting notes and tags (many-to-many relationship).
   - `note_id` (INTEGER, FK referencing `notes(id)`, Not Null)
   - `tag_id` (INTEGER, FK referencing `tags(id)`, Not Null)
   - Primary Key: (`note_id`, `tag_id`)

---

## Relationships Explanation
- **One-to-Many (`users` to `notes`)**: One user can author multiple notes, but each note belongs to exactly one user.
- **Many-to-Many (`notes` to `tags`)**: A note can have multiple tags, and a tag can be applied to multiple notes. This is resolved using an intermediate join table (`note_tags`).

---

## CREATE TABLE Statements
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE note_tags (
    note_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
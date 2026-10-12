# QuickNotes Data Model

## Entities & Schemas
1. **`users`**: Stores user account profiles.
2. **`notes`**: Stores note content.
3. **`tags`**: Stores custom labels for categorizing notes.
4. **`note_tags`**: Join table connecting notes and tags (many-to-many relationship).

---

## SQL Table Creation Schema
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
Recommended Index
Index on notes(user_id):

Reason: Users frequently query their own notes list (WHERE user_id = ?). Creating an index on user_id allows the database engine to locate user notes instantly without performing a sequential full-table scan across millions of rows.

SQL vs. NoSQL Justification
For QuickNotes, SQL (Relational Database) is the optimal choice. Relational databases excel at enforcing strict data integrity rules, foreign key constraints (ensuring notes always tie back to valid users), and handling structured transactional data. While NoSQL offers flexible document storage, a note-taking application relies heavily on consistent relationships, user ownership validation, and joining tags with notes, making a relational SQL model far more robust and reliable.

Example Queries
Get all notes for a specific user:

SQL
SELECT id, title, body, created_at 
FROM notes 
WHERE user_id = 7 
ORDER BY created_at DESC;
Get all tags associated with a specific note using a JOIN:

SQL
SELECT t.name 
FROM tags t
JOIN note_tags nt ON t.id = nt.tag_id
WHERE nt.note_id = 42;
Count the total number of notes created by each user:

SQL
SELECT u.username, COUNT(n.id) AS note_count
FROM users u
LEFT JOIN notes n ON u.id = n.user_id
GROUP BY u.id, u.username;
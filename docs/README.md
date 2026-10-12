# QuickNotes System Design & API Client

## Description
QuickNotes is a full-stack project demonstrating a client-side JavaScript API application coupled with enterprise-grade system architecture and database design documents for a 1-million-user note-taking service.

## How to Run the API Client
1. Clone this repository locally.
2. Open `index.html` directly in your web browser, or serve it using a local development server (e.g., Live Server in VS Code).
3. Click **Load Notes** to fetch posts, fill out the form to create a new note, or click **Delete** on any note card.

## Documentation Links
- [API Design Documentation](docs/api-design.md)
- [Data Model Documentation](docs/data-model.md)
- [Architecture Documentation](docs/architecture.md)

## What I Learned
1. How to manage asynchronous data loading, loading states, and error handling safely using `async/await` and `try/catch/finally`.
2. How to design robust relational database schemas complete with foreign keys, normalization, and indexing strategies.
3. How to perform back-of-the-envelope calculations to size server load, traffic peaks, and storage requirements for scale.
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const loadBtn = document.getElementById('load-btn');
const statusP = document.getElementById('status');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const submitBtn = document.getElementById('submit-btn');
const notesList = document.getElementById('notes-list');

let allNotes = [];

function setStatus(message, type = '') {
    statusP.textContent = message;
    statusP.className = type;
}

async function request(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response;
}

function renderNotes() {
    notesList.innerHTML = '';
    
    if (allNotes.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.textContent = "No notes available.";
        notesList.appendChild(emptyLi);
        return;
    }

    allNotes.forEach(note => {
        const li = document.createElement('li');
        
        const contentDiv = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = note.title;
        const p = document.createElement('p');
        p.textContent = note.body;
        
        contentDiv.appendChild(h3);
        contentDiv.appendChild(p);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id, li));

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

async function loadNotes() {
    setStatus("Loading notes...", "");
    loadBtn.disabled = true;

    try {
        const response = await request(`${API_URL}?_limit=10`);
        allNotes = await response.json();
        renderNotes();
        setStatus(`Loaded 10 notes from the server.`, "success");
    } catch (error) {
        setStatus(`Failed to load notes: ${error.message}`, "error");
    } finally {
        loadBtn.disabled = false;
    }
}

async function createNote(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || title.length > 100) {
        alert("Title is required and must be maximum 100 characters.");
        return;
    }

    setStatus("Creating note...", "");
    submitBtn.disabled = true;

    try {
        const response = await request(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body, userId: 1 })
        });
        
        const newNote = await response.json();
        // Note: JSONPlaceholder returns a simulated id (101). 
        // We add it to the top of our local state array to display it immediately.
        allNotes.unshift(newNote);
        renderNotes();
        
        setStatus(`Note created (status ${response.status}, id ${newNote.id}).`, "success");
        noteForm.reset();
    } catch (error) {
        setStatus(`Failed to create note: ${error.message}`, "error");
    } finally {
        submitBtn.disabled = false;
    }
}

async function deleteNote(id, listItemElement) {
    try {
        const response = await request(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        // Remove from local state and UI
        allNotes = allNotes.filter(note => note.id !== id);
        renderNotes();
        setStatus(`Note ${id} deleted successfully (status ${response.status}).`, "success");
    } catch (error) {
        setStatus(`Failed to delete note ${id}: ${error.message}`, "error");
    }
}

loadBtn.addEventListener('click', loadNotes);
noteForm.addEventListener('submit', createNote);
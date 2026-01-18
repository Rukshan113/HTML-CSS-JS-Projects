const container = document.querySelector("#container");
const addNoteBtn = document.querySelector("#addNoteBtn");
const sortBtn = document.querySelector("#sortBtn");
const noteContainer = document.querySelector("#noteContainer");

const newNoteContainer = document.querySelector("#newNoteContainer");
const noteTitle = document.querySelector("#noteTitle");
const noteBody = document.querySelector("#noteBody");

let notes = null;
let currentNote = null;

let sortOrder = "desc";

function sortNotes() {
    if (sortOrder === "desc") {
        notes.sort((a, b) => b.updateAt - a.updateAt);
    } else {
        notes.sort((a, b) => a.updateAt - b.updateAt);
    }
}

function sort(){
    sortOrder = sortOrder === "desc" ? "asc" : "desc";
    loadNotes();
}

function openNoteEditor() {
    container.style.display = "none";
    newNoteContainer.style.display = "flex";
}

function saveNote() {
    const date = Date.now();
    if (!currentNote) {
        if (!noteTitle.value.trim() && !noteBody.value.trim()) return;
        notes.push({
            id: date,
            title: noteTitle.value,
            body: noteBody.value,
            updateAt: date
        });
    } else {
        if (!noteTitle.value.trim() && !noteBody.value.trim()) return;
        currentNote.title = noteTitle.value;
        currentNote.body = noteBody.value;
        currentNote.updateAt = date;
    }

    localStorage.setItem("notes", JSON.stringify(notes));

    noteTitle.value = "";
    noteBody.value = "";
    currentNote = null;
}

function editNote(noteId) {
    currentNote = notes.find(n => n.id === noteId);

    noteTitle.value = currentNote.title;
    noteBody.value = currentNote.body;
}

function loadNotes() {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    noteContainer.innerHTML = "";
    sortNotes();

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];

        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const title = document.createElement("h2");
        title.textContent = `${i+1}. ${note.title}`;

        const body = document.createElement("p");
        body.textContent = note.body.length > 200 ? note.body.slice(0, 200) + "..." : note.body;


        noteDiv.onclick = () => {
            editNote(note.id);
            openNoteEditor();
        };

        noteDiv.appendChild(title);
        noteDiv.appendChild(body);
        noteContainer.appendChild(noteDiv);
    }
}

function closeNote() {
    container.style.display = "block";
    newNoteContainer.style.display = "none";
    saveNote()
    loadNotes();
}

function deleteNote() {
    notes = notes.filter(n => n !== currentNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    container.style.display = "block";
    newNoteContainer.style.display = "none";
    loadNotes();
}

loadNotes();
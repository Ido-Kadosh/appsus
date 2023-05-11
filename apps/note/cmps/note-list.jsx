
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx"
import { utilService } from "../../../services/util.service.js"
import { ColorBgcNote } from "./color-bgc-note.jsx"
import { noteService } from "../services/note.service.js"


// import { BookPreview } from "./book-preview.jsx";

export function NoteList({ notes, onRemoveNote, duplicateNote }) {

    return (
        <ul className="note-list clean-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} onRemoveNote={onRemoveNote} duplicateNote={duplicateNote} />
                </li>
            )}
        </ul>
    )
}

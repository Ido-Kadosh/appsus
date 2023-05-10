
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx"
import { utilService } from "../../../services/util.service.js"
import { ColorBgcNote } from "./color-bgc-note.jsx"
import { noteService } from "../services/note.service.js"


// import { BookPreview } from "./book-preview.jsx";

export function NoteList({ notes, onRemoveNote, duplicateNote, saveNote }) {

    const [isPinned, setIsPinned] = useState(false)

   
    function onDuplicateNote(note) {
        note.id = null
        duplicateNote(note)
    }

    function toggleClassPinned(ev) {
        ev.stopPropagation()
        setIsPinned(prev => !prev)
    }

    const isPinnedClass = isPinned ? 'pinned' : ''

    return (
        <ul className="note-list clean-list">
            {notes.map(note =>
                <li key={note.id}>
                    
                    <NotePreview note={note} saveNote={saveNote} />
                    <section>
                        <section className="tool-bar">
                            <span className="material-symbols-outlined" >
                                image
                            </span>
                            <span className="material-symbols-outlined" >
                                palette
                            </span>
                            <span className="material-symbols-outlined" onClick={() => onRemoveNote(note.id)}>
                                delete
                            </span>
                            <span className="material-symbols-outlined" onClick={() => onDuplicateNote(note)}>
                                content_copy
                            </span>
                            <span className="material-symbols-outlined">
                                label
                            </span>
                        </section>
                    </section>
                </li>
            )}
        </ul>
    )
}

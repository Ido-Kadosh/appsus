
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"
import { utilService } from "../../../services/util.service.js"



export function NoteIndex() {

    const [notes, setNotes] = useState([])
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then(setNotes)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
            showSuccessMsg(`Note removed!`)
        })
        // send in props
    }

    // function onSetFilter(filterBy) {
    //     setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    // }

    function saveNote(newNote) {
        noteService.save(newNote)
            .then((newNote) => {
                setNotes(prevNotes => [...prevNotes, newNote])
                showSuccessMsg('Note saved')
            })
    }

    function duplicateNote(note) {
        const newNote = { ...note, id: null }
        noteService.save(newNote)
            .then((note) => {
                setNotes(prevNotes => [...prevNotes, note])
            })
    }


    return (
        <section className="note-index main-layout">
            {/* <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            <AddNote saveNote={saveNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} duplicateNote={duplicateNote} saveNote={saveNote} />
        </section>

    )


}



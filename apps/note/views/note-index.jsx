
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
            showSuccessMsg(`Book removed!`)
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
        noteService.save(note)
            .then((note) => {
                setNotes(prevNotes => [...prevNotes, note])
            })
    }


    return (
        <section className="note-index main-layout">
            {/* <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            {/* <button><Link to="/book/edit">Add Book</Link></button> */}
            {/* <button><Link to="/book/add-from-google">Add Book From Google</Link></button> */}
            <AddNote saveNote={saveNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} duplicateNote={duplicateNote} saveNote={saveNote} />
        </section>

    )


}



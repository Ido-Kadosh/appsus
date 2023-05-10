
const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { AddNote } from "../cmps/add-note.jsx"



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





    return (
        <section className="note-index">
            {/* <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            {/* <button><Link to="/book/edit">Add Book</Link></button> */}
            {/* <button><Link to="/book/add-from-google">Add Book From Google</Link></button> */}
            <AddNote />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>

    )


}



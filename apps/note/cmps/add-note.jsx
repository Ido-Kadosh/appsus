
const { useState, useRef , useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function AddNote() {

    const [newNote, setNoteToEdit] = useState(noteService.getEmptyNote())


    useEffect(()=> {


        
    } ,[])


    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        if (field === 'txt' || field === 'title') {
            setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
        }
        setNoteToEdit(prevNote => ({ ...prevNote, [field]: value }))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(newNote)
            .then(() => {
                showSuccessMsg('Note saved')
            })
    }


    const { info : {title , txt}} = newNote
    return (
        <section className='add-note'>

            <form className='add-note-form' onSubmit={onSaveNote}>

                {/* <label htmlFor="title">Title:</label> */}
                <input onChange={handleChange} value={title}
                    type="text" name="title" id="title" placeholder="Title" />


                <label htmlFor="txt">Full Name:</label>
                <input onChange={handleChange} value={txt}
                    type="text" name="txt" id="txt" placeholder="Enter Text..." />

                <button>Save</button>
            </form>

        </section>
    )






}
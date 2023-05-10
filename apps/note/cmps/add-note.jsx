
const { useState } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

export function AddNote() {

    const [newNote, setNoteToEdit] = useState(noteService.getEmptyNote())


    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(newNote)
            .then(() => {
                showSuccessMsg('Review saved')
            })
    }

    return (
        <section className='add-note'>

            <form className='add-note-form' onSubmit={onSaveNote}>

                <div contentEditable>title</div>
                <div contentEditable>enter text</div>

                <button>Save</button>
            </form>

        </section>
    )
}
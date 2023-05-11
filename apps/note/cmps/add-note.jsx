
const { useState, useRef, useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { ToolBarNote } from "./tool-bar-note.jsx"
import { ColorBgcNote } from "./color-bgc-note.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteImg } from "./note-img.jsx";
import { NoteVideo } from "./note-video.jsx";
import { NoteTodos } from "./note-todos.jsx";



export function AddNote({ saveNote }) {

    const [isPaletteShown, setIsPaletteShown] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const [newNote, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [noteType, setNoteType] = useState('NoteTxt')

    useEffect(() => {
        document.addEventListener('click', () => setIsPaletteShown(false))
        return (
            () => {
                document.removeEventListener('click', () => setIsPaletteShown(false))
            })


    }, [])

    function togglePalette(ev) {
        ev.stopPropagation()
        setIsPaletteShown(prev => !prev)
    }

    function onSetNoteStyle(newStyle) {
        console.log(newStyle)
        setNoteToEdit(prevNote => ({ ...prevNote, style: { ...newStyle } }))
    }

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
        saveNote(newNote)
        setNoteToEdit(noteService.getEmptyNote())
    }

    function togglePinned(ev) {
        newNote.isPinned = !newNote.isPinned
        setNoteToEdit((prevNote) => ({ ...prevNote, ...isPinned }))
        ev.stopPropagation()
        setIsPinned((prev) => !prev)
    }

    function setTypeByName({ target }) {
        const field = target.getAttribute('name')
        setNoteType(field)
        setNoteToEdit(prevNote => ({ ...prevNote, type: field }))
    }

    const isPinnedClass = isPinned ? 'pinned' : ''
    const { info: { title, txt } } = newNote
    return (
        <section className='add-note' style={newNote.style}>

            <span onClick={togglePinned} className={`${isPinnedClass} material-symbols-outlined `} >
                push_pin
            </span>

            <section className="input-container">

                <DynamicNoteType noteType={noteType} handleChange={handleChange} title={title} txt={txt} />
            </section>


            <div className="tool-bar">
                <span className="material-symbols-outlined" name="NoteTxt" onClick={setTypeByName}>
                    text_format
                </span>
                <span className="material-symbols-outlined" name="NoteImg" onClick={setTypeByName}>
                    image
                </span>
                <span className="material-symbols-outlined" name="NoteVideo" onClick={setTypeByName}>
                    movie
                </span>
                <span className="material-symbols-outlined" onClick={(ev) => togglePalette(ev)}>
                    palette
                </span>
                {isPaletteShown && <ColorBgcNote onSetNoteStyle={onSetNoteStyle} />}
                <span className="material-symbols-outlined">
                    label
                </span>
                <span className="material-symbols-outlined" name="NoteTodos" onClick={setTypeByName}>
                    checklist
                </span>
            </div>
            <button onClick={onSaveNote} className="add-btn">Add</button>

        </section>
    )

}

function DynamicNoteType({ noteType, handleChange, title, txt, }) {
    switch (noteType) {
        case 'NoteTxt':
            return <NoteTxt handleChange={handleChange} title={title} txt={txt} />
        case 'NoteImg':
            return <NoteImg handleChange={handleChange} title={title} />
        case 'NoteVideo':
            return <NoteVideo handleChange={handleChange} />
        case 'NoteTodos':
            return <NoteTodos handleChange={handleChange} />
    }
}


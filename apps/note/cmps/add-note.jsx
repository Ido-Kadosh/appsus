
const { useState, useRef, useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { ToolBarNote } from "./tool-bar-note.jsx"
import { ColorBgcNote } from "./color-bgc-note.jsx";



export function AddNote({ saveNote }) {

    const [isPaletteShown, setIsPaletteShown] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const [newNote, setNoteToEdit] = useState(noteService.getEmptyNote())


    function togglePalette(ev) {
        ev.stopPropagation()
        setIsPaletteShown(prev => !prev)
    }

    useEffect(() => {
        document.addEventListener('click', () => setIsPaletteShown(false))
        return (
            () => {
                document.removeEventListener('click', () => setIsPaletteShown(false))
            })


    }, [])



    function onSetNoteStyle(newStyle) {
        setNoteToEdit(prevNote => ({ ...prevNote, ...newStyle }))
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
    }

    function togglePinned(ev) {
        newNote.isPinned = !newNote.isPinned
        setNoteToEdit((prevNote) => ({ ...prevNote, ...isPinned }))
        ev.stopPropagation()
        setIsPinned((prev) => !prev)
    }


    const isPinnedClass = isPinned ? 'pinned' : ''
    const { info: { title, txt } } = newNote
    return (
        <section className='add-note' style={newNote.style}>

            <span onClick={togglePinned} className={`${isPinnedClass} material-symbols-outlined `} >
                push_pin
            </span>

            <input onChange={handleChange} value={title}
                type="text" name="title" id="title" placeholder="Title" />


            <input onChange={handleChange} value={txt}
                type="text" name="txt" id="txt" placeholder="Enter Text..." />


            <div className="tool-bar">
                <span className="material-symbols-outlined" >
                    image
                </span>
                <span className="material-symbols-outlined" onClick={(ev) => togglePalette(ev)}>
                    palette
                </span>
                {isPaletteShown && <ColorBgcNote onSetNoteStyle={onSetNoteStyle} />}
                <span className="material-symbols-outlined">
                    label
                </span>
                <span className="material-symbols-outlined">
                    checklist
                </span>
            </div>
            <button onClick={onSaveNote} className="add-btn">Add</button>

        </section>
    )






}
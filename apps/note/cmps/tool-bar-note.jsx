

const { useState, useEffect } = React

import { ColorBgcNote } from "./color-bgc-note.jsx";




export function ToolBarNote({ note, onRemoveNote, duplicateNote, onSetNoteStyle }) {

    const [isPaletteShown, setIsPaletteShown] = useState(false)

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

    function onDuplicateNote(note) {
        duplicateNote(note)
    }



    return (
        <section className="tool-bar-note">
            <span className="material-symbols-outlined" >
                image
            </span>
            <span className="material-symbols-outlined" onClick={(ev) => togglePalette(ev)}>
                palette
            </span>
            {isPaletteShown && <ColorBgcNote note={note} onSetNoteStyle={onSetNoteStyle} />}
            <span className="material-symbols-outlined">
                text_format
            </span>
            <span className="material-symbols-outlined" onClick={() => onDuplicateNote(note)}>
                content_copy
            </span>
            <span className="material-symbols-outlined">
                label
            </span>
            <span className="material-symbols-outlined">
                checklist
            </span>
            <span className="material-symbols-outlined">
                attach_email
            </span>
            <span className="material-symbols-outlined" onClick={() => onRemoveNote(note.id)}>
                delete
            </span>

        </section>
    )
}
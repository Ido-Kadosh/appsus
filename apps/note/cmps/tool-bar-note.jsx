

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
            <span className="material-symbols-outlined"
                title="Change color"
                onClick={(ev) => togglePalette(ev)}>
                palette
            </span>
            {isPaletteShown &&
                <ColorBgcNote note={note}
                    onSetNoteStyle={onSetNoteStyle} />}
            <span className="material-symbols-outlined"
                title="Duplicate note"

                onClick={() => onDuplicateNote(note)}>
                content_copy
            </span>
            <span className="material-symbols-outlined"
                title="Add label"
            >
                label
            </span>
            <span className="material-symbols-outlined"
                title="Export as email">
                attach_email
            </span>
            <span className="material-symbols-outlined"
                title="Delete note"
                onClick={() => onRemoveNote(note.id)}>
                delete
            </span>

        </section>
    )
}
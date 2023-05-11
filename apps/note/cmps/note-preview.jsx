const { useState, useRef, useEffect } = React

import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { ToolBarNote } from "./tool-bar-note.jsx";

export function NotePreview({ note, onRemoveNote, duplicateNote, setPinnedNotes, togglePinned }) {

    const { id, info: { txt, title, imgUrl, videoUrl }, type } = note

    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [noteStyle, setNoteStyle] = useState(note.style)

    const elInputTitle = useRef(title)
    const elInputTxt = useRef(txt)

    useEffect(() => {
    }, [])


    function onSetNoteStyle(newStyle) {
        noteService.get(id)
            .then((note) => {
                note.style = newStyle
                return note
            }).then(noteService.save)
        setNoteStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }


    function onTogglePinned(ev) {
        ev.stopPropagation()
        togglePinned(note)
    }



    function onSaveChanges() {
        note.info.title = elInputTitle.current.innerText
        if (type === 'NoteTxt') {
            note.info.txt = elInputTxt.current.innerText || ''
        }
        noteService.save(note)
            .then(() => {
                showSuccessMsg('The changes are saved')
            })
    }

    const isPinnedClass = isPinned ? 'pinned' : ''
    return (


        <article className="note-preview" style={noteStyle}>
            <span onClick={onTogglePinned} className={`${isPinnedClass} material-symbols-outlined pin-icon `} >
                push_pin
            </span>
            <div className="content-editable-container" onBlur={onSaveChanges}>
                <h1
                    ref={elInputTitle}
                    name="title"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                >
                    {title}
                </h1>
                {type === 'NoteTxt' && <p
                    ref={elInputTxt}
                    name="txt"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                >
                    {txt}
                </p>}
                {type === 'NoteImg' &&
                    <img src={imgUrl}></img>
                }
                {type === 'NoteVideo' &&
                    <iframe src={videoUrl}></iframe>
                }
            </div>
            <ToolBarNote onSetNoteStyle={onSetNoteStyle} note={note} onRemoveNote={onRemoveNote} duplicateNote={duplicateNote} />
        </article>
    )
}

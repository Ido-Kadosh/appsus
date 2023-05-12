
const { useState, useRef, useEffect } = React

import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { ToolBarNote } from "./tool-bar-note.jsx"
import { ColorBgcNote } from "./color-bgc-note.jsx";
import { NoteTxt } from "./note-txt.jsx";
import { NoteImg } from "./note-img.jsx";
import { NoteVideo } from "./note-video.jsx";
import { NoteTodos } from "./note-todos.jsx";
import { utilService } from "../../../services/util.service.js";



export function AddNote({ saveNote }) {

    const [isPaletteShown, setIsPaletteShown] = useState(false)
    const [isPinned, setIsPinned] = useState(false)
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
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
        setNewNote(prevNote => ({ ...prevNote, style: { ...newStyle } }))
    }

    function handleChange({ target }, todoIdx) {
        const field = target.name
        console.log(field)
        const value = target.value

        if (field === 'title') {
            setNewNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, 'title': value } }))
        } else if (field === 'todos') {
            setNewNote(prevNote => {
                // const newTodo = { id: utilService.makeId(), txt: value, doneAt: null }
                // const todos = [...prevNote.info.todos]
                prevNote.todos[todoIdx] = noteService.getEmptyTodo()
                prevNote.todos[todoIdx].id = utilService.makeId()
                prevNote.todos[todoIdx].txt = value
                const newTodo = todo[todoIdx]
                return { ...prevNote, info: { title: prevNote.info.title, todos: [...todos, newTodo] } }
            })
        } else {
            setNewNote(prevNote => ({ ...prevNote, info: { title: prevNote.info.title, [field]: value } }))
        }
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        saveNote(newNote)
        setNewNote(noteService.getEmptyNote())
    }

    function togglePinned(ev) {
        newNote.isPinned = !newNote.isPinned
        setNewNote((prevNote) => ({ ...prevNote, ...isPinned }))
        ev.stopPropagation()
        setIsPinned((prev) => !prev)
    }

    function setTypeByName({ target }) {
        const field = target.getAttribute('name')
        setNoteType(field)
        setNewNote(prevNote => ({ ...prevNote, type: field }))
    }

    const isPinnedClass = isPinned ? 'pinned' : ''
    const { info: { title, txt } } = newNote
    return (
        <section className='add-note' style={newNote.style}>

            <span onClick={togglePinned} className={`${isPinnedClass} material-symbols-outlined pin-icon `} >
                push_pin
            </span>

            <section className="input-container ">
                <input onChange={handleChange} value={title}
                    type="text" name="title" id="title" placeholder="Title" />

                <DynamicNoteType noteType={noteType} handleChange={handleChange} txt={txt}
                    imgUrl={newNote.info.imgUrl} videoUrl={newNote.info.videoUrl} todos={newNote.info.todos} />
            </section>

            <div className="btn-container flex space-between">
                <div className="tool-bar">
                    <span className="material-symbols-outlined"
                        title="Change color"
                        onClick={(ev) => togglePalette(ev)}>
                        palette
                    </span>
                    {isPaletteShown &&
                        <ColorBgcNote onSetNoteStyle={onSetNoteStyle} />}
                    <span className="material-symbols-outlined"
                        name="NoteTxt"
                        title="Add text"
                        onClick={setTypeByName}>
                        text_format
                    </span>
                    <span className="material-symbols-outlined"
                        name="NoteImg"
                        title="Add image"
                        onClick={setTypeByName}>
                        image
                    </span>
                    <span className="material-symbols-outlined"
                        name="NoteVideo"
                        title="Add video"
                        onClick={setTypeByName}>
                        movie
                    </span>
                    <span className="material-symbols-outlined">
                        label
                    </span>
                    <span className="material-symbols-outlined"
                        name="NoteTodos"
                        title="Add todos"
                        onClick={setTypeByName}>
                        checklist
                    </span>
                </div>
                <button onClick={onSaveNote} className="add-btn">Add</button>
            </div>
        </section>
    )

}

function DynamicNoteType({ noteType, handleChange, txt, imgUrl, videoUrl, todos }) {
    switch (noteType) {
        case 'NoteTxt':
            return <NoteTxt handleChange={handleChange} txt={txt} />
        case 'NoteImg':
            return <NoteImg handleChange={handleChange} imgUrl={imgUrl} />
        case 'NoteVideo':
            return <NoteVideo handleChange={handleChange} videoUrl={videoUrl} />
        case 'NoteTodos':
            return <NoteTodos handleChange={handleChange} todos={todos} />
    }
}


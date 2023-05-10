
const { useState, useRef, useEffect } = React

import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { showSuccessMsg } from "../../../services/event-bus.service.js";

export function NotePreview({ note, saveNote }) {

    const { info: { txt, title } } = note
    const [isPinned, setIsPinned] = useState(false)

    const elInputTitle = useRef(title)
    const elInputTxt = useRef(txt)

    useEffect(() => {

    }, [])

    function toggleClassPinned(ev) {
        console.log(ev)
        ev.stopPropagation()
        console.log(ev)
        console.log(isPinned)
        setIsPinned((x)=> !x)
        console.log(isPinned)
    }

    
    const isPinnedClass = isPinned ? 'pinned' : ''
    console.log(isPinnedClass)
    console.log(elInputTitle)
    console.log(elInputTxt)

    function onSaveChanges() {
        note.info.title = elInputTitle.current.innerText
        note.info.txt = elInputTxt.current.innerHTML
        noteService.save(note)
            .then(() => {
                showSuccessMsg('The changes are saved')
            })
    }


    return (


        <article className="note-preview">
            <div>
                <div
                    ref={elInputTitle}
                    name="title"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                // onInput={handleContentChange}
                >
                    {elInputTitle.current}
                </div>
                <div
                    ref={elInputTxt}
                    name="txt"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                // onInput={handleContentChange}
                >
                    {elInputTxt.current}
                </div>
            </div>
            <span onClick={toggleClassPinned}  className={`${isPinnedClass} material-symbols-outlined `} >
                push_pin
            </span>
            <button onClick={onSaveChanges}>Save</button>
        </article>
    );
}
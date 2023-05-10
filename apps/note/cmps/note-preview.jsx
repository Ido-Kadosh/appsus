


import { utilService } from "../../../services/util.service.js";

export function NotePreview({ note }) {

    const { info : {txt , title} } = note
    return (
        <article className="note-preview">
            <div>
                <div>{title}</div>
                <div>{txt}</div>
            </div>
        </article>
    )
}
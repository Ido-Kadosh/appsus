


import { utilService } from "../../../services/util.service.js";

export function NotePreview({ note }) {

    const { info } = note
    console.log(info)
    return (
        <article className="note-preview">
            <textarea defaultValue={info.txt} />
        </article>
    )
}
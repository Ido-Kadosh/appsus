import { NotePreview } from "./note-preview.jsx"

const { Link } = ReactRouterDOM

// import { BookPreview } from "./book-preview.jsx";

export function NoteList({ notes , onRemoveNote }) {


    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} />
                    <section>
                        <button onClick={() => onRemoveNote(note.id)} >Remove note</button>
                        {/* <button><Link to={`/book/${book.id}`} >Details</Link ></button> */}
                        {/* <button><Link to={`/book/edit/${book.id}`} >Edit</Link></button> */}

                    </section>
                </li>
            )}
        </ul>
    )
}

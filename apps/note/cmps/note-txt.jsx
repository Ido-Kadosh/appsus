

export function NoteTxt({ handleChange, title, txt }) {

    return (
        <section className="note-txt">
            <input onChange={handleChange} value={title}
                type="text" name="title" id="title" placeholder="Title" />
            <input onChange={handleChange} value={txt}
                type="text" name="txt" id="txt" placeholder="Enter Text..." />
        </section>
    )
}
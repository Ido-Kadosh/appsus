

export function NoteTodos() {


    function onAddTodo() {

        
    }


    return (
        // <h1>Todos</h1>
        <section className="note-todos">

            <input placeholder="Add todo..." type="text" />
            
            <button onClick={onAddTodo}>+</button>
        </section>
    )
}
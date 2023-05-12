const { useState } = React

import { noteService } from "../services/note.service.js"

export function NoteTodos({ handleChange }) {

    const [todos, setTodos] = useState([noteService.getEmptyTodo()])

    function addTodo() {
        console.log(todos)
        setTodos([...todos, noteService.getEmptyTodo()])
    }

    function removeTodo(idx) {
        const updatedTodos = [...todos]
        updatedTodos.splice(idx, 1)
        setTodos(updatedTodos)
    }

    function updateTodo(index, value) {
        const updatedTodos = [...todos]
        updatedTodos[index] = value
        setTodos(updatedTodos)
    }

    function renderTodos() {
        return todos.map((todo, idx) => (
            <div key={idx}>
                <input
                    name="todos"
                    placeholder="Add todo..."
                    type="text"
                    value={todo.txt}
                    onBlur={(ev) => handleChange(ev, idx)}
                    onChange={(ev) => updateTodo(idx, ev.target.value)}
                />
                <button onClick={() => removeTodo(idx)}>X</button>
            </div>
        ))
    }




    return (
        <section className="note-todos">


            {renderTodos()}

            <button onClick={addTodo}>+</button>
        </section>
    )
}
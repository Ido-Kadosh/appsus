const { useEffect, useState } = React
const { Link } = ReactRouterDOM


import { BookList } from "../../cmps/book-list.jsx"
import { bookService } from "../../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { BookDetails } from "./book-details.js"
import { BookFilter } from "../../cmps/book-filter.jsx"


export function BookIndex() {

    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(setBooks)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg(`Book removed!`)

        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (

        <section className="book-index full main-layout">
            <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <button><Link to="/book/edit">Add Book</Link></button>
            <button><Link to="/book/add-from-google">Add Book From Google</Link></button>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}
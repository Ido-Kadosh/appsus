// note service


import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    addTodo,
    removeTodo,
    getEmptyTodo
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.title) || regExp.test(note.info.txt))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(txt = '', title = '', type = 'NoteTxt', isPinned = false, createdAt = Date.now()) {
    return {
        id: '',
        createdAt,
        type,
        isPinned,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            title,
            txt
        }
    }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
    }
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('Fullstack Me Baby!', 'hiiii', 'NoteTxt', false, Date.now()))
        notes.push(_createNote('Coding power', 'hello', 'NoteTxt', false, Date.now()))
        notes.push(_createNote('Fullstack Me Baby!', 'google', 'NoteTxt', false, Date.now()))
        notes.push(_createNote('Driving license', 'gggg', 'NoteTxt', true, Date.now()))
        notes.push(_createNote('Get my stuff together', 'coding academy is the best', 'NoteTxt', true, Date.now()))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type = '', isPinned = '', createdAt = Date.now()) {
    const note = getEmptyNote(type, isPinned, createdAt)
    note.id = utilService.makeId()
    return note
}

function addTodo(noteId, todo) {
    todo.id = utilService.makeId()
    return get(noteId)
        .then((currNote => {
            currNote.todos.push(todo)
            return currNote
        }))
        .then(save)
}

function removeTodo(noteId, todoId) {
    return get(noteId)
        .then(((currNote) => {
            const idx = currNote.todos.findIndex(todo => todo.id === todoId)
            currNote.todos.splice(idx, 1)
            save(currNote)
        }))
}

function getEmptyTodo() {
    return { id: '', txt: '', doneAt: null }
}
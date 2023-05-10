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
    getEmptyNote
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            // if (filterBy.title) {
            //     const regExp = new RegExp(filterBy.title, 'i')
            //     notes = notes.filter(book => regExp.test(book.title))
            // }

            // if (filterBy.maxPrice) {
            //     console.log('hello')
            //     notes = notes.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            // }
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

function getEmptyNote(type = '', isPinned = '', createdAt = Date.now()) {
    return {
        id: '',
        createdAt,
        type,
        isPinned,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    }
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        notes.push(_createNote('NoteTxt', false, Date.now()))
        notes.push(_createNote('NoteTxt', false, Date.now()))
        notes.push(_createNote('NoteTxt', false, Date.now()))
        notes.push(_createNote('NoteTxt', true, Date.now()))
        notes.push(_createNote('NoteTxt', true, Date.now()))
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type = '', isPinned = '', createdAt = Date.now()) {
    const note = getEmptyNote(type, isPinned, createdAt)
    note.id = utilService.makeId()
    return note
}
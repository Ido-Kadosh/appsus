// import { eventBusService } from "../../../services/event-bus.service.js"

// const { useState, useEffect } = React

// export function NoteFilter({ filterBy, onSetFilter }) {
//     const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

//     useEffect(() => {
//         onSetFilter(filterByToEdit)
//     }, [filterByToEdit])

//     // useEffect(() => {
// 	// 	const unsubscribe = eventBusService.on('input-changed', txt => {
// 	// 		setFilterByToEdit(prevFilter => ({ ...prevFilter, txt }))
// 	// 	})
// 	// 	return unsubscribe
// 	// }, [])

//     function handleChange({ target }) {
//         const field = target.name
//         const value = target.value
//         setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
//     }

//     // const { txt, minSpeed } = filterByToEdit
//     return (
//         <h1>h22mlml</h1>
//     )
// }
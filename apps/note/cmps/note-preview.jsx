const { useState, useRef, useEffect } = React

import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

export function NotePreview({ note, saveNote }) {
	const {
		info: { txt, title },
	} = note
	const [isPinned, setIsPinned] = useState(false)

	const elInputTitle = useRef(title)
	const elInputTxt = useRef(txt)
	console.log('elInputTitle.current:', elInputTitle.current)

	useEffect(() => {}, [])

	function toggleClassPinned(ev) {
		ev.stopPropagation()
		setIsPinned(x => !x)
	}

	const isPinnedClass = isPinned ? 'pinned' : ''

	function onSaveChanges() {
		note.info.title = elInputTitle.current.innerText
		note.info.txt = elInputTxt.current.innerText
		noteService.save(note).then(() => {
			showSuccessMsg('The changes are saved')
		})
	}

	return (
		<article className="note-preview">
			<div>
				<div
					ref={elInputTitle}
					name="title"
					contentEditable={true}
					suppressContentEditableWarning={true}
					// onInput={handleContentChange}
				>
					{elInputTitle.current}
				</div>
				<div
					ref={elInputTxt}
					name="txt"
					contentEditable={true}
					suppressContentEditableWarning={true}
					// onInput={handleContentChange}
				>
					{elInputTxt.current}
				</div>
			</div>
			<span onClick={toggleClassPinned} className={`${isPinnedClass} material-symbols-outlined `}>
				push_pin
			</span>
			<button onClick={onSaveChanges}>Save</button>
		</article>
	)
}

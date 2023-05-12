import { eventBusService } from '../services/event-bus.service.js'

const { useState, useRef } = React

export function HeaderSearch({ location = '', value = '' }) {
	const [searchValue, setSearchValue] = useState(value)
	const inputRef = useRef()

	function handleChange({ target: { value } }) {
		eventBusService.emit('input-changed', value)
		setSearchValue(value)
	}

	function onSetFocus() {
		inputRef.current.focus()
	}

	return (
		<form className="header-search">
			<div className="input-container">
				<span onClick={onSetFocus} title="search" className="material-symbols-outlined">
					search
				</span>
				<input
					ref={inputRef}
					value={searchValue}
					onChange={handleChange}
					type="text"
					placeholder={`Search ${location}`}
				/>
			</div>
		</form>
	)
}

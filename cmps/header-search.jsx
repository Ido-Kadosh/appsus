import { eventBusService } from '../services/event-bus.service.js'

const { useState, useEffect } = React

export function HeaderSearch({ location = '', value = '' }) {
	const [searchValue, setSearchValue] = useState(value)

	function handleChange({ target: { value } }) {
		eventBusService.emit('input-changed', value)
		setSearchValue(value)
	}

	return (
		<form className="header-search">
			<div className="input-container">
				<span title="search" className="material-symbols-outlined">
					search
				</span>
				<input value={searchValue} onChange={handleChange} type="text" placeholder={`Search ${location}`} />
			</div>
		</form>
	)
}

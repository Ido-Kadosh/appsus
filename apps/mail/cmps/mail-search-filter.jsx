const { useState, useEffect } = React

export function MailSearchFilter({ filter, onSetFilter }) {
	const [filterToEdit, setFilterToEdit] = useState(filter)

	useEffect(() => {
		onSetFilter(filterToEdit)
	}, [filterToEdit])

	function handleChange({ target }) {
		const field = target.name
		const value = target.type === 'number' ? +target.value || '' : target.value
		setFilterToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}

	const { txt } = filterToEdit
	return (
		<form className="mail-search-filter">
			<input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="Search mail" />
		</form>
	)
}

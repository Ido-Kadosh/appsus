export function MailSort({ onSortBy, sort }) {
	function onSort(type) {
		const newSort = sort[type] ? sort[type] * -1 : 1
		onSortBy({ [type]: newSort })
	}

	return (
		<form onSubmit={ev => ev.preventDefault()} className="mail-sort">
			<button onClick={() => onSort('read')} className="sort-by-read">
				read
				{sort.read === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
				{sort.read === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
			</button>
			<button onClick={() => onSort('starred')} className="sort-by-starred">
				starred
				{sort.starred === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
				{sort.starred === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
			</button>
			<button onClick={() => onSort('date')} className="sort-by-date">
				date
				{sort.date === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
				{sort.date === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
			</button>
			<button onClick={() => onSort('subject')} className="sort-by-subject">
				subject
				{sort.subject === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
				{sort.subject === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
			</button>
		</form>
	)
}

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailSidebarFilter({ filter, onSetFilter, active }) {
	const [filterToEdit, setFilterToEdit] = useState(filter)
	const navigate = useNavigate()

	useEffect(() => {
		onSetFilter(filterToEdit)
	}, [filterToEdit])

	function setFilter(field, value) {
		console.log('value:', value)
		console.log('field:', field)
		setFilterToEdit({ ...mailService.getDefaultFilter(), [field]: value })
	}

	return (
		<ul className="clean-list mail-sidebar-filter">
			<li className={active === 'inbox' ? 'active' : ''} onClick={() => navigate('/mail/inbox')}>
				<span class="material-symbols-outlined">inbox</span>
			</li>
			<li className={active === 'starred' ? 'active' : ''} onClick={() => navigate('/mail/starred')}>
				<span class="material-symbols-outlined">star</span>
			</li>
			{/* <li onClick={() => setFilter('isStarred', false)}>Unstarred</li> */}
			<li className={active === 'sent' ? 'active' : ''} onClick={() => navigate('/mail/sent')}>
				<span class="material-symbols-outlined">arrow_right_alt</span>
			</li>
			<li className={active === 'draft' ? 'active' : ''} onClick={() => navigate('/mail/draft')}>
				<span class="material-symbols-outlined">draft</span>
			</li>
			<li className={active === 'trash' ? 'active' : ''} onClick={() => navigate('/mail/trash')}>
				<span class="material-symbols-outlined">Delete</span>
			</li>
			{/* <li onClick={() => setFilter('isRead', true)}>Read</li> */}
			{/* <li onClick={() => setFilter('isReadd', false)}>Unread</li> */}
		</ul>
	)
}

const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

import { eventBusService } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

export function MailSidebarFilter({ filter, onSetFilter, active, isExpanded }) {
	const [filterToEdit, setFilterToEdit] = useState(filter)
	const navigate = useNavigate()
	const timeoutIdRef = useRef()

	useEffect(() => {
		onSetFilter(filterToEdit)
	}, [filterToEdit])

	useEffect(() => {
		const unsubscribe = eventBusService.on('input-changed', txt => {
			setFilterToEdit(prevFilter => ({ ...prevFilter, txt }))
		})
		return unsubscribe
	}, [])

	function setFilter(path) {
		if (active === path) navigate('/mail')
		else navigate(`/mail/${path}`)
	}

	return (
		<ul className="clean-list mail-sidebar-filter">
			<li className={active === 'inbox' ? 'active' : ''} onClick={() => setFilter('inbox')}>
				<span className="material-symbols-outlined">inbox</span>
				{isExpanded && <span>Inbox</span>}
			</li>
			<li className={active === 'starred' ? 'active' : ''} onClick={() => setFilter('starred')}>
				<span className="material-symbols-outlined">star</span>
				{isExpanded && <span>Starred</span>}
			</li>
			{/* <li onClick={() => setFilter('isStarred', false)}>Unstarred</li> */}
			<li className={active === 'sent' ? 'active' : ''} onClick={() => setFilter('sent')}>
				<span className="material-symbols-outlined">send</span>
				{isExpanded && <span>Sent</span>}
			</li>
			<li className={active === 'draft' ? 'active' : ''} onClick={() => setFilter('draft')}>
				<span className="material-symbols-outlined">draft</span>
				{isExpanded && <span>Drafts</span>}
			</li>
			<li className={active === 'trash' ? 'active' : ''} onClick={() => setFilter('trash')}>
				<span className="material-symbols-outlined">Delete</span>
				{isExpanded && <span>Deleted</span>}
			</li>
			{/* <li onClick={() => setFilter('isRead', true)}>Read</li> */}
			{/* <li onClick={() => setFilter('isReadd', false)}>Unread</li> */}
		</ul>
	)
}

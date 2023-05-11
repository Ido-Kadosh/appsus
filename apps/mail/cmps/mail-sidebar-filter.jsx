const { useState, useEffect, useRef } = React
const { useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailSidebarFilter({ filter, onSetFilter }) {
	const [filterToEdit, setFilterToEdit] = useState(filter)
	const params = useParams()

	// if (params.filter) {
	// 	setFilter('status', 'inbox')
	// }

	useEffect(() => {
		onSetFilter(filterToEdit)
	}, [filterToEdit])

	function setFilter(field, value) {
		setFilterToEdit({ ...mailService.getDefaultFilter(), [field]: value })
	}

	return (
		<ul className="clean-list mail-sidebar-filter">
			<li onClick={() => setFilter('status', 'inbox')}>Inbox</li>
			<li onClick={() => setFilter('isStarred', true)}>Starred</li>
			{/* <li onClick={() => setFilter('isStarred', false)}>Unstarred</li> */}
			<li onClick={() => setFilter('status', 'sent')}>Sent</li>
			<li onClick={() => setFilter('status', 'draft')}>Drafts</li>
			<li onClick={() => setFilter('status', 'trash')}>Trash</li>
			{/* <li onClick={() => setFilter('isRead', true)}>Read</li> */}
			{/* <li onClick={() => setFilter('isReadd', false)}>Unread</li> */}
		</ul>
	)
}

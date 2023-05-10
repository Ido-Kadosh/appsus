const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [filter, setFilter] = useState(mailService.getDefaultFilter())

	useEffect(() => {
		loadMails()
	}, [filter])

	function onSetFilter(filter) {
		setFilter(prevFilter => ({ ...prevFilter, ...filter }))
	}

	function setMailReadStatus(mailId, isRead) {
		mailService.get(mailId).then(mail => {
			if (mail.isRead === isRead) return // no need to save twice
			const newMail = { ...mail, isRead }
			mailService.save(newMail)
		})
	}

	function loadMails() {
		mailService.query(filter).then(setMails).catch(console.log)
	}
	return (
		<main className="mail-index">
			<MailFilter onSetFilter={onSetFilter} filter={filter} />
			<MailList mails={mails} setMailReadStatus={setMailReadStatus} />
		</main>
	)
}

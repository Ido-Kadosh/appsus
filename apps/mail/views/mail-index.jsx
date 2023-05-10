const { useEffect, useState, Fragment } = React
const { Outlet, Link, useSearchParams } = ReactRouterDOM

import { MailFilter } from '../cmps/mail-filter.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [filter, setFilter] = useState(mailService.getDefaultFilter())
	const [unreadMailCount, setUnreadMailCount] = useState(0)

	useEffect(() => {
		loadMails()
	}, [filter])

	useEffect(() => {
		mailService.query({ isRead: false }).then(mails => {
			setUnreadMailCount(mails.length)
		})
	}, [mails])

	useEffect(() => {
		document.title = `Appsus Mail (${unreadMailCount})`
	}, [unreadMailCount])

	function onSetFilter(filter) {
		setFilter(prevFilter => ({ ...prevFilter, ...filter }))
	}

	function onSetMailReadStatus(mailId, isRead) {
		mailService.get(mailId).then(mail => {
			// I wanted to check here if isRead = mail.isRead, but it made issues with clicking very fast.
			// TODO make unreadMailCount save in local storage so that we don't call server unnecessarily

			const diff = isRead ? -1 : 1
			setUnreadMailCount(prev => prev + diff)
			const newMail = { ...mail, isRead }
			mailService.save(newMail)
		})
	}

	function onRemoveMail(mailId) {
		mailService.remove(mailId).then(() => {
			setMails(mails.filter(mail => mail.id !== mailId))
			// showSuccessMsg(`Car (${mailId}) removed!`)
		})
	}

	function loadMails() {
		mailService.query(filter).then(setMails).catch(console.log)
	}
	return (
		<Fragment>
			<main className="mail-index">
				<MailFilter onSetFilter={onSetFilter} filter={filter} />
				<Link to="/mail/compose">Compose</Link>
				<MailList mails={mails} onRemoveMail={onRemoveMail} onSetMailReadStatus={onSetMailReadStatus} />
			</main>
			<Outlet />
		</Fragment>
	)
}

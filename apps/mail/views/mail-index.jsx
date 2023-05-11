const { useEffect, useState, Fragment } = React
const { Outlet, Link, useSearchParams, useParams, useNavigate } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailSearchFilter } from '../cmps/mail-search-filter.jsx'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
import { MailSidebarFilter } from '../cmps/mail-sidebar-filter.jsx'

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
			showSuccessMsg(`Email removed!`)
		})
	}

	function loadMails() {
		mailService.query(filter).then(setMails).catch(console.log)
	}
	return (
		<Fragment>
			<MailSearchFilter onSetFilter={onSetFilter} filter={filter} />
			<main className="mail-index">
				<section className="mail-sidebar">
					<Link to="/mail/compose">Compose</Link>
					<MailSidebarFilter onSetFilter={onSetFilter} filter={filter} />
				</section>
				<MailList mails={mails} onRemoveMail={onRemoveMail} onSetMailReadStatus={onSetMailReadStatus} />
			</main>
			<Outlet context={loadMails} /> {/* compose mail outlet */}
		</Fragment>
	)
}

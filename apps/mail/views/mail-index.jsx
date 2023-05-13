const { useEffect, useState, Fragment } = React
const { Outlet, Link, useSearchParams, useParams, useNavigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
import { MailSidebar } from '../cmps/mail-sidebar.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [filter, setFilter] = useState(mailService.getDefaultFilter())
	const [sort, setSort] = useState({ read: 1 })
	const [unreadMailCount, setUnreadMailCount] = useState(0)
	const [searchParams, setSearchParams] = useSearchParams()
	const params = useParams()

	if (params.filter) {
		if (['inbox', 'sent', 'trash', 'draft'].includes(params.filter)) {
			if (filter.status != params.filter) onSetFilter({ status: params.filter, isStarred: null }) // avoid infinite loop
		} else if (params.filter === 'starred') {
			if (!filter.isStarred) onSetFilter({ isStarred: true, status: null }) // avoid infinite loop
		}
	} else {
		// if we navigate back to default inbox after navigating with params, load default inbox without filters.
		if (filter.status || filter.isStarred) onSetFilter({ isStarred: null, status: null })
	}

	useEffect(() => {
		loadMails()
	}, [filter, sort])

	useEffect(() => {
		setFilter(prevFilter => ({ ...prevFilter, txt: searchParams.get('txt') }))
	}, [searchParams])

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

	function loadMails() {
		mailService.query(filter, sort).then(setMails).catch(console.log)
	}

	function onSetMailReadStatus(mailId, isRead) {
		mailService.get(mailId).then(mail => {
			const diff = isRead ? -1 : 1
			setUnreadMailCount(prev => prev + diff)
			const newMail = { ...mail, isRead }
			mailService.save(newMail)
		})
	}

	function onRemoveMail(mailId) {
		mailService.get(mailId).then(mail => {
			if (mail.removedAt) {
				onFullDeleteMail(mailId)
				return
			}
			const newMail = { ...mail, removedAt: Date.now() }
			mailService.save(newMail).then(() => {
				setMails(mails.filter(mail => mail.id !== mailId))
			})
		})
	}

	function onFullDeleteMail(mailId) {
		confirm('are you sure you want to delete mail forever?')
		mailService.remove(mailId).then(() => {
			// these mails are only shown when we're at the "removed" page, so we can act like we're "deleting" them from that page.
			setMails(mails.filter(mail => mail.id !== mailId))
			showSuccessMsg(`Email removed!`)
		})
	}

	function restoreMail(mailId) {
		mailService.get(mailId).then(mail => {
			const newMail = { ...mail, removedAt: null }
			mailService.save(newMail).then(() => setMails(mails.filter(mail => mail.id !== mailId)))
		})
		showSuccessMsg('Email restored!')
	}
	return (
		<Fragment>
			<main className="mail-index">
				<MailSidebar active={params.filter} />
				{!params.mailId && (
					<MailList
						sort={sort}
						onSetSort={setSort}
						mails={mails}
						onRemoveMail={onRemoveMail}
						onSetMailReadStatus={onSetMailReadStatus}
						restoreMail={restoreMail}
					/>
				)}
				{params.mailId && <MailDetails />}
			</main>
			<Outlet context={loadMails} /> {/* compose mail outlet */}
		</Fragment>
	)
}

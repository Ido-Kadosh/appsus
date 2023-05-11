const { useEffect, useState, Fragment } = React
const { Outlet, Link, useSearchParams, useParams, useNavigate } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { mailService } from '../services/mail.service.js'
import { MailSidebarFilter } from '../cmps/mail-sidebar-filter.jsx'

export function MailIndex() {
	const [mails, setMails] = useState([])
	const [filter, setFilter] = useState(mailService.getDefaultFilter())
	const [unreadMailCount, setUnreadMailCount] = useState(0)
	const [isExpanded, setIsExpanded] = useState(false)
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

	function loadMails() {
		mailService.query(filter).then(setMails).catch(console.log)
	}

	const isExpandedClass = isExpanded ? 'expanded' : ''
	return (
		<Fragment>
			<main className="mail-index">
				<section
					onMouseOut={() => setIsExpanded(false)}
					onMouseOver={() => setIsExpanded(true)}
					className={`${isExpandedClass}  mail-sidebar`}>
					<Link className="compose-icon-container" to="/mail/compose">
						<span className="compose-icon material-symbols-outlined">edit</span>
						{isExpanded && <span className="compose-text">Compose</span>}
					</Link>
					<MailSidebarFilter
						isExpanded={isExpanded}
						active={params.filter}
						onSetFilter={onSetFilter}
						filter={filter}
					/>
				</section>
				<MailList
					mails={mails}
					onRemoveMail={onRemoveMail}
					onSetMailReadStatus={onSetMailReadStatus}
					restoreMail={restoreMail}
				/>
			</main>
			<Outlet context={loadMails} /> {/* compose mail outlet */}
		</Fragment>
	)
}

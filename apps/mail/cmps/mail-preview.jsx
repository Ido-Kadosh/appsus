const { useNavigate, createSearchParams } = ReactRouterDOM
const { useState, useEffect, Fragment } = React
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailPreview({ mail, onSetMailReadStatus, onRemoveMail, restoreMail }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isRead, setIsRead] = useState(mail.isRead)
	const [isStarred, setIsStarred] = useState(mail.isStarred)
	const navigate = useNavigate()

	useEffect(() => {
		mailService.save({ ...mail, isStarred })
	}, [isStarred])

	const { from, subject, body, sentAt, to, removedAt } = mail

	function handleMailOpening(ev) {
		ev.stopPropagation()
		setIsExpanded(prev => !prev)
		// only call these if mail wasn't already read.
		if (!isRead) {
			setIsRead(true)
			onSetMailReadStatus(mail.id, true)
		}
	}
	function getDateText(ms) {
		const timeStamp = new Date(ms)
		return utilService.formatMailDate(timeStamp)
	}

	function onSetStarred(ev) {
		ev.stopPropagation() // prevent mail opening when starred
		setIsStarred(prev => !prev)
	}

	function onSetReadStatus(ev, isReadStatus) {
		ev.stopPropagation()
		onSetMailReadStatus(mail.id, isReadStatus)
		setIsRead(isReadStatus)
	}

	function onDeleteMail(ev) {
		ev.stopPropagation()
		onRemoveMail(mail.id)
	}

	function onRestoreMail(ev) {
		ev.stopPropagation()
		restoreMail(mail.id)
	}

	function onOpenFullScreen(ev) {
		ev.stopPropagation()
		navigate(`/mail/details/${mail.id}`)
	}

	function onSendToNotes(ev) {
		ev.stopPropagation()
		const mailToSend = { title: subject, txt: body }
		console.log('mailToSend:', mailToSend)
		navigate({
			pathname: '/note',
			search: `?${createSearchParams(mailToSend)}`,
		})
	}

	const isReadClass = isRead ? '' : 'unread'
	const isStarredClass = isStarred ? 'starred' : 'un-starred'
	const starTitle = isStarred ? 'Starred' : 'Not starred'

	return (
		<Fragment>
			<li onClick={handleMailOpening} className={`mail-preview ${isReadClass}`}>
				{/* <span className="material-symbols-outlined checkbox">check_box_outline_blank</span> */}
				<span
					onClick={onSetStarred}
					title={starTitle}
					className={`${isStarredClass} material-symbols-outlined`}>
					star
				</span>
				<div className="main-mail-container">
					<span className="mail-from">{from}</span>
					<span className="mail-subject">{subject}</span>
					<span className="mail-separator">-</span>
					<span className="mail-body">{body}</span>
				</div>
				<span className="mail-date">{getDateText(sentAt)}</span>
				<div className="icons-container">
					{!removedAt && (
						<span
							onClick={ev => onSendToNotes(ev)}
							title="Save as note"
							className="save-as-note material-symbols-outlined">
							near_me
						</span>
					)}
					{removedAt && (
						<span title="Restore" onClick={onRestoreMail} className="material-symbols-outlined">
							restore_from_trash
						</span>
					)}
					{!isRead && (
						<span
							title="Mark as read"
							onClick={ev => onSetReadStatus(ev, true)}
							className="mark-as-read material-symbols-outlined">
							drafts
						</span>
					)}
					{isRead && (
						<span
							title="Mark as unread"
							onClick={ev => onSetReadStatus(ev, false)}
							className="mark-as-unread material-symbols-outlined">
							mail
						</span>
					)}

					<span title="Delete" onClick={onDeleteMail} className="delete-icon material-symbols-outlined">
						delete
					</span>
				</div>
			</li>
			{isExpanded && (
				<li className={'full-mail'}>
					<span>
						<h2>{from}</h2>
						<h5>to {to}</h5>
						<span onClick={onOpenFullScreen} className="material-symbols-outlined">
							fullscreen
						</span>
						<p>{body}</p>
					</span>
				</li>
			)}
		</Fragment>
	)
}

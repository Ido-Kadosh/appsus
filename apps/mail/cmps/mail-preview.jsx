const { useNavigate, createSearchParams } = ReactRouterDOM
const { useState, useEffect, Fragment } = React
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailPreview({ mail, onSetMailReadStatus, onRemoveMail, restoreMail }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isRead, setIsRead] = useState(mail.isRead)
	const [isStarred, setIsStarred] = useState(mail.isStarred)
	const [isFullScreen, setFullScreen] = useState(false)
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

	function onToggleFullScreen() {
		setFullScreen(prev => !prev)
	}

	function onSendToNotes(ev) {
		ev.stopPropagation()
		const mailToSend = { subject, body }
		navigate({
			pathname: '/note',
			search: `?${createSearchParams(mailToSend)}`,
		})
	}

	const isReadClass = isRead ? '' : 'unread'
	const isStarredClass = isStarred ? 'starred' : ''
	const starTitle = isStarred ? 'Starred' : 'Not starred'
	const isFullScreenClass = isFullScreen ? 'full-screen' : ''

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
				<span className="mail-from">{from}</span>
				<span className="mail-subject">{subject}</span>
				<span className="mail-separator">-</span>
				<span className="mail-body">{body}</span>
				<span className="mail-date">{getDateText(sentAt)}</span>
				<div className="icons-container">
					{!removedAt && (
						<span
							onClick={ev => onSendToNotes(ev)}
							title="Save as note"
							className="material-symbols-outlined">
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
							className="material-symbols-outlined">
							drafts
						</span>
					)}
					{isRead && (
						<span
							title="Mark as unread"
							onClick={ev => onSetReadStatus(ev, false)}
							className="material-symbols-outlined">
							mail
						</span>
					)}

					<span title="Delete" onClick={onDeleteMail} className="material-symbols-outlined">
						delete
					</span>
				</div>
			</li>
			{isExpanded && (
				<li className={`${isFullScreenClass} full-mail`}>
					<span>
						<h2>{from}</h2>
						<h5>to {to}</h5>
						<span onClick={onToggleFullScreen} className="material-symbols-outlined">
							fullscreen
						</span>
						<p>{body}</p>
					</span>
				</li>
			)}
			{isFullScreen && <div className="close-modal-screen" onClick={() => onToggleFullScreen()}></div>}
		</Fragment>
	)
}

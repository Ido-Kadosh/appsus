const { useState, useEffect, Fragment } = React
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailPreview({ mail, onSetMailReadStatus, onRemoveMail }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isRead, setIsRead] = useState(mail.isRead)
	const [isStarred, setIsStarred] = useState(mail.isStarred)

	useEffect(() => {
		mailService.save({ ...mail, isStarred })
	}, [isStarred])

	function handleMailOpening() {
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

	const isReadClass = isRead ? '' : 'unread'
	const isStarredClass = isStarred ? 'starred' : ''
	const starTitle = isStarred ? 'Starred' : 'Not starred'

	const { from, subject, body, sentAt, to } = mail
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
					<span onClick={onDeleteMail} className="material-symbols-outlined">
						delete
					</span>
				</div>
			</li>
			{isExpanded && (
				<li className="full-mail">
					<span>
						<h2>{from}</h2>
						<h5>to {to}</h5>
						<p>{body}</p>
					</span>
				</li>
			)}
		</Fragment>
	)
}

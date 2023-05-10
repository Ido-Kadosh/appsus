const { useState, Fragment } = React
import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, setMailReadStatus }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isRead, setIsRead] = useState(mail.isRead)
	const { from, subject, body, sentAt, to } = mail

	function handleMailOpening() {
		setIsExpanded(prev => !prev)
		setIsRead(true)
		setMailReadStatus(mail.id, true)
	}
	function getDateText(ms) {
		const timeStamp = new Date(ms)
		let monthName = utilService.getMonthShortName(timeStamp.getMonth())
		monthName += ' ' + timeStamp.getDate()
		return monthName
	}

	const isReadClass = isRead ? '' : 'unread'

	return (
		<Fragment>
			<li onClick={handleMailOpening} className={`mail-preview ${isReadClass}`}>
				<span className="icon material-symbols-outlined">star</span>
				<span className="mail-from">{from}</span>
				<span className="mail-subject">{subject}</span>
				<span className="mail-separator">-</span>
				<span className="mail-body">{body}</span>
				<span className="mail-date">{getDateText(sentAt)}</span>
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

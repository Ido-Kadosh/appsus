import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSetMailReadStatus, onRemoveMail }) {
	return (
		<ul className="mail-list">
			{mails.map(mail => (
				<MailPreview
					key={mail.id}
					mail={mail}
					onRemoveMail={onRemoveMail}
					onSetMailReadStatus={onSetMailReadStatus}
				/>
			))}
		</ul>
	)
}

import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, setMailReadStatus }) {
	return (
		<ul className="mail-list">
			{mails.map(mail => (
				<MailPreview key={mail.id} mail={mail} setMailReadStatus={setMailReadStatus} />
			))}
		</ul>
	)
}

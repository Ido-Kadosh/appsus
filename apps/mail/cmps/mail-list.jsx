const { Fragment } = React

import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onSetMailReadStatus, onRemoveMail, restoreMail }) {
	const mailCount = mails.length
	return (
		<Fragment>
			{!!mailCount && (
				<ul className="clean-list mail-list">
					{mails.map(mail => (
						<MailPreview
							key={mail.id}
							mail={mail}
							onRemoveMail={onRemoveMail}
							onSetMailReadStatus={onSetMailReadStatus}
							restoreMail={restoreMail}
						/>
					))}
				</ul>
			)}
			{!mailCount && <h1 className="no-mails-info">No mails here</h1>}
		</Fragment>
	)
}

const { Fragment } = React

import { MailPreview } from './mail-preview.jsx'
import { MailSort } from './mail-sort.jsx'

export function MailList({ mails, onSetMailReadStatus, onRemoveMail, restoreMail, sort, onSetSort }) {
	return (
		<div className="mail-list-container">
			<MailSort onSortBy={onSetSort} sort={sort} />
			{!!mails.length && (
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
			{!mails.length && <h1 className="no-mails-info">No mails here</h1>}
		</div>
	)
}

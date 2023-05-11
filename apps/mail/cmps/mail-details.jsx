const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'

export function MailDetails() {
	const [mail, setMail] = useState()
	const { mailId } = useParams()
	mailService.get(mailId).then(setMail)

	useEffect(() => {
		loadMail()
	}, [mailId])

	function loadMail() {
		mailService.get(mailId).then(setMail).catch(console.log)
	}

	if (!mail) return <h1>Loading...</h1>
	return (
		<section className="mail-details">
			<h1>subject{mail.subject}</h1>
			<h6>from {mail.from}</h6>
			<p>from {mail.body}</p>
		</section>
	)
}

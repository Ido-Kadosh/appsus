import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

const { useState } = React
const { useNavigate, useOutletContext } = ReactRouterDOM

export function MailCompose() {
	const navigate = useNavigate()
	const [newMail, setNewMail] = useState(mailService.getEmptyMail())
	const [isMinimized, setIsMinimized] = useState(false)
	const loadMails = useOutletContext()
	function onAddMail(ev) {
		ev.preventDefault()
		if (!utilService.validateMail(newMail.to)) {
			showErrorMsg('invalid Email Address!')
			return
		}
		mailService.save({ ...newMail, sentAt: Date.now(), from: mailService.getLoggedUser().email }).then(() => {
			showSuccessMsg('Email Sent!')
			navigate('/mail')
			loadMails()
		})
	}

	function onMinimize(isMinimizeState) {
		setIsMinimized(isMinimizeState)
	}

	function handleChange({ target: { value, name } }) {
		setNewMail(prev => ({ ...prev, [name]: value }))
	}

	const isMinimizedClass = isMinimized ? 'minimized' : ''
	const { subject, body, to } = newMail
	return (
		<section className={`${isMinimizedClass} mail-compose`}>
			<header
				onClick={() => {
					onMinimize(!isMinimized)
				}}>
				<h2>New Message</h2>
				<div className="icon-container">
					{!isMinimized && (
						<span onClick={() => onMinimize(true)} className="material-symbols-outlined">
							minimize
						</span>
					)}
					{isMinimized && (
						<span onClick={() => onMinimize(false)} className="material-symbols-outlined">
							add
						</span>
					)}
					<span className="material-symbols-outlined">open_in_full</span>
					<span
						onClick={() => {
							navigate('/mail')
						}}
						className="material-symbols-outlined">
						close
					</span>
					{/* <span class="material-symbols-outlined">close_fullscreen</span> */}
				</div>
			</header>
			<div className="form-container">
				<form onSubmit={onAddMail}>
					<input value={to} onChange={handleChange} name="to" id="to" type="text" placeholder="To" />
					<input
						value={subject}
						onChange={handleChange}
						name="subject"
						id="subject"
						type="text"
						placeholder="Subject"
					/>
					<textarea value={body} onChange={handleChange} name="body" id="body" type="text" />
					<section className="tool-bar">
						<button className="btn-send-mail">Send</button>
						<div className="icon-container">
							<span className="material-symbols-outlined">attach_file</span>
							<span className="material-symbols-outlined">image</span>
						</div>
					</section>
				</form>
			</div>
		</section>
	)
}

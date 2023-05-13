import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

const { useState, Fragment } = React
const { useNavigate, useOutletContext, useSearchParams } = ReactRouterDOM

export function MailCompose() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [newMail, setNewMail] = useState(mailService.getMailFromSearchParams(searchParams))
	const [isMinimized, setIsMinimized] = useState(false)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const navigate = useNavigate()
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

	function onMinimize(isMinimizeState, ev) {
		if (ev) ev.stopPropagation()
		setIsMinimized(isMinimizeState)
		setIsFullScreen(false)
	}

	function handleChange({ target: { value, name } }) {
		setNewMail(prev => ({ ...prev, [name]: value }))
		setSearchParams({ subject: newMail.subject, body: newMail.body })
	}

	function onFullScreen(newIsFullScreen, ev) {
		if (ev) ev.stopPropagation()
		setIsFullScreen(newIsFullScreen)
		setIsMinimized(false)
	}

	function handleBackgroundDiv() {
		if (isFullScreen) setIsFullScreen(false) // if pressed when screen is large, go out of fullscreen.
		else navigate('/mail') // if pressed when screen is small, close.
	}

	const { matches: isSmallScreen } = window.matchMedia('(max-width:600px')
	const isFullScreenClass = isFullScreen ? 'full-screen' : ''
	const isMinimizedClass = isMinimized ? 'minimized' : ''
	const { subject, body, to } = newMail
	return (
		<Fragment>
			<section className={`${isMinimizedClass}${isFullScreenClass} mail-compose`}>
				<header
					onClick={() => {
						onMinimize(!isMinimized)
					}}>
					<h4>New Message</h4>
					<div className="icon-container">
						{!isMinimized && (
							<span onClick={ev => onMinimize(true, ev)} className="material-symbols-outlined">
								minimize
							</span>
						)}
						{isMinimized && (
							<span onClick={ev => onMinimize(false, ev)} className="material-symbols-outlined">
								add
							</span>
						)}
						{!isFullScreen && (
							<span onClick={ev => onFullScreen(true, ev)} className="material-symbols-outlined">
								open_in_full
							</span>
						)}
						{isFullScreen && (
							<span onClick={ev => onFullScreen(false, ev)} className="material-symbols-outlined">
								close_fullscreen
							</span>
						)}
						<span
							onClick={() => {
								navigate('/mail')
							}}
							className="material-symbols-outlined">
							close
						</span>
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
						</section>
					</form>
				</div>
			</section>
			{(isFullScreen || isSmallScreen) && (
				<div className="close-modal-screen" onClick={handleBackgroundDiv}></div>
			)}
		</Fragment>
	)
}

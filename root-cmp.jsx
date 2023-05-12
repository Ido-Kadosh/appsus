const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/app-header.jsx'
import { About } from './views/about.jsx'
import { Home } from './views/home.jsx'
import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { NoteIndex } from './apps/note/views/note-index.jsx'
import { MailCompose } from './apps/mail/cmps/mail-compose.jsx'
import { UserMsg } from './cmps/user-msg.jsx'
import { MailDetails } from './apps/mail/cmps/mail-details.jsx'

export function App() {
	return (
		<Router>
			<section className="app">
				<AppHeader />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/mail/:filter" element={<MailIndex />} />
					<Route path="/mail/details/:mailId" element={<MailIndex />} />
					<Route path="/mail" element={<MailIndex />}>
						<Route path="/mail/compose" element={<MailCompose />} />
					</Route>

					<Route path="/note" element={<NoteIndex />} />
				</Routes>
			</section>
			<UserMsg />
		</Router>
	)
}

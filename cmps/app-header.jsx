import { HeaderSearch } from './header-search.jsx'

const { useState, useEffect } = React

const { Link, NavLink, useLocation } = ReactRouterDOM

export function AppHeader() {
	const [isVisible, setIsVisible] = useState()
	function toggleNavPreview(ev) {
		ev.stopPropagation()
		setIsVisible(prev => !prev)
	}

	useEffect(() => {
		document.addEventListener('click', onCloseModals)
		return () => {
			document.removeEventListener('click', onCloseModals)
		}
	})

	function onCloseModals(ev) {
		setIsVisible(false)
	}

	const visibleClass = isVisible ? '' : 'hidden'
	const currentPath = useLocation().pathname.split('/')[1]
	return (
		<header className="app-header">
			<Link to="/">
				<img className="app-header-logo" src="assets\img\favicon.svg" />
			</Link>
			{['note', 'mail'].includes(currentPath) && <HeaderSearch location={currentPath} />}
			<span title="Appsus apps" onClick={toggleNavPreview} className="app-header-hamburger ">
				<span className="material-symbols-outlined">apps</span>
				<nav className={`${visibleClass} header-apps`}>
					<NavLink className="home" title="Home" to="/">
						<img src="/assets/img/home_logo.svg" alt="home" />
					</NavLink>
					<NavLink className="mail" title="Mail" to="/mail">
						<img src="/assets/img/mail_Logo.svg" alt="mail" />
					</NavLink>
					<NavLink className="note" title="Notes" to="/note">
						<img src="/assets/img/notes_logo.svg" alt="notes" />
					</NavLink>
					<NavLink className="book" title="Books" to="/book">
						<img src="/assets/img/books_logo.png" alt="books" />
					</NavLink>
				</nav>
			</span>
		</header>
	)
}

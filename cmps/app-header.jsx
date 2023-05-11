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
			<span
				title="Appsus apps"
				onClick={toggleNavPreview}
				className="app-header-hamburger material-symbols-outlined">
				apps
				<nav className={`${visibleClass} header-apps`}>
					<NavLink className="home" title="Home" to="/">
						Home
					</NavLink>
					<NavLink className="about" title="About" to="/about">
						info
					</NavLink>
					<NavLink className="mail" title="Mail" to="/mail">
						mail
					</NavLink>
					<NavLink className="note" title="Notes" to="/note">
						note
					</NavLink>
				</nav>
			</span>
		</header>
	)
}

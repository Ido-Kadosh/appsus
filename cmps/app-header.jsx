const { useState, useEffect } = React

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
	const [isVisible, setIsVisible] = useState()
	function toggleNavPreview(ev) {
		ev.stopPropagation()
		setIsVisible(prev => !prev)
	}

	useEffect(() => {
		document.addEventListener('click', onCLoseModals)
		return () => {
			document.removeEventListener('click', onCLoseModals)
		}
	})

	function onCLoseModals(ev) {
		setIsVisible(false)
	}

	const visibleClass = isVisible ? '' : 'hidden'
	return (
		<header className="app-header">
			<Link to="/">
				<img className="app-header-logo" src="assets\img\favicon.svg" />
			</Link>
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
						Mail
					</NavLink>
					<NavLink className="note" title="Notes" to="/note">
						Note
					</NavLink>
				</nav>
			</span>
		</header>
	)
}

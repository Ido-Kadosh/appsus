import { MailFilter } from './mail-filter.jsx'

const { useState } = React
const { Link } = ReactRouterDOM

export function MailSidebar({ active, filter }) {
	const [isExpanded, setIsExpanded] = useState(false)
	const isExpandedClass = isExpanded ? 'expanded' : ''
	return (
		<section
			className={`${isExpandedClass}  mail-sidebar`}
			onMouseOut={() => setIsExpanded(false)}
			onMouseOver={() => setIsExpanded(true)}>
			<Link className="compose-icon-container" to="/mail/compose">
				<span className="compose-icon material-symbols-outlined">edit</span>
				{isExpanded && <span className="compose-text">Compose</span>}
			</Link>
			<MailFilter isExpanded={isExpanded} active={active} filter={filter} />
		</section>
	)
}

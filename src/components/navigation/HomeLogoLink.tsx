import { Link, useLocation } from 'react-router-dom'
import { scrollToTopInstantly } from '@/lib/scroll'

type HomeLogoLinkProps = {
	className?: string
	children: React.ReactNode
}

export function HomeLogoLink({ className, children }: HomeLogoLinkProps) {
	const { pathname } = useLocation()

	return (
		<Link
			to='/'
			className={className}
			onClick={() => {
				if (pathname === '/') {
					scrollToTopInstantly()
				}
			}}
		>
			{children}
		</Link>
	)
}

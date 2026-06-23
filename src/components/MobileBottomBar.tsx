import { NavLink, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { cn } from '@/lib/utils'

function isNavActive(pathname: string, hash: string, to: string, end?: boolean): boolean {
	if (to === '/') {
		return pathname === '/' && !hash
	}
	if (to.includes('#')) {
		const anchor = to.split('#')[1]
		return pathname === '/' && hash === `#${anchor}`
	}
	if (end) return pathname === to
	return pathname === to || pathname.startsWith(`${to}/`)
}

function HomeIcon({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
			<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
		</svg>
	)
}

function EventsIcon({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
			<path d="M8 21h8M6 4h12v16H6zM9 8h6M9 12h6" />
		</svg>
	)
}

function ParkIcon({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
			<path d="M12 22s7-4.5 7-12a7 7 0 1 0-14 0c0 7.5 7 12 7 12z" />
			<circle cx="12" cy="10" r="2.5" />
		</svg>
	)
}

function StartIcon({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
			<path d="M5 12h14M12 5l7 7-7 7" />
		</svg>
	)
}

const mobileNavItems = [
	{ label: 'Главная', to: '/', end: true, Icon: HomeIcon },
	{ label: 'Турниры', to: '/events', Icon: EventsIcon },
	{ label: 'Парк H3', to: '/parkh3', end: true, Icon: ParkIcon },
	{ label: 'Начать', to: '/#join-cta-heading', Icon: StartIcon },
] as const

function MobileNavItem({
	to,
	label,
	end,
	Icon,
}: {
	to: string
	label: string
	end?: boolean
	Icon: typeof HomeIcon
}) {
	const { pathname, hash } = useLocation()
	const active = isNavActive(pathname, hash, to, end)

	return (
		<NavLink
			to={to}
			end={end}
			className={cn(
				'mobile-bar-link flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1.5 transition-colors',
				active ? 'text-primary' : 'text-muted-foreground',
			)}
		>
			<Icon className="h-5 w-5 shrink-0" />
			<span className="max-w-full truncate text-[10px] font-medium leading-none">
				{label}
			</span>
		</NavLink>
	)
}

export function MobileBottomBar() {
	return (
		<nav className="site-mobile-bar md:hidden" aria-label="Мобильная навигация">
			<div className="site-mobile-bar-inner">
				{mobileNavItems.map((item) => (
					<MobileNavItem
						key={item.to}
						to={item.to}
						label={item.label}
						end={'end' in item ? item.end : undefined}
						Icon={item.Icon}
					/>
				))}
				<div className="flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1.5">
					<ThemeToggle compact />
					<span className="text-muted-foreground text-[10px] font-medium leading-none">
						Тема
					</span>
				</div>
			</div>
		</nav>
	)
}

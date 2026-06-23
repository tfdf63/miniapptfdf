import { NavLink, useLocation } from 'react-router-dom'
import { config } from '@/config'
import { siteNav, siteTitleShort, type NavItem } from '@/config/nav'
import { DiscLogoIcon } from '@/components/icons/DiscLogoIcon'
import { HomeLogoLink } from '@/components/navigation/HomeLogoLink'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function isNavActive(pathname: string, hash: string, to: string, end?: boolean): boolean {
	if (to.includes('#')) {
		const anchor = to.split('#')[1]
		return pathname === '/' && hash === `#${anchor}`
	}
	if (end) return pathname === to
	return pathname === to || pathname.startsWith(`${to}/`)
}

function HeaderNavLink({
	to,
	label,
	end,
	className,
}: NavItem & { className?: string }) {
	const { pathname, hash } = useLocation()
	const active = isNavActive(pathname, hash, to, end)

	return (
		<NavLink
			to={to}
			end={end}
			className={cn(
				'text-sm font-medium transition-colors',
				active
					? 'text-primary'
					: 'text-muted-foreground hover:text-foreground',
				className,
			)}
		>
			{label}
		</NavLink>
	)
}

export function SiteHeader() {
	return (
		<header className="site-header sticky top-0 z-40 hidden md:block">
			<div className="site-header-inner container mx-auto max-w-6xl px-4">
				<HomeLogoLink
					className="site-header-logo flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
				>
					<DiscLogoIcon />
					<span className="font-display truncate text-lg font-bold leading-none tracking-tight">
						{siteTitleShort}
					</span>
				</HomeLogoLink>

				<nav
					className="site-header-nav flex items-center gap-8"
					aria-label="Основная навигация"
				>
					{siteNav.map((item) => (
						<HeaderNavLink key={item.to} {...item} />
					))}
				</nav>

				<div className="site-header-actions flex items-center gap-3">
					<ThemeToggle />
					<Button
						asChild
						className="site-header-cta btn-gradient-cyber border-0"
					>
						<a
							href={config.contactLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Telegram
						</a>
					</Button>
				</div>
			</div>
		</header>
	)
}

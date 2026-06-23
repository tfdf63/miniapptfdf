import { Outlet } from 'react-router-dom'
import { PageBackground } from '@/components/layout/PageBackground'
import { MobileBottomBar } from '@/components/MobileBottomBar'
import { SiteHeader } from '@/components/SiteHeader'

export function SiteLayout() {
	return (
		<div className="relative flex min-h-screen flex-col">
			<PageBackground />
			<SiteHeader />
			<div className="site-main flex flex-1 flex-col pb-[var(--mobile-bar-offset)] md:pb-0">
				<Outlet />
			</div>
			<MobileBottomBar />
		</div>
	)
}

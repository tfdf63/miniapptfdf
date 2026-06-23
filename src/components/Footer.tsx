import { Link } from 'react-router-dom'
import { siteTitleShort } from '@/config/nav'
import { DiscLogoIcon } from '@/components/icons/DiscLogoIcon'
import { HomeLogoLink } from '@/components/navigation/HomeLogoLink'
import { SocialIconLinks } from '@/components/social/SocialIconLinks'

type FooterLink = {
	label: string
	href: string
	external?: boolean
}

type FooterColumn = {
	title: string
	links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
	{
		title: 'Соревнования',
		links: [
			{ label: 'Турниры', href: '/events' },
			{ label: 'Игроки', href: '/players' },
			{
				label: 'Клуб на Metrix',
				href: 'https://discgolfmetrix.com/club/2019',
				external: true,
			},
		],
	},
	{
		title: 'Дисциплины',
		links: [
			{ label: 'Алтимат', href: '/#disciplines-heading' },
			{ label: 'Диск-гольф', href: '/#disciplines-heading' },
		],
	},
	{
		title: 'Федерация',
		links: [
			{ label: 'Диск-гольф парк H3', href: '/parkh3' },
			{ label: 'Начать', href: '/#join-cta-heading' },
		],
	},
]

function FooterNavLink({ label, href, external }: FooterLink) {
	const className =
		'text-muted-foreground text-sm transition-colors hover:text-foreground'

	if (external || href.startsWith('http')) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={className}
			>
				{label}
			</a>
		)
	}

	return (
		<Link to={href} className={className}>
			{label}
		</Link>
	)
}

export function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer className="site-footer relative mt-16 w-screen max-w-[100vw] -translate-x-1/2 left-1/2 border-t border-primary/15 bg-background/95 backdrop-blur-md">
			<div className="site-footer-inner container mx-auto max-w-6xl px-4 py-12 md:py-14">
				<div className="site-footer-grid grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
					<div className="space-y-4 sm:col-span-2 lg:col-span-1 lg:max-w-sm">
						<HomeLogoLink className="site-footer-brand inline-flex items-center gap-3 transition-opacity hover:opacity-90">
							<DiscLogoIcon className="h-11 w-11 rounded-xl" />
							<span className="font-display text-xl font-bold tracking-tight">
								{siteTitleShort}
							</span>
						</HomeLogoLink>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Федерация флаинг диска Тольятти
						</p>
						<SocialIconLinks />
					</div>

					{footerColumns.map((column) => (
						<div key={column.title} className="space-y-4">
							<h2 className="font-display text-sm font-semibold text-foreground">
								{column.title}
							</h2>
							<ul className="space-y-3">
								{column.links.map((link) => (
									<li key={link.label}>
										<FooterNavLink {...link} />
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="site-footer-bar mt-10 flex flex-col gap-3 border-t border-primary/15 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {year} Федерация флаинг диска Тольятти.
						<span className='hidden sm:inline'> </span>
						<span className='block sm:inline'>Все права защищены.</span>
					</p>
					<div className="flex flex-wrap gap-4">
						<a
							href="https://t.me/slava_tfdf"
							target="_blank"
							rel="noopener noreferrer"
							className="transition-colors hover:text-foreground"
						>
							Telegram
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}

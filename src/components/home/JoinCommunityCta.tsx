import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const telegramContactLink = 'https://t.me/slava_tfdf'

const highlights = [
	{
		label: 'Командный дух',
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.75'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='h-5 w-5'
				aria-hidden
			>
				<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
				<circle cx='9' cy='7' r='4' />
				<path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
			</svg>
		),
	},
	{
		label: 'Для всех уровней',
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.75'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='h-5 w-5'
				aria-hidden
			>
				<circle cx='12' cy='12' r='10' />
				<circle cx='12' cy='12' r='6' />
				<circle cx='12' cy='12' r='2' />
			</svg>
		),
	},
	{
		label: 'Турниры и тренировки',
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.75'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='h-5 w-5'
				aria-hidden
			>
				<path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
				<path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
				<path d='M4 22h16' />
				<path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22' />
				<path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22' />
				<path d='M18 2H6v7a6 6 0 0 0 12 0V2Z' />
			</svg>
		),
	},
] as const

function ArrowIcon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='h-[18px] w-[18px]'
			aria-hidden
		>
			<path d='M5 12h14M13 6l6 6-6 6' />
		</svg>
	)
}

export function JoinCommunityCta() {
	return (
		<section
			id='join-cta'
			className='join-cta relative scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 py-4 md:scroll-mb-0 md:scroll-mt-[var(--header-height)] md:py-8'
			aria-labelledby='join-cta-heading'
		>
			<div
				className='pointer-events-none absolute inset-x-0 top-1/2 h-48 -translate-y-1/2 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 blur-3xl'
				aria-hidden
			/>

			<div className='relative mx-auto max-w-3xl space-y-8 text-center'>
				<div className='space-y-4'>
					<h2
						id='join-cta-heading'
						className='join-cta-heading font-display font-bold tracking-tight'
					>
						Готовы начать своё путешествие в{' '}
						<span className='hero-highlight'>мир летающих дисков?</span>
					</h2>
					<p className='text-muted-foreground mx-auto max-w-[540px] text-base leading-relaxed md:text-lg'>
						Присоединяйтесь к нескольким сотням увлечённых игроков. Напишите нам
						и начните исследовать мир уже сегодня!
					</p>
				</div>

				<div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4'>
					<Button
						asChild
						className='hero-btn btn-gradient-cyber w-fit min-h-[52px] border-0 px-8'
					>
						<a
							href={telegramContactLink}
							target='_blank'
							rel='noopener noreferrer'
						>
							Написать в Telegram
							<ArrowIcon />
						</a>
					</Button>
				</div>

				<ul className='grid grid-cols-2 justify-items-center gap-x-6 gap-y-3 sm:flex sm:flex-row sm:justify-center sm:gap-10 md:gap-14'>
					{highlights.map(({ label, icon }, index) => (
						<li
							key={label}
							className={cn(
								'text-muted-foreground flex items-center gap-2.5 text-sm',
								index === 2 && 'col-span-2 sm:col-span-1',
							)}
						>
							<span className='text-primary/80'>{icon}</span>
							{label}
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

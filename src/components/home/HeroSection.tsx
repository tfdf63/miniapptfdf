import { useEffect, useState } from 'react'
import { fetchEvents } from '@/api/events'
import { fetchClubMembers } from '@/api/club'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const DISCIPLINES_COUNT = 2

type HeroStats = {
	players: number | null
	competitions: number | null
}

function formatStatValue(value: number | null) {
	return value == null ? '—' : String(value)
}

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

export function HeroSection() {
	const [stats, setStats] = useState<HeroStats>({
		players: null,
		competitions: null,
	})

	useEffect(() => {
		let cancelled = false

		Promise.all([fetchClubMembers({ limit: 1 }), fetchEvents()])
			.then(([club, events]) => {
				if (cancelled) return
				setStats({
					players: club.totalCount,
					competitions: events.events.length,
				})
			})
			.catch(() => {})

		return () => {
			cancelled = true
		}
	}, [])

	const statItems = [
		{ value: formatStatValue(stats.players), label: 'Игроки' },
		{ value: formatStatValue(stats.competitions), label: 'Соревнования' },
		{ value: String(DISCIPLINES_COUNT), label: 'Дисциплины' },
	] as const

	return (
		<section
			className='relative -mx-4 px-4 pt-6 pb-10 md:py-16 lg:min-h-[calc(100vh-var(--header-height)-4rem)] lg:py-20'
			aria-labelledby='hero-heading'
		>
			<div
				className='pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5'
				aria-hidden
			/>

			<div className='relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] lg:gap-20 xl:gap-24'>
				<div className='hero-copy flex w-full flex-col items-start gap-5 text-left md:gap-7 lg:gap-8'>
					<div className='hero-badge'>
						<span className='hero-badge-dot' aria-hidden />
						Ближайшие тренировки · Telegram
					</div>

					<h1 id='hero-heading' className='hero-heading font-display w-full'>
						<span className='block'>Алтимат и</span>
						<span className='hero-highlight block'>диск-гольф</span>
						<span className='block'>в Тольятти</span>
					</h1>

					<p className='hero-subtext text-muted-foreground w-full max-w-[500px]'>
						Федерация флаинг диска Тольятти (ФФДТ) проводит тренировки и
						турниры, поддерживает парк «H3» и развивает алтимат и диск-гольф в
						городе.
					</p>

					<div className='hero-actions flex flex-col items-start gap-3 md:flex-row md:gap-4'>
						<Button asChild className='hero-btn btn-gradient-cyber border-0'>
							<a href='#join-heading'>
								Как присоединиться
								<ArrowIcon />
							</a>
						</Button>
						<Button asChild variant='outline-glass' className='hero-btn'>
							<Link to='/parkh3'>Парк H3</Link>
						</Button>
					</div>

					<dl className='hero-stats grid w-full grid-cols-3 gap-4 border-t border-primary/15 pt-6 md:gap-6 md:pt-8 lg:max-w-[420px] lg:gap-10'>
						{statItems.map(({ value, label }) => (
							<div key={label} className='space-y-1.5'>
								<dt className='sr-only'>{label}</dt>
								<dd className='hero-stat-value font-display tabular-nums'>
									{value}
								</dd>
								<dd className='hero-stat-label text-muted-foreground uppercase tracking-wide'>
									{label}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	)
}

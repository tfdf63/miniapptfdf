import { config } from '@/config'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ultimateTelegramLink = `${config.communityLink}?text=${encodeURIComponent('Хочу записаться на алтимат')}`

const stats = [
	{ value: '2', label: 'Дисциплины' },
	{ value: '1', label: 'Парк H3' },
	{ value: '3+', label: 'Лиги' },
] as const

function ArrowIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-[18px] w-[18px]"
			aria-hidden
		>
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	)
}

function DiscIllustration() {
	return (
		<div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400/25 via-primary/15 to-accent/25">
			<div
				className="absolute inset-0 opacity-40"
				style={{
					backgroundImage:
						'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.45), transparent 50%)',
				}}
				aria-hidden
			/>
			<svg
				viewBox="0 0 120 120"
				className="relative h-[120px] w-[120px] text-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
				aria-hidden
			>
				<circle cx="60" cy="60" r="48" fill="currentColor" opacity="0.12" />
				<circle
					cx="60"
					cy="60"
					r="48"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
				/>
				<circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.9" />
				<path
					d="M60 12 A48 48 0 0 1 108 60"
					fill="none"
					stroke="hsl(var(--accent))"
					strokeWidth="4"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	)
}

export function HeroSection() {
	return (
		<section
			className="relative -mx-4 px-4 py-12 md:py-16 lg:min-h-[calc(100vh-var(--header-height)-4rem)] lg:py-20"
			aria-labelledby="hero-heading"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"
				aria-hidden
			/>

			<div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] lg:gap-20 xl:gap-24">
				{/* Left column */}
				<div className="flex flex-col gap-6 text-center lg:gap-8 lg:text-left">
					<div className="hero-badge mx-auto lg:mx-0">
						<span className="hero-badge-dot" aria-hidden />
						Ближайшие тренировки · Telegram
					</div>

					<h1 id="hero-heading" className="hero-heading font-display">
						Алтимат и{' '}
						<span className="hero-highlight">диск-гольф</span> в Тольятти
					</h1>

					<p className="hero-subtext text-muted-foreground mx-auto lg:mx-0">
						Федерация флаинг диска Тольятти: тренировки, турниры и парк «H3».
						Присоединяйтесь к сообществу — для детей и взрослых, новичков и
						опытных игроков.
					</p>

					<div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-4">
						<Button
							asChild
							className="hero-btn btn-gradient-cyber w-full border-0 sm:w-auto"
						>
							<a href={ultimateTelegramLink} target="_blank" rel="noopener noreferrer">
								Записаться на алтимат
								<ArrowIcon />
							</a>
						</Button>
						<Button
							asChild
							variant="outline-glass"
							className="hero-btn w-full sm:w-auto"
						>
							<a href="#park-h3">Парк H3</a>
						</Button>
					</div>

					<dl className="grid grid-cols-3 gap-6 border-t border-primary/15 pt-8 lg:max-w-[420px] lg:gap-10">
						{stats.map(({ value, label }) => (
							<div key={label} className="space-y-1.5">
								<dt className="sr-only">{label}</dt>
								<dd className="hero-stat-value font-display tabular-nums">{value}</dd>
								<dd className="hero-stat-label text-muted-foreground uppercase tracking-wide">
									{label}
								</dd>
							</div>
						))}
					</dl>
				</div>

				{/* Right column — featured card */}
				<div className="relative mx-auto w-full lg:mx-0 lg:justify-self-end">
					<div
						className="hero-float-card glass-panel absolute -top-2 left-3 z-10 flex items-center gap-2.5 shadow-neon-sm sm:left-5 lg:-top-3 lg:left-0"
						aria-hidden
					>
						<span className="hero-float-icon flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary font-bold text-primary-foreground">
							+
						</span>
						<span className="leading-tight">
							Новый игрок?{' '}
							<strong className="font-semibold text-primary">Telegram</strong>
						</span>
					</div>

					<article className="hero-card glass-panel mx-auto w-full overflow-hidden shadow-neon-md">
						<div className="hero-card-image-wrap relative">
							<DiscIllustration />
							<span className="hero-live-badge absolute right-7 top-7 bg-amber-400 font-bold uppercase text-amber-950">
								Открыт
							</span>
						</div>

						<div className="hero-card-body flex flex-col gap-5">
							<div className="space-y-1">
								<h2 className="font-display text-[1.125rem] font-bold leading-snug">
									Диск-гольф парк «H3»
								</h2>
								<p className="text-muted-foreground text-sm leading-snug">
									ФФДТ · Тольятти
								</p>
							</div>

							<div className="grid grid-cols-2 gap-6">
								<div className="space-y-1">
									<p className="text-muted-foreground text-xs leading-none">Статус</p>
									<p className="font-display text-xl font-semibold leading-tight text-primary">
										Играем
									</p>
								</div>
								<div className="space-y-1">
									<p className="text-muted-foreground text-xs leading-none">Маршрут</p>
									<p className="font-display text-xl font-semibold leading-tight tabular-nums">
										18 лунок
									</p>
								</div>
							</div>

							<div className="flex items-end justify-between gap-4 border-t border-primary/15 pt-5">
								<div className="min-w-0 space-y-0.5">
									<p className="text-muted-foreground text-xs leading-none">
										Прокат дисков
									</p>
									<p className="text-sm leading-snug">В группе ФФДТ</p>
								</div>
								<Button
									asChild
									className={cn('hero-card-btn btn-gradient-cyber shrink-0 border-0')}
								>
									<a
										href={config.communityLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										Узнать
									</a>
								</Button>
							</div>
						</div>
					</article>
				</div>
			</div>
		</section>
	)
}

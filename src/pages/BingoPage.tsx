import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBingoStandings } from '@/api/bingo'
import { BingoStandingsTable } from '@/components/bingo/BingoStandingsTable'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageMeta } from '@/components/seo/PageMeta'
import type { BingoStandingsPayload } from '@/types/bingo'

function formatSeasonRange(start: string, end: string) {
	const startDate = new Date(start.includes('T') ? start : `${start}T12:00:00`)
	const endDate = new Date(end.includes('T') ? end : `${end}T12:00:00`)
	const startLabel = startDate.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
	})
	const endLabel = endDate.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	const endWithoutSuffix = endLabel.replace(/\s*г\.?\s*$/i, '')
	return `${startLabel} — ${endWithoutSuffix} г.`
}

const BINGO_BOT_URL = 'https://t.me/bingodg_bot'

function LayoutLink({ href }: { href: string }) {
	return (
		<>
			H3 →{' '}
			<a
				href={href}
				target='_blank'
				rel='noreferrer'
				className='text-cyan-400 hover:underline'
			>
				Турнирная 2025
			</a>
		</>
	)
}

function BingoRules({ layoutReferenceUrl }: { layoutReferenceUrl: string }) {
	return (
		<ul className='list-disc space-y-2 pl-5 text-muted-foreground'>
			<li>
				<strong className='text-foreground'>Как участвовать:</strong> создайте
				тренировку в Metrix на лейауте <LayoutLink href={layoutReferenceUrl} />{' '}
				(2–5 игроков), до игры отправьте ID раунда в{' '}
				<a
					href={BINGO_BOT_URL}
					target='_blank'
					rel='noreferrer'
					className='text-cyan-400 hover:underline'
				>
					Telegram-бот
				</a>
				, после игры — /recalc.
			</li>
			<li>
				<strong className='text-foreground'>Засчитывается раунд,</strong> если
				он сыгран полностью по эталонному лейауту, без DNF, в пределах сезона.
				Без шуточных бросков, как в турнире. Не более{' '}
				<strong>1 засчитанного раунда в календарный день</strong> на игрока.
			</li>
			<li>
				<strong className='text-foreground'>По каждому отрезку</strong> хранится
				ваш лучший зачётный результат за сезон. Отрезки не «закрываются» —
				каждый новый раунд может улучшить или ухудшить итог.
			</li>
			<li>
				<strong className='text-foreground'>Результат на отрезке:</strong>{' '}
				<strong>−1, −2 или эйс</strong> — если лучше текущего, обновляет итог;{' '}
				<strong>par или +1</strong> — не меняет итог; <strong>+2 и хуже</strong>{' '}
				— сбрасывает отрезок в 0 очков (нужен новый −1/−2/эйс в следующем
				раунде).
			</li>
			<li>
				<strong className='text-foreground'>Очки за отрезок:</strong> birdie
				(−1) — <strong>1</strong>, eagle (−2) — <strong>2</strong>, эйс —{' '}
				<strong>4</strong>. Итог турнира — сумма очков по всем лункам.
			</li>
		</ul>
	)
}

function BackLink() {
	return (
		<Button
			asChild
			variant='ghost-glow'
			size='sm'
			className='min-h-[44px] -ml-2'
		>
			<Link to='/events'>← Все соревнования</Link>
		</Button>
	)
}

export function BingoPage() {
	const [data, setData] = useState<BingoStandingsPayload | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [rulesOpen, setRulesOpen] = useState(false)

	useEffect(() => {
		fetchBingoStandings()
			.then(setData)
			.catch((err: Error) => setError(err.message))
			.finally(() => setLoading(false))
	}, [])

	return (
		<>
			<PageMeta noindex title='BINGO' />
			<PageShell wide>
				<BackLink />

				<SectionHeading
					title='BINGO'
					subtitle='Соревнуйтесь на тренировочных раундах'
					className='mt-4'
				/>

				{loading && (
					<Skeleton className='glass-panel mt-8 h-64 w-full rounded-2xl' />
				)}

				{error && (
					<GlassCard className='mt-8'>
						<GlassCardContent className='pt-6 text-destructive text-sm'>
							{error}
						</GlassCardContent>
					</GlassCard>
				)}

				{data && (
					<div className='mt-8 space-y-6'>
						<GlassCard>
							<GlassCardContent className='space-y-3 pt-6 text-sm leading-7'>
								<p>
									<span className='text-muted-foreground'>Сезон:</span>{' '}
									{formatSeasonRange(
										data.season.seasonStart,
										data.season.seasonEnd,
									)}
								</p>
								<p>
									<span className='text-muted-foreground'>Лейаут:</span>{' '}
									<LayoutLink href={data.season.layoutReferenceUrl} />
								</p>
								<Button
									type='button'
									variant='ghost-glow'
									size='sm'
									className='min-h-[44px] -ml-2'
									aria-expanded={rulesOpen}
									onClick={() => setRulesOpen(open => !open)}
								>
									{rulesOpen ? 'Скрыть правила' : 'Посмотреть правила'}
								</Button>
								{rulesOpen && (
									<BingoRules
										layoutReferenceUrl={data.season.layoutReferenceUrl}
									/>
								)}
							</GlassCardContent>
						</GlassCard>

						<div className='space-y-4'>
							<h2 className='font-display text-xl font-semibold'>Рейтинг</h2>
							{data.players.length === 0 ? (
								<p className='text-muted-foreground py-12 text-center'>
									Пока нет засчитанных раундов. Отправьте ID тренировки в
									Telegram-бот.
								</p>
							) : (
								<BingoStandingsTable
									season={data.season}
									players={data.players}
								/>
							)}
						</div>
					</div>
				)}

				<Footer />
			</PageShell>
		</>
	)
}

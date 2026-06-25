import { Link } from 'react-router-dom'
import { HeroSection } from '@/components/home/HeroSection'
import { JoinCommunityCta } from '@/components/home/JoinCommunityCta'
import { FeaturedPlayersSection } from '@/components/club/FeaturedPlayersSection'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Community } from '@/components/Community'
import { Button } from '@/components/ui/button'
import {
	GlassCard,
	GlassCardContent,
	GlassCardHeader,
	GlassCardTitle,
} from '@/components/ui/glass-card'

const ultimateTrainingLink = 'https://t.me/c/1082679397/13965'
const discGolfStartLink = 'https://t.me/tfdf63/5892'

export function Home() {
	return (
		<article className='space-y-16 pb-12 md:space-y-24 md:pb-16'>
			<HeroSection />

			{/* Дисциплины */}
			<section className='px-0' aria-labelledby='disciplines-heading'>
				<SectionHeading
					id='disciplines-heading'
					title='Дисциплины'
					subtitle='Две дисциплины флаинг диска — алтимат и диск-гольф'
				/>
				<div className='mt-8 grid gap-6 sm:grid-cols-2 sm:items-stretch'>
					<GlassCard glow className='flex h-full flex-col'>
						<GlassCardHeader>
							<GlassCardTitle className='font-display text-xl'>
								Алтимат
							</GlassCardTitle>
							<p className='text-muted-foreground text-sm'>
								Командная игра с летающим диском
							</p>
						</GlassCardHeader>
						<GlassCardContent className='flex flex-1 flex-col gap-4'>
							<p className='leading-7 sm:flex-1'>
								Алтимат — командный игровой вид спорта с летающим диском. Цель
								игры: забить гол, поймав диск в голевой зоне соперника. С диском
								нельзя бегать. Его можно передавать от игрока к игроку по
								воздуху. Из рук в руки нельзя.
							</p>
							<Button
								asChild
								variant='neon'
								className='min-h-[44px] w-fit'
							>
								<a
									href={ultimateTrainingLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									Записаться на тренировку
								</a>
							</Button>
						</GlassCardContent>
					</GlassCard>
					<GlassCard glow className='flex h-full flex-col'>
						<GlassCardHeader>
							<GlassCardTitle className='font-display text-xl'>
								Диск-гольф
							</GlassCardTitle>
							<p className='text-muted-foreground text-sm'>
								Маршрут с корзинами
							</p>
						</GlassCardHeader>
						<GlassCardContent className='flex flex-1 flex-col gap-4'>
							<p className='leading-7 sm:flex-1'>
								Диск-гольф — это спортивная игра, где цель игры — за минимальное
								количество бросков попасть диском в специальные корзины на всех
								игровых отрезках.
							</p>
							<Button
								asChild
								variant='outline-glass'
								className='min-h-[44px] w-fit'
							>
								<a
									href={discGolfStartLink}
									target='_blank'
									rel='noopener noreferrer'
								>
									Начать играть
								</a>
							</Button>
						</GlassCardContent>
					</GlassCard>
				</div>
			</section>

			{/* Парк H3 */}
			<section
				className='scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 md:scroll-mb-0 md:scroll-mt-[var(--header-height)]'
				aria-labelledby='park-h3-heading'
				id='park-h3'
			>
				<SectionHeading
					id='park-h3-heading'
					title='Диск-гольф парк «H3»'
					subtitle='Первый в городе построенный маршрут с корзинами'
				/>
				<GlassCard featured className='mt-8'>
					<GlassCardContent className='space-y-4 pt-6'>
						<p className='leading-7'>
							Рады сообщить вам о существовании уникального места для активного
							отдыха и спортивных развлечений — диск-гольф парка «H3».
						</p>
						<p className='leading-7'>
							Это отличное место, где вы можете насладиться игрой в диск-гольф,
							провести время на свежем воздухе и стать частью увлечённого
							сообщества.
						</p>
						<Button asChild variant='neon' className='min-h-[44px] w-fit'>
							<Link to='/parkh3'>Парк H3</Link>
						</Button>
					</GlassCardContent>
				</GlassCard>
			</section>

			{/* Как присоединиться */}
			<section className='px-0' aria-labelledby='join-heading'>
				<SectionHeading
					id='join-heading'
					title='Как присоединиться'
					subtitle='Три простых шага — от выбора дисциплины до первой тренировки'
				/>
				<div className='mt-8'>
					<Community />
				</div>
			</section>

			{/* Топ игроков */}
			<FeaturedPlayersSection />

			{/* Соревнования */}
			<section
				className='scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 md:scroll-mb-0 md:scroll-mt-[var(--header-height)]'
				aria-labelledby='competitions-heading'
				id='competitions'
			>
				<SectionHeading
					id='competitions-heading'
					title='Соревнования'
					subtitle='Лиги, турниры и рейтинг диск-гольфа'
				/>
				<GlassCard glow className='mt-8'>
					<GlassCardHeader>
						<GlassCardTitle className='font-display text-xl'>
							Диск-гольф
						</GlassCardTitle>
						<p className='text-muted-foreground text-sm'>
							Лиги и турниры · рейтинг · этапы · карточки игроков
						</p>
					</GlassCardHeader>
					<GlassCardContent className='space-y-4'>
						<p className='leading-7'>
							Прибрежная лига, Тольяттинская лига и другие соревнования
							Федерации — результаты синхронизируются с DiscGolfMetrix.
						</p>
						<div className="flex flex-wrap gap-3">
							<Button asChild variant='neon' size='lg' className='min-h-[44px]'>
								<Link to='/events'>Все соревнования</Link>
							</Button>
							<Button asChild variant='outline-glass' size='lg' className='min-h-[44px]'>
								<Link to='/bingo'>BINGO</Link>
							</Button>
						</div>
					</GlassCardContent>
				</GlassCard>
			</section>

			<JoinCommunityCta />
		</article>
	)
}

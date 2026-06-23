import { Link } from 'react-router-dom'
import { config } from '@/config'
import { HeroSection } from '@/components/home/HeroSection'
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

const ultimateTelegramLink = `${config.communityLink}?text=${encodeURIComponent('Хочу записаться на алтимат')}`
const discGolfTelegramLink = `${config.communityLink}?text=${encodeURIComponent('Хочу начать играть в диск-гольф')}`

export function Home() {
	return (
		<article className="space-y-16 pb-12 md:space-y-24 md:pb-16">
			<HeroSection />

			{/* Дисциплины */}
			<section className="px-0" aria-labelledby="disciplines-heading">
				<SectionHeading
					id="disciplines-heading"
					title="Дисциплины"
					subtitle="Две дисциплины флаинг диска — равный акцент на алтимат и диск-гольф"
				/>
				<div className="mt-8 grid gap-6 sm:grid-cols-2">
					<GlassCard glow>
						<GlassCardHeader>
							<GlassCardTitle className="font-display text-xl">Алтимат</GlassCardTitle>
							<p className="text-muted-foreground text-sm">
								Командная игра с летающим диском
							</p>
						</GlassCardHeader>
						<GlassCardContent className="space-y-4">
							<p className="leading-7">
								Алтимат (ultimate) — динамичная командная игра: две команды
								передают диск по полю и забивают в зону. Честная игра без судьи
								на поле, дух игры (spirit of the game). В Тольятти проходят
								тренировки и турниры для детей и взрослых.
							</p>
							<Button asChild variant="neon" className="min-h-[44px] w-full sm:w-auto">
								<a href={ultimateTelegramLink} target="_blank" rel="noopener noreferrer">
									Записаться на тренировку
								</a>
							</Button>
						</GlassCardContent>
					</GlassCard>
					<GlassCard glow>
						<GlassCardHeader>
							<GlassCardTitle className="font-display text-xl">Диск-гольф</GlassCardTitle>
							<p className="text-muted-foreground text-sm">
								Маршрут с корзинами
							</p>
						</GlassCardHeader>
						<GlassCardContent className="space-y-4">
							<p className="leading-7">
								Прохождение маршрута от старта до корзины метанием диска. В
								Тольятти есть парк «H3» с лунками и корзинами — приходите
								играть или напишите, чтобы уточнить детали.
							</p>
							<Button asChild variant="outline-glass" className="min-h-[44px] w-full sm:w-auto">
								<a href={discGolfTelegramLink} target="_blank" rel="noopener noreferrer">
									Начать играть
								</a>
							</Button>
						</GlassCardContent>
					</GlassCard>
				</div>
			</section>

			{/* Парк H3 */}
			<section
				className="scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 md:scroll-mb-0 md:scroll-mt-[var(--header-height)]"
				aria-labelledby="park-h3-heading"
				id="park-h3"
			>
				<SectionHeading
					id="park-h3-heading"
					title="Диск-гольф парк «H3»"
					subtitle="Первый в городе построенный маршрут с корзинами"
				/>
				<GlassCard featured className="mt-8">
					<GlassCardHeader>
						<GlassCardTitle className="font-display text-xl">
							Парк для диск-гольфа в Тольятти
						</GlassCardTitle>
						<p className="text-muted-foreground text-sm">
							Построенный маршрут с корзинами — приходите играть
						</p>
					</GlassCardHeader>
					<GlassCardContent className="space-y-4">
						<p className="leading-7">
							Первый в городе парк с лунками и корзинами. Подходит для новичков
							и опытных. Как добраться и прокат дисков — напишите в группу ФФДТ.
						</p>
						<Button asChild variant="neon" size="lg" className="min-h-[44px]">
							<a href={config.communityLink} target="_blank" rel="noopener noreferrer">
								Узнать в Telegram
							</a>
						</Button>
					</GlassCardContent>
				</GlassCard>
			</section>

			{/* Как присоединиться */}
			<section className="px-0" aria-labelledby="join-heading">
				<SectionHeading
					id="join-heading"
					title="Как присоединиться"
					subtitle="Три простых шага — от выбора дисциплины до первой тренировки"
				/>
				<div className="mt-8">
					<Community />
				</div>
			</section>

			{/* Топ игроков */}
			<FeaturedPlayersSection />

			{/* Соревнования */}
			<section
				className="scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 md:scroll-mb-0 md:scroll-mt-[var(--header-height)]"
				aria-labelledby="competitions-heading"
				id="competitions"
			>
				<SectionHeading
					id="competitions-heading"
					title="Соревнования"
					subtitle="Лиги, турниры и рейтинг диск-гольфа"
				/>
				<GlassCard glow className="mt-8">
					<GlassCardHeader>
						<GlassCardTitle className="font-display text-xl">Диск-гольф</GlassCardTitle>
						<p className="text-muted-foreground text-sm">
							Лиги и турниры · рейтинг · этапы · карточки игроков
						</p>
					</GlassCardHeader>
					<GlassCardContent className="space-y-4">
						<p className="leading-7">
							Прибрежная лига, Тольяттинская лига и другие соревнования
							Федерации — результаты синхронизируются с DiscGolfMetrix.
						</p>
						<Button asChild variant="neon" size="lg" className="min-h-[44px]">
							<Link to="/events">Все соревнования</Link>
						</Button>
					</GlassCardContent>
				</GlassCard>
			</section>

			{/* Контакты */}
			<section
				className="scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 md:scroll-mb-0 md:scroll-mt-[var(--header-height)]"
				aria-labelledby="contacts-heading"
				id="contacts"
			>
				<SectionHeading
					id="contacts-heading"
					title="Контакты"
					subtitle="Вопросы, предложения и заявки на участие"
				/>
				<div className="mt-8 max-w-[65ch] space-y-4">
					<p className="leading-7">
						Пишите в группу ФФДТ в Telegram или ВКонтакте. Укажите в сообщении:
						алтимат или диск-гольф — мы подскажем расписание и детали.
					</p>
					<div className="flex flex-col gap-3 sm:flex-row">
						<Button asChild variant="neon" size="lg" className="min-h-[44px]">
							<a href={config.communityLink} target="_blank" rel="noopener noreferrer">
								Написать в Telegram
							</a>
						</Button>
						<Button asChild variant="outline-glass" size="lg" className="min-h-[44px]">
							<a href="https://vk.com/tfdf63" target="_blank" rel="noopener noreferrer">
								ВКонтакте
							</a>
						</Button>
					</div>
				</div>
			</section>
		</article>
	)
}

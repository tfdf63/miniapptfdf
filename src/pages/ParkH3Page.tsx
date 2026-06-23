import { Link } from 'react-router-dom'
import { AlternatingMediaBlock } from '@/components/park/AlternatingMediaBlock'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import {
	GlassCard,
	GlassCardContent,
} from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

export function ParkH3Page() {
	return (
		<PageShell wide className='scroll-smooth'>
			<header className='space-y-3'>
				<Link
					to='/'
					className='text-muted-foreground hover:text-foreground inline-flex text-sm transition-colors'
				>
					← На главную
				</Link>
				<div className='space-y-2'>
					<h1 className='font-display text-3xl font-semibold tracking-tight md:text-4xl'>
						<span className='neon-text'>Диск-гольф парк «H3»</span>
					</h1>
					<p className='text-muted-foreground max-w-[65ch] text-sm md:text-base'>
						Первый в Тольятти построенный маршрут с корзинами — активный отдых
						и спорт в Комсомольском районе
					</p>
					<div
						className='h-px w-full max-w-xs bg-gradient-to-r from-primary via-accent to-transparent'
						aria-hidden
					/>
				</div>
			</header>

			<div className='space-y-14 md:space-y-20'>
				<AlternatingMediaBlock
					imagePosition='right'
					imageSrc='/images/park/01.png'
					imageAlt='Игрок на tee-площадке парка H3 у информационного стенда'
				>
					<p className='text-foreground'>
						Рады сообщить вам о существовании уникального места для активного
						отдыха и спортивных развлечений — диск-гольф парка «H3».
					</p>
					<p className='text-foreground'>
						Это отличное место, где вы можете насладиться игрой в диск-гольф,
						провести время на свежем воздухе и стать частью увлечённого
						сообщества.
					</p>
				</AlternatingMediaBlock>

				<AlternatingMediaBlock
					imagePosition='left'
					title='Что такое диск-гольф?'
					imageSrc='/images/park/02.png'
					imageAlt='Игрок бросает диск в корзину на поле диск-гольфа'
				>
					<p>
						Диск-гольф — это спортивная игра, похожая на традиционный гольф, но
						вместо мячей и клюшек используются специальные диски. Цель
						игры — за минимальное количество бросков попасть диском в специальные
						корзины, расположенные на поле.
					</p>
				</AlternatingMediaBlock>

				<AlternatingMediaBlock
					imagePosition='right'
					title='Почему стоит посетить парк «H3»?'
					imageSrc='/images/park/03.png'
					imageAlt='Сообщество ФФДТ на турнире в парке H3'
				>
					<ul className='space-y-4'>
						<li>
							<span className='text-foreground font-medium'>
								Активный отдых на свежем воздухе:
							</span>{' '}
							Диск-гольф — отличная возможность провести время на природе,
							наслаждаясь свежим воздухом и живописными видами парка.
						</li>
						<li>
							<span className='text-foreground font-medium'>
								Соревнования и развлечение:
							</span>{' '}
							Вы можете соревноваться с друзьями, семьёй или другими игроками,
							улучшая навыки и наслаждаясь процессом игры.
						</li>
						<li>
							<span className='text-foreground font-medium'>
								Сообщество единомышленников:
							</span>{' '}
							Присоединившись к диск-гольф сообществу, вы встретите новых
							друзей, сможете участвовать в турнирах и совместных мероприятиях,
							организуемых в парке.
						</li>
						<li>
							<span className='text-foreground font-medium'>
								Подходит для всех возрастов:
							</span>{' '}
							Диск-гольф — игра для любого уровня подготовки. Новичок вы или
							опытный игрок — каждый найдёт здесь что-то для себя.
						</li>
					</ul>
				</AlternatingMediaBlock>

				<AlternatingMediaBlock
					imagePosition='left'
					title='Как начать играть?'
					imageSrc='/images/park/04.png'
					imageAlt='Вход в диск-гольф парк H3 со схемой маршрута'
				>
					<ol className='space-y-4'>
						<li>
							<span className='text-foreground font-medium'>
								Придите в парк «H3»:
							</span>{' '}
							Парк расположен в живописном месте Комсомольского района, где вы
							найдёте специально оборудованные площадки для игры.
						</li>
						<li>
							<span className='text-foreground font-medium'>
								Возьмите с собой диски:
							</span>{' '}
							Если своих дисков нет — обратитесь в сообщество, и вам их
							предоставят.
						</li>
						<li>
							<span className='text-foreground font-medium'>
								Получите инструктаж:
							</span>{' '}
							На месте объяснят правила игры и помогут с первым броском.
						</li>
						<li>
							<span className='text-foreground font-medium'>
								Играйте и наслаждайтесь:
							</span>{' '}
							После этого можно начинать игру и наслаждаться каждым моментом!
						</li>
					</ol>
				</AlternatingMediaBlock>

				<section className='mx-auto max-w-3xl space-y-4 text-center'>
					<p className='text-foreground text-lg leading-relaxed'>
						Диск-гольф парк «H3» ждёт вас! Присоединяйтесь к нам, проведите
						время активно и увлекательно. Будьте частью нашего дружного и
						активного сообщества диск-гольфистов!
					</p>
					<Button asChild variant='neon' className='min-h-[44px] w-fit'>
						<a
							href='https://t.me/tfdf63/5892'
							target='_blank'
							rel='noopener noreferrer'
						>
							Начать играть
						</a>
					</Button>
				</section>

				<GlassCard featured>
					<GlassCardContent className='space-y-4 pt-6'>
						<p className='leading-7'>
							Отдельную благодарность выражаем компании ПАО «Тольяттиазот»,
							компании МАНГ-Бетон.
						</p>
						<p className='leading-7'>
							Проект «Диск-гольф парк «H3» (h3)» стал победителем на конкурсе
							социальных инициатив «Химия добра». Открытие состоялось 8
							сентября 2022 года.
						</p>
						<p className='font-display text-primary text-lg font-semibold italic'>
							«Жителем Тольятти, для жителей Тольятти»
						</p>
					</GlassCardContent>
				</GlassCard>
			</div>

			<Footer />
		</PageShell>
	)
}

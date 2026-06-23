import type { ReactNode } from 'react'
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card'
import { SocialIconLinks } from '@/components/social/SocialIconLinks'

const steps: {
	step: string
	title: string
	text: ReactNode
}[] = [
	{
		step: '01',
		title: 'Выберите дисциплину',
		text: (
			<>
				Алтимат — командные тренировки.
				<br />
				Диск-гольф — парк «H3» и соревнования.
			</>
		),
	},
	{
		step: '02',
		title: 'Напишите в Telegram',
		text: 'Расскажем расписание, место встречи и что взять с собой на первую тренировку.',
	},
	{
		step: '03',
		title: 'Приходите играть',
		text: 'Первая тренировка или игра в парке — лучший способ познакомиться с сообществом.',
	},
]

export function Community() {
	return (
		<div className='space-y-6'>
			<div className='grid gap-4 md:grid-cols-3'>
				{steps.map(({ step, title, text }) => (
					<GlassCard key={step} glow className='relative overflow-hidden'>
						<GlassCardContent className='space-y-3 pt-6'>
							<span className='text-primary font-display text-3xl font-bold opacity-40'>
								{step}
							</span>
							<h3 className='font-display text-lg font-semibold'>{title}</h3>
							<p className='text-muted-foreground text-sm leading-relaxed'>
								{text}
							</p>
						</GlassCardContent>
					</GlassCard>
				))}
			</div>
			<GlassCard featured>
				<GlassCardContent className='flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between'>
					<p className='text-muted-foreground text-sm leading-relaxed'>
						Присоединяйтесь к сообществу ФФДТ в Telegram: анонсы тренировок,
						турниров и ответы на вопросы.
					</p>
					<SocialIconLinks />
				</GlassCardContent>
			</GlassCard>
		</div>
	)
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const goals = [
	{
		title: 'Команды и вертикаль',
		description:
			'Тренировки для 54 команд разных возрастов и пола: детские, юниорские, взрослые, женские, мужские и микст.',
	},
	{
		title: 'Люди',
		description: 'Тренерский штаб, STAFF, организация соревнований и лагерей.',
	},
	{
		title: 'Площадки',
		description:
			'Игровые поля (летом - улица, зимой - зал). Зал силовой и кондиционной подготовки.',
	},
	{
		title: 'Диск-гольф',
		description:
			'Парк на 18 корзин в Тольятти с вариативными траекториями: конфигурации отрезков можно менять (переставляемые корзины), чтобы разнообразить маршруты и тренировки.',
	},
]

export function About() {
	return (
		<section className='space-y-6'>
			<div className='space-y-1'>
				<h2 className='text-2xl font-semibold tracking-tight'>Цели:</h2>
				<p className='pt-2 text-muted-foreground'>
					Средства направляются на развитие флаинг диска по четырём
					направлениям:
				</p>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				{goals.map(goal => (
					<Card key={goal.title}>
						<CardHeader className='pb-2'>
							<CardTitle className='text-lg'>{goal.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-sm text-muted-foreground'>
								{goal.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}

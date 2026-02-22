import { Button } from '@/components/ui/button'
import { config } from '@/config'

export function Home() {
	return (
		<section className='flex flex-col items-center gap-8 py-12 text-center md:py-16'>
			<div className='flex max-w-[600px] flex-col gap-4'>
				<h1 className='text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
					Федерация флаинг диска Тольятти
				</h1>
				<p className='text-lg text-muted-foreground md:text-xl'>
					Развиваем алтимат и{'\u00A0'}диск-гольф в{'\u00A0'}городе и{'\u00A0'}
					регионе.
				</p>
				<p className='text-lg text-muted-foreground md:text-xl'>
					Ваша поддержка помогает строить долгосрочную базу для{'\u00A0'}флаинг
					диска.
				</p>
			</div>
			<div className='flex max-w-[600px] flex-col gap-4'>
				<p className='text-lg font-medium text-foreground md:text-xl'>
					Скоро сезон 2026 — тренировки, турниры и{'\u00A0'}диск-гольф ждут.
				</p>
				<p className='text-lg text-muted-foreground md:text-xl'>
					Присоединяйтесь к{'\u00A0'}сообществу: общение, анонсы и{'\u00A0'}
					поддержка. Будем рады видеть вас на{'\u00A0'}
					поле.
				</p>
			</div>
			{/* <div className='flex flex-wrap items-center justify-center gap-3'>
				<Button asChild size='lg'>
					<a
						href={config.communityLink}
						target='_blank'
						rel='noopener noreferrer'
					>
						В Telegram
					</a>
				</Button>
				<Button asChild variant='outline' size='lg'>
					<a href='#about'>Цели</a>
				</Button>
			</div> */}
			{/* Ссылки на соц. сети */}
		</section>
	)
}

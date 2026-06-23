import { SectionHeading } from '@/components/layout/SectionHeading'

export function About() {
	return (
		<section
			className="space-y-6 px-0"
			id="about"
			aria-labelledby="about-heading"
		>
			<SectionHeading
				id="about-heading"
				title="О федерации"
			/>
			<p className="text-muted-foreground max-w-[65ch] leading-7">
				ФФДТ (Федерация флаинг диска Тольятти) проводит тренировки и турниры,
				поддерживает парк «H3» и развивает алтимат и диск-гольф в городе.
			</p>
		</section>
	)
}

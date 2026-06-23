import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AlternatingMediaBlockProps = {
	imagePosition: 'left' | 'right'
	imageSrc: string
	imageAlt: string
	title?: string
	children: ReactNode
}

export function AlternatingMediaBlock({
	imagePosition,
	imageSrc,
	imageAlt,
	title,
	children,
}: AlternatingMediaBlockProps) {
	const image = (
		<div className='park-media overflow-hidden rounded-2xl border border-primary/20 shadow-neon-sm'>
			<img
				src={imageSrc}
				alt={imageAlt}
				className='aspect-[3/2] h-auto w-full object-cover'
				width={1024}
				height={682}
				loading='lazy'
				decoding='async'
			/>
		</div>
	)

	return (
		<section className='grid items-center gap-8 md:grid-cols-2 md:gap-12'>
			<div
				className={cn(
					'space-y-4',
					imagePosition === 'left' && 'md:order-2',
				)}
			>
				{title && (
					<h2 className='font-display text-xl font-semibold tracking-tight md:text-2xl'>
						{title}
					</h2>
				)}
				<div className='text-muted-foreground space-y-4 text-base leading-7'>
					{children}
				</div>
			</div>
			<div className={cn(imagePosition === 'left' && 'md:order-1')}>
				{image}
			</div>
		</section>
	)
}

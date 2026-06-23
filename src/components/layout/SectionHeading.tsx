import { cn } from '@/lib/utils'

type SectionHeadingProps = {
	id?: string
	title: string
	subtitle?: string
	className?: string
}

export function SectionHeading({
	id,
	title,
	subtitle,
	className,
}: SectionHeadingProps) {
	return (
		<div className={cn('space-y-2', className)}>
			<h2
				id={id}
				className="font-display scroll-m-20 text-2xl font-semibold tracking-tight md:text-3xl"
			>
				<span className="neon-text">{title}</span>
			</h2>
			{subtitle && (
				<p className="text-muted-foreground max-w-[65ch] text-sm md:text-base">
					{subtitle}
				</p>
			)}
			<div
				className="h-px w-full max-w-xs bg-gradient-to-r from-primary via-accent to-transparent"
				aria-hidden
			/>
		</div>
	)
}

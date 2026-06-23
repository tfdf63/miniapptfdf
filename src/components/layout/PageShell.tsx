import { cn } from '@/lib/utils'

type PageShellProps = {
	children: React.ReactNode
	className?: string
	wide?: boolean
}

export function PageShell({ children, className, wide = false }: PageShellProps) {
	return (
		<main className={cn('min-h-screen scroll-smooth', className)}>
			<div
				className={cn(
					'container mx-auto space-y-8 px-4 py-6 md:space-y-10 md:py-8',
					wide ? 'max-w-6xl' : 'max-w-4xl',
				)}
			>
				{children}
			</div>
		</main>
	)
}

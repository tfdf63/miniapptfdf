import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

type GlassCardProps = ComponentProps<typeof Card> & {
	glow?: boolean
	featured?: boolean
}

function GlassCard({
	className,
	glow = false,
	featured = false,
	children,
	...props
}: GlassCardProps) {
	return (
		<Card
			className={cn(
				'glass-panel rounded-2xl transition-all duration-300',
				glow && 'hover:border-primary/50 hover:shadow-neon-sm',
				featured && 'border-primary/40 shadow-neon-sm',
				className,
			)}
			{...props}
		>
			{children}
		</Card>
	)
}

export {
	GlassCard,
	CardContent as GlassCardContent,
	CardDescription as GlassCardDescription,
	CardFooter as GlassCardFooter,
	CardHeader as GlassCardHeader,
	CardTitle as GlassCardTitle,
}

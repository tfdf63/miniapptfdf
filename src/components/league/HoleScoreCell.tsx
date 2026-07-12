import { holeScoreCellClass, holeScoreTitle } from '@/lib/hole-score-styles'
import { cn } from '@/lib/utils'
import type { HoleScore } from '@/types/events'

interface HoleScoreCellProps {
	hole: HoleScore | undefined
	className?: string
}

export function HoleScoreCell({ hole, className }: HoleScoreCellProps) {
	if (!hole) {
		return (
			<td
				className={cn(
					'border border-border/60 px-0.5 py-1.5 text-center text-muted-foreground',
					className,
				)}
			>
				—
			</td>
		)
	}

	return (
		<td
			className={cn(
				holeScoreCellClass(hole.diff, hole.strokes, hole.ob),
				className,
			)}
			title={holeScoreTitle(hole)}
		>
			<span className='font-medium'>{hole.strokes}</span>
		</td>
	)
}

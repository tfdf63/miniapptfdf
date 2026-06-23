import { holeScoreCellClass, holeScoreTitle } from '@/lib/hole-score-styles'
import type { HoleScore } from '@/types/events'

interface HoleScoreCellProps {
  hole: HoleScore | undefined
}

export function HoleScoreCell({ hole }: HoleScoreCellProps) {
  if (!hole) {
    return (
      <td className="border border-border/60 px-0.5 py-1.5 text-center text-muted-foreground">
        —
      </td>
    )
  }

  return (
    <td
      className={holeScoreCellClass(hole.diff, hole.strokes, hole.ob)}
      title={holeScoreTitle(hole)}
    >
      <span className="font-medium">{hole.strokes}</span>
    </td>
  )
}

import { holeScoreTileClass, holeScoreTitle } from '@/lib/hole-score-styles'
import type { HoleScore } from '@/types/events'

interface HoleScoreTileProps {
  hole: HoleScore
}

export function HoleScoreTile({ hole }: HoleScoreTileProps) {
  return (
    <div
      className={holeScoreTileClass(hole.diff, hole.strokes, hole.ob)}
      title={holeScoreTitle(hole)}
    >
      <div className="opacity-70">#{hole.number}</div>
      <div className="text-lg font-semibold tabular-nums">{hole.strokes}</div>
      <div className="opacity-70 tabular-nums">
        par {hole.par}
        {hole.diff !== 0 && (
          <span> ({hole.diff > 0 ? `+${hole.diff}` : hole.diff})</span>
        )}
      </div>
    </div>
  )
}

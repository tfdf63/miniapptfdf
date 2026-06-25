import { Fragment, useState } from 'react'
import { fetchBingoPlayerRounds } from '@/api/bingo'
import { HoleScoreCell } from '@/components/league/HoleScoreCell'
import type {
  BingoHoleHighlight,
  BingoPlayerRound,
  BingoSeason,
  BingoStandingsPlayer,
} from '@/types/bingo'
import { cn } from '@/lib/utils'

function highlightClass(highlight: BingoHoleHighlight): string {
  switch (highlight) {
    case 'active':
      return 'ring-2 ring-cyan-400/80 ring-inset'
    case 'improved':
      return 'ring-2 ring-emerald-400/80 ring-inset'
    case 'penalty':
      return 'ring-2 ring-red-400/50 ring-inset opacity-80'
    default:
      return ''
  }
}

function RoundRows({
  round,
  holeNumbers,
}: {
  round: BingoPlayerRound
  holeNumbers: number[]
}) {
  const holeMap = new Map(round.holes.map((h) => [h.number, h]))
  return (
    <tr className="border-b bg-muted/20 text-muted-foreground">
      <td className="sticky left-0 z-10 border border-border/60 bg-muted/30 px-1.5 py-2" />
      <td
        className="sticky left-8 z-10 border border-border/60 bg-muted/30 px-2 py-2 text-xs"
        colSpan={2}
      >
        <a
          href={round.metrixUrl}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-400 hover:underline"
        >
          {round.metrixRoundDate} · #{round.metrixRoundId}
        </a>
      </td>
      {holeNumbers.map((n) => {
        const hole = holeMap.get(n)
        if (!hole) {
          return (
            <td
              key={n}
              className="border border-border/60 px-0.5 py-1.5 text-center"
            />
          )
        }
        return (
          <HoleScoreCell
            key={n}
            hole={{
              number: hole.number,
              par: hole.par,
              strokes: hole.strokes,
              diff: hole.diff,
              ob: hole.ob,
            }}
            className={highlightClass(hole.highlight)}
          />
        )
      })}
    </tr>
  )
}

interface BingoStandingsTableProps {
  season: BingoSeason
  players: BingoStandingsPlayer[]
  expandable?: boolean
}

export function BingoStandingsTable({
  season,
  players,
  expandable = true,
}: BingoStandingsTableProps) {
  const holeNumbers = season.holes.map((h) => h.number)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [roundsCache, setRoundsCache] = useState<
    Record<string, BingoPlayerRound[]>
  >({})
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function togglePlayer(metrixUserId: string) {
    if (!expandable) return

    const next = !expanded[metrixUserId]
    setExpanded((prev) => ({ ...prev, [metrixUserId]: next }))

    if (next && !roundsCache[metrixUserId]) {
      setLoadingId(metrixUserId)
      try {
        const data = await fetchBingoPlayerRounds(metrixUserId)
        setRoundsCache((prev) => ({ ...prev, [metrixUserId]: data.rounds }))
      } finally {
        setLoadingId(null)
      }
    }
  }

  return (
    <div className="glass-panel relative -mx-4 overflow-x-auto rounded-xl px-4">
      <table className="w-max min-w-full border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-muted-foreground">
            <th className="sticky left-0 z-10 w-8 border border-primary/20 bg-muted/80 px-1.5 py-2 text-left font-medium">
              #
            </th>
            <th className="sticky left-8 z-10 min-w-[120px] border border-primary/20 bg-muted/80 px-2 py-2 text-left font-medium">
              Игрок
            </th>
            <th className="w-12 border border-primary/20 bg-muted/50 px-2 py-2 text-center font-medium">
              Очки
            </th>
            {holeNumbers.map((n) => (
              <th
                key={n}
                className="w-9 border border-primary/20 bg-muted/50 px-0.5 py-2 text-center font-medium"
              >
                #{n}
              </th>
            ))}
          </tr>
          <tr className="border-b text-muted-foreground">
            <td className="sticky left-0 z-10 border border-primary/20 bg-muted/60 px-1.5 py-1" />
            <td className="sticky left-8 z-10 border border-primary/20 bg-muted/60 px-2 py-1 text-xs">
              par
            </td>
            <td className="border border-primary/20 bg-muted/40 px-2 py-1 text-center text-xs" />
            {season.holes.map((h) => (
              <td
                key={h.number}
                className="border border-primary/20 bg-muted/40 px-0.5 py-1 text-center text-xs"
              >
                {h.par}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const isOpen = expanded[player.metrixUserId]
            const rounds = roundsCache[player.metrixUserId] ?? []
            return (
              <Fragment key={player.metrixUserId}>
                <tr
                  className={cn(
                    'border-b',
                    expandable && 'cursor-pointer hover:bg-muted/30',
                  )}
                  onClick={() => togglePlayer(player.metrixUserId)}
                >
                  <td className="sticky left-0 z-10 border border-border/60 bg-background/95 px-1.5 py-2">
                    {player.rank}
                  </td>
                  <td className="sticky left-8 z-10 border border-border/60 bg-background/95 px-2 py-2 font-medium">
                    {expandable && (
                      <span className="mr-1 text-muted-foreground">
                        {isOpen ? '▾' : '▸'}
                      </span>
                    )}
                    {player.name}
                  </td>
                  <td className="border border-border/60 px-2 py-2 text-center font-semibold">
                    {player.totalPoints}
                  </td>
                  {player.holes.map((hole) => {
                    if (hole.points <= 0 || hole.strokes == null) {
                      return (
                        <td
                          key={hole.number}
                          className="border border-border/60 px-0.5 py-1.5"
                        />
                      )
                    }
                    return (
                      <HoleScoreCell
                        key={hole.number}
                        hole={{
                          number: hole.number,
                          par: hole.par,
                          strokes: hole.strokes,
                          diff: hole.diff ?? 0,
                          ob: 0,
                        }}
                      />
                    )
                  })}
                </tr>
                {isOpen &&
                  (loadingId === player.metrixUserId ? (
                    <tr>
                      <td
                        colSpan={3 + holeNumbers.length}
                        className="border border-border/60 px-2 py-3 text-center text-muted-foreground text-sm"
                      >
                        Загрузка раундов…
                      </td>
                    </tr>
                  ) : (
                    rounds.map((round) => (
                      <RoundRows
                        key={round.submissionId}
                        round={round}
                        holeNumbers={holeNumbers}
                      />
                    ))
                  ))}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

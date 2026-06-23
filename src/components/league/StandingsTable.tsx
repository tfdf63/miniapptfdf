import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { PlayerStanding } from '@/types/events'

const PAGE_SIZE = 10

interface StandingsTableProps {
  slug: string
  standings: PlayerStanding[]
  division: string
  bestStagesCount?: number
}

export function StandingsTable({
  slug,
  standings,
  division,
  bestStagesCount,
}: StandingsTableProps) {
  const [page, setPage] = useState(0)

  if (!standings.length) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        Результаты появятся после синхронизации этапов.
      </p>
    )
  }

  const totalPages = Math.ceil(standings.length / PAGE_SIZE)
  const pageItems = standings.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <div className="space-y-3">
      <div className="table-glass">
        <table>
          <thead>
            <tr>
              <th className="w-10">#</th>
              <th>Игрок</th>
              <th className="w-16 text-center">Рейтинг</th>
              <th className="w-14 text-center">Сум</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((player) => {
              const fullSeason = player.stagesPlayed >= (bestStagesCount ?? 1)
              return (
              <tr
                key={player.userId}
                className={cn(
                  fullSeason && 'standings-full-season',
                )}
              >
                <td className="font-medium tabular-nums">{player.rank}</td>
                <td>
                  <Link
                    to={`/events/${slug}/player/${player.userId}?division=${encodeURIComponent(division)}`}
                    className="inline-flex min-h-[44px] items-center font-medium text-primary hover:underline"
                  >
                    {player.name}
                  </Link>
                </td>
                <td className="text-center font-semibold tabular-nums text-primary">
                  {player.metrixRating ?? '—'}
                </td>
                <td className="text-center font-semibold tabular-nums">
                  {player.totalMes}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 text-sm">
          <Button
            type="button"
            variant="outline-glass"
            size="sm"
            className="min-h-[44px]"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Назад
          </Button>
          <span className="text-muted-foreground tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <Button
            type="button"
            variant="outline-glass"
            size="sm"
            className="min-h-[44px]"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Вперёд
          </Button>
        </div>
      )}
    </div>
  )
}

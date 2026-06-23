import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { HoleScoreCell } from '@/components/league/HoleScoreCell'
import type { HoleScore, StageDivisionResults, StageRoundInfo } from '@/types/events'

function formatRez(rez: number | null) {
  if (rez == null) return '—'
  return rez > 0 ? `+${rez}` : String(rez)
}

function holeNumbersFromPar(coursePar: { number: number }[]) {
  if (coursePar.length) return coursePar.map((h) => h.number)
  return []
}

function roundShortLabel(roundNumber: number) {
  return `Р${roundNumber}`
}

interface StageDivisionTableProps {
  slug: string
  division: StageDivisionResults
  holes: number[]
  coursePar: { number: number; par: number }[]
  rounds?: StageRoundInfo[]
}

function StatusCell({
  rank,
  dnf,
  dns,
}: {
  rank: number | null
  dnf: boolean
  dns: boolean
}) {
  if (dns) {
    return (
      <Badge variant="outline" className="text-[10px]">
        DNS
      </Badge>
    )
  }
  if (dnf) {
    return (
      <Badge variant="destructive" className="text-[10px]">
        DNF
      </Badge>
    )
  }
  return <>{rank ?? '—'}</>
}

export function StageDivisionTable({
  slug,
  division,
  holes,
  coursePar,
  rounds = [],
}: StageDivisionTableProps) {
  const { division: divisionName, results } = division
  const multiRound = rounds.length > 1

  if (multiRound) {
    const holeCols = holeNumbersFromPar(rounds[0]?.coursePar ?? coursePar)
    const parRow = rounds[0]?.coursePar ?? coursePar

    return (
      <section className="space-y-3">
        <h2 className="font-display text-lg font-semibold">{divisionName}</h2>
        <div className="glass-panel relative -mx-4 overflow-x-auto rounded-xl px-4">
          <table className="w-max min-w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground">
                <th className="w-8 border border-primary/20 bg-muted/50 px-1.5 py-2 text-left font-medium">
                  #
                </th>
                <th className="border border-primary/20 bg-muted/50 px-2 py-2 text-left font-medium">
                  Игрок
                </th>
                <th
                  className="w-9 border border-primary/20 bg-muted/50 px-1 py-2 text-center font-medium"
                  title="Раунд"
                >
                  Р
                </th>
                <th className="w-10 border border-primary/20 bg-muted/50 px-1 py-2 text-center font-medium">
                  Бро
                </th>
                <th
                  className="w-10 border border-primary/20 bg-muted/50 px-1 py-2 text-center font-medium"
                  title="Разница к пару"
                >
                  ±
                </th>
                {holeCols.map((num) => (
                  <th
                    key={num}
                    className="w-8 min-w-[2rem] border border-primary/20 px-0.5 py-2 text-center font-medium"
                  >
                    #{num}
                  </th>
                ))}
              </tr>
              {parRow.length > 0 && (
                <tr className="border-b bg-muted/30 text-muted-foreground text-[10px] sm:text-xs">
                  <th colSpan={5} className="border border-primary/20 bg-muted/50" />
                  {parRow.map((h) => (
                    <th
                      key={h.number}
                      className="border border-primary/20 px-0.5 py-1 text-center font-normal"
                    >
                      {h.par}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {results.map((row) => {
                const subRows = [
                  ...rounds.map((roundMeta) => ({
                    key: `r${roundMeta.number}`,
                    label: roundShortLabel(roundMeta.number),
                    round: row.rounds.find((r) => r.number === roundMeta.number),
                    total: false,
                  })),
                  {
                    key: 'total',
                    label: '∑',
                    round: null,
                    total: true,
                  },
                ]
                const rowSpan = subRows.length

                return subRows.map((sub, idx) => {
                  const holeByNum = new Map(
                    sub.round?.holes?.map((h: HoleScore) => [h.number, h]) ?? [],
                  )
                  const isLast = idx === rowSpan - 1

                  return (
                    <tr
                      key={`${row.userId}-${sub.key}`}
                      className={
                        isLast
                          ? 'border-b-2 border-border transition-colors hover:bg-muted/30'
                          : 'border-b border-border/40 transition-colors hover:bg-muted/30'
                      }
                    >
                      {idx === 0 && (
                        <td
                          rowSpan={rowSpan}
                          className="border border-primary/20 bg-muted/30 px-1.5 py-2 align-top font-medium tabular-nums"
                        >
                          <StatusCell rank={row.rank} dnf={row.dnf} dns={row.dns} />
                        </td>
                      )}
                      {idx === 0 && (
                        <td
                          rowSpan={rowSpan}
                          className="border border-primary/20 bg-muted/30 px-2 py-2 align-top"
                        >
                          <Link
                            to={`/events/${slug}/player/${row.userId}?division=${encodeURIComponent(divisionName)}`}
                            className="inline-flex min-h-[44px] items-center font-medium whitespace-nowrap text-primary hover:underline"
                          >
                            {row.name}
                          </Link>
                        </td>
                      )}
                      <td
                        className={`border border-primary/20 px-1 py-1.5 text-center text-[10px] sm:text-xs ${
                          sub.total ? 'bg-muted/40 font-semibold' : 'bg-muted/20 text-muted-foreground'
                        }`}
                        title={sub.total ? 'Итого' : undefined}
                      >
                        {sub.label}
                      </td>
                      <td
                        className={`border border-primary/20 px-1 py-1.5 text-center tabular-nums ${
                          sub.total ? 'bg-muted/30 font-semibold' : ''
                        }`}
                      >
                        {sub.total
                          ? (row.bro ?? '—')
                          : sub.round?.dnf
                            ? 'DNF'
                            : (sub.round?.bro ?? '—')}
                      </td>
                      <td
                        className={`border border-primary/20 px-1 py-1.5 text-center tabular-nums ${
                          sub.total ? 'bg-muted/30 font-semibold' : ''
                        }`}
                      >
                        {sub.total
                          ? formatRez(row.rez)
                          : sub.round?.dnf
                            ? '—'
                            : formatRez(sub.round?.rez ?? null)}
                      </td>
                      {holeCols.map((num) =>
                        sub.total ? (
                          <td
                            key={num}
                            className="border border-primary/20 bg-muted/20 px-0.5 py-1.5"
                          />
                        ) : (
                          <HoleScoreCell key={num} hole={holeByNum.get(num)} />
                        ),
                      )}
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-3">
      <h2 className="font-display text-lg font-semibold">{divisionName}</h2>
      <div className="glass-panel relative -mx-4 overflow-x-auto rounded-xl px-4">
        <table className="w-max min-w-full border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-muted-foreground">
              <th className="w-8 border border-primary/20 bg-muted/50 px-1.5 py-2 text-left font-medium">
                #
              </th>
              <th className="border border-primary/20 bg-muted/50 px-2 py-2 text-left font-medium">
                Игрок
              </th>
              <th className="w-10 border border-primary/20 bg-muted/50 px-1 py-2 text-center font-medium">
                Бро
              </th>
              <th
                className="w-10 border border-primary/20 bg-muted/50 px-1 py-2 text-center font-medium"
                title="Разница к пару"
              >
                ±
              </th>
              {holes.map((num) => (
                <th
                  key={num}
                  className="w-8 min-w-[2rem] border border-primary/20 px-0.5 py-2 text-center font-medium"
                >
                  #{num}
                </th>
              ))}
            </tr>
            {coursePar.length > 0 && (
              <tr className="border-b bg-muted/30 text-muted-foreground text-[10px] sm:text-xs">
                <th colSpan={4} className="border border-primary/20 bg-muted/50" />
                {coursePar.map((h) => (
                  <th
                    key={h.number}
                    className="border border-primary/20 px-0.5 py-1 text-center font-normal"
                  >
                    {h.par}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {results.map((row) => {
              const holeByNum = new Map(
                row.holes?.map((h: HoleScore) => [h.number, h]) ?? [],
              )
              return (
                <tr
                  key={row.userId}
                  className="border-b transition-colors hover:bg-muted/30"
                >
                  <td className="border border-primary/20 bg-muted/30 px-1.5 py-2 font-medium tabular-nums">
                    <StatusCell rank={row.rank} dnf={row.dnf} dns={row.dns} />
                  </td>
                  <td className="border border-primary/20 bg-muted/30 px-2 py-2">
                    <Link
                      to={`/events/${slug}/player/${row.userId}?division=${encodeURIComponent(divisionName)}`}
                      className="inline-flex min-h-[44px] items-center font-medium whitespace-nowrap text-primary hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="border border-primary/20 bg-muted/30 px-1 py-2 text-center tabular-nums">
                    {row.bro ?? '—'}
                  </td>
                  <td className="border border-primary/20 bg-muted/30 px-1 py-2 text-center tabular-nums">
                    {formatRez(row.rez)}
                  </td>
                  {holes.map((num) => (
                    <HoleScoreCell key={num} hole={holeByNum.get(num)} />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

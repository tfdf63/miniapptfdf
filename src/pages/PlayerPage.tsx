import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { fetchEvent, fetchPlayer } from '@/api/events'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import { PlayerScorecardSheet } from '@/components/league/PlayerScorecardSheet'
import { canOpenStageScorecard } from '@/lib/stage-scorecard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	GlassCard,
	GlassCardContent,
	GlassCardHeader,
	GlassCardTitle,
} from '@/components/ui/glass-card'
import { Skeleton } from '@/components/ui/skeleton'
import type { EventStage, PlayerProfile } from '@/types/events'

function formatRatingDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function PlayerPage() {
  const { slug, userId } = useParams<{ slug: string; userId: string }>()
  const [searchParams] = useSearchParams()
  const division = searchParams.get('division') ?? undefined
  const [eventName, setEventName] = useState<string | null>(null)
  const [profile, setProfile] = useState<PlayerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState(1)

  useEffect(() => {
    if (!slug || !userId) return
    setLoading(true)
    setError(null)
    Promise.all([
      fetchEvent(slug).then((e) => setEventName(e.name)),
      fetchPlayer(slug, userId, division),
    ])
      .then(([, player]) => setProfile(player))
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка загрузки'))
      .finally(() => setLoading(false))
  }, [slug, userId, division])

  if (loading) {
    return (
      <PageShell wide>
        <Skeleton className="glass-panel h-8 w-48 rounded-xl" />
        <Skeleton className="glass-panel h-24 w-full rounded-2xl" />
        <Skeleton className="glass-panel h-48 w-full rounded-2xl" />
      </PageShell>
    )
  }

  if (error || !profile || !userId || !slug) {
    return (
      <PageShell wide>
        <Button asChild variant="outline-glass" className="mb-6 min-h-[44px]">
          <Link to={slug ? `/events/${slug}` : '/events'}>← Соревнование</Link>
        </Button>
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="font-display">Игрок не найден</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="text-muted-foreground text-sm">
            {error && <p className="text-destructive">{error}</p>}
          </GlassCardContent>
        </GlassCard>
      </PageShell>
    )
  }

  const standing = profile.standing
  const stages: EventStage[] =
    standing?.stages.map((s) => ({
      number: s.stageNumber,
      metrix_id: 0,
      date: null,
      venue: `Этап ${s.stageNumber}`,
      synced: true,
    })) ?? []

  const openScorecard = (stageNumber: number) => {
    setSelectedStage(stageNumber)
    setSheetOpen(true)
  }

  return (
    <>
      <PageShell wide>
        <Button asChild variant="ghost-glow" size="sm" className="min-h-[44px] -ml-2">
          <Link to={`/events/${slug}`}>← {eventName ?? 'Соревнование'}</Link>
        </Button>

        <header className="space-y-2">
          <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            <span className="neon-text">{profile.name}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <a
              href={profile.metrixProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
            >
              Metrix ID {profile.userId}
              <span aria-hidden="true">↑</span>
            </a>
            {profile.division && (
              <Badge variant="secondary">{profile.division}</Badge>
            )}
          </div>
          <div className="flex flex-wrap items-baseline gap-3">
            {profile.metrixRating != null && (
              <p className="text-3xl font-bold text-primary tabular-nums">
                {profile.metrixRating}
                <span className="text-muted-foreground ml-2 text-base font-medium">
                  Metrix Rating
                </span>
              </p>
            )}
            {profile.quickRating != null &&
              profile.quickRating !== profile.metrixRating && (
                <p className="text-sm text-muted-foreground tabular-nums">
                  Quick {profile.quickRating}
                </p>
              )}
          </div>
          {formatRatingDate(profile.ratingCalculatedOn) && (
            <p className="text-muted-foreground text-xs">
              Рейтинг на {formatRatingDate(profile.ratingCalculatedOn)}
            </p>
          )}
        </header>

        {standing && (
          <section>
            <h2 className="font-display mb-3 text-lg font-semibold">{eventName ?? 'Рейтинг'}</h2>
            <GlassCard>
              <GlassCardContent className="p-0">
                <div className="table-glass rounded-none border-0 bg-transparent backdrop-blur-none">
                  <table>
                    <thead>
                      <tr>
                        <th>Место</th>
                        <th className="text-center">Сум</th>
                        <th className="text-center">Этапов</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold">{standing.rank}</td>
                        <td className="text-center font-semibold tabular-nums">
                          {standing.totalMes}
                        </td>
                        <td className="text-center tabular-nums">
                          {standing.stagesPlayed}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </GlassCardContent>
            </GlassCard>

            <h3 className="font-display mb-2 mt-6 text-base font-semibold">Этапы</h3>
            <div className="table-glass">
              <table className="min-w-[320px]">
                <thead>
                  <tr>
                    <th>Этап</th>
                    <th className="text-center">Мес</th>
                    <th className="text-center">Бро/Рез</th>
                  </tr>
                </thead>
                <tbody>
                  {standing.stages.map((cell) => (
                    <tr key={cell.stageNumber}>
                      <td>
                        {canOpenStageScorecard(cell) ? (
                          <button
                            type="button"
                            className="inline-flex min-h-[44px] items-center font-medium text-primary hover:underline"
                            onClick={() => openScorecard(cell.stageNumber)}
                          >
                            Этап {cell.stageNumber}
                          </button>
                        ) : (
                          <span className="text-muted-foreground">
                            Этап {cell.stageNumber}
                          </span>
                        )}
                      </td>
                      <td
                        className={
                          cell.countsTowardTotal
                            ? 'stage-counted text-center font-medium tabular-nums'
                            : 'stage-dropped text-center tabular-nums'
                        }
                      >
                        {cell.dns ? (
                          <Badge variant="outline">DNS</Badge>
                        ) : cell.dnf ? (
                          <Badge variant="destructive">DNF</Badge>
                        ) : cell.mes != null ? (
                          cell.mes
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="text-center text-muted-foreground text-xs tabular-nums">
                        {cell.mes != null && !cell.dnf
                          ? `${cell.bro}/${cell.rez != null && cell.rez > 0 ? `+${cell.rez}` : cell.rez}`
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <Footer />
      </PageShell>

      {standing && (
        <PlayerScorecardSheet
          player={standing}
          division={profile.division ?? ''}
          stages={stages}
          initialStageNumber={selectedStage}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      )}
    </>
  )
}

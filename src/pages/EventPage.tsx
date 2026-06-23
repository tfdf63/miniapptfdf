import { Link, useParams } from 'react-router-dom'
import { useEvent } from '@/hooks/useEvent'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import { Button } from '@/components/ui/button'
import {
	GlassCard,
	GlassCardContent,
	GlassCardHeader,
	GlassCardTitle,
} from '@/components/ui/glass-card'
import { Skeleton } from '@/components/ui/skeleton'
import { StageList } from '@/components/league/StageList'
import { StandingsTable } from '@/components/league/StandingsTable'
import { StageDivisionTable } from '@/components/league/StageDivisionTable'
import { holeNumbers } from '@/lib/stage-holes'

function formatUpdatedAt(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatStageDate(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function BackLink() {
  return (
    <Button asChild variant="ghost-glow" size="sm" className="min-h-[44px] -ml-2">
      <Link to="/events">← Все соревнования</Link>
    </Button>
  )
}

function LoadingState() {
  return (
    <PageShell wide>
      <Skeleton className="glass-panel h-10 w-3/4 rounded-xl" />
      <Skeleton className="glass-panel h-6 w-1/2 rounded-xl" />
      <Skeleton className="glass-panel h-32 w-full rounded-2xl" />
      <Skeleton className="glass-panel h-64 w-full rounded-2xl" />
    </PageShell>
  )
}

export function EventPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, loading, error } = useEvent(slug)

  if (loading) return <LoadingState />

  if (error || !data || !slug) {
    return (
      <PageShell wide>
        <Button asChild variant="outline-glass" className="mb-6 min-h-[44px]">
          <Link to="/events">← Все соревнования</Link>
        </Button>
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="font-display">Не удалось загрузить соревнование</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="space-y-2 text-muted-foreground text-sm">
            <p>
              Запустите сервер:{' '}
              <code className="text-foreground">cd server && npm run start:dev</code>
            </p>
            <p>
              Синхронизируйте Metrix:{' '}
              <code className="text-foreground">cd server && npm run resync</code>
            </p>
            {error && <p className="text-destructive">{error}</p>}
          </GlassCardContent>
        </GlassCard>
      </PageShell>
    )
  }

  const { event, standings, stage } = data
  const isTournament = event.type === 'tournament'

  if (isTournament) {
    const stageInfo = stage?.stage
    const divisions = stage?.divisions ?? []
    const holes =
      stageInfo != null
        ? holeNumbers(
            stageInfo.coursePar,
            divisions.flatMap((d) => d.results),
          )
        : []

    return (
      <PageShell wide className="scroll-smooth">
        <div className="space-y-3">
          <BackLink />
          <h1 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            <span className="neon-text">{event.name}</span>
          </h1>
          {stageInfo && (
            <div className="text-muted-foreground space-y-1 text-sm">
              {stageInfo.date && (
                <p className="text-foreground tabular-nums">{formatStageDate(stageInfo.date)}</p>
              )}
              {stageInfo.layoutName && (
                <p>
                  <span className="text-muted-foreground">Лейаут: </span>
                  {stageInfo.metrixCourseUrl ? (
                    <a
                      href={stageInfo.metrixCourseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-medium hover:underline"
                    >
                      {stageInfo.layoutName}
                    </a>
                  ) : (
                    <span className="text-foreground font-medium">{stageInfo.layoutName}</span>
                  )}
                </p>
              )}
              <p>
                <a
                  href={stageInfo.metrixUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
                >
                  Metrix #{stageInfo.metrixStageId}
                  <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="h-3 w-3 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 8.5 8.5 3.5" />
                    <path d="M4.5 3.5h4v4" />
                  </svg>
                </a>
                {stageInfo.totalPar != null && <> · par {stageInfo.totalPar}</>}
                {stageInfo.playerCount > 0 && <> · {stageInfo.playerCount} игроков</>}
              </p>
              {formatUpdatedAt(stageInfo.syncedAt) && (
                <p>обновлено {formatUpdatedAt(stageInfo.syncedAt)}</p>
              )}
            </div>
          )}
        </div>

        {!stageInfo || stageInfo.playerCount === 0 ? (
          <GlassCard>
            <GlassCardContent className="text-muted-foreground py-10 text-center text-sm">
              Турнир запланирован, но результаты ещё не опубликованы.
            </GlassCardContent>
          </GlassCard>
        ) : (
          <section aria-labelledby="results-heading" className="space-y-10">
            <h2 id="results-heading" className="sr-only">
              Результаты
            </h2>
            {divisions.map((d) => (
              <StageDivisionTable
                key={d.division}
                slug={slug}
                division={d}
                holes={holes}
                coursePar={stageInfo.coursePar}
                rounds={stageInfo.rounds}
              />
            ))}
          </section>
        )}

        <Footer />
      </PageShell>
    )
  }

  if (!standings) {
    return (
      <PageShell wide>
        <GlassCard>
          <GlassCardContent className="text-muted-foreground py-10 text-center text-sm">
            Не удалось загрузить рейтинг.
          </GlassCardContent>
        </GlassCard>
      </PageShell>
    )
  }

  const divisions = standings.divisions

  return (
    <PageShell wide className="scroll-smooth">
      <div className="space-y-3">
        <BackLink />
        <h1 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          <span className="neon-text">{event.name}</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Зачёт: {standings.event.bestStagesCount ?? '—'} лучших этапа ·
          Синхронизировано {standings.event.totalStagesSynced}/
          {standings.event.totalStagesConfigured}
          {formatUpdatedAt(standings.updatedAt) && (
            <> · обновлено {formatUpdatedAt(standings.updatedAt)}</>
          )}
        </p>
      </div>

      <section aria-labelledby="stages-heading">
        <h2 id="stages-heading" className="font-display mb-3 text-xl font-semibold">
          Этапы
        </h2>
        <StageList slug={slug} stages={event.stages} />
      </section>

      <section aria-labelledby="standings-heading" className="space-y-10">
        <h2 id="standings-heading" className="font-display text-xl font-semibold">
          Рейтинг
        </h2>
        {divisions.map((d) => (
          <div key={d.division} className="space-y-3">
            <h3 className="font-display text-lg font-semibold">{d.division}</h3>
            <StandingsTable
              slug={slug}
              standings={d.standings}
              division={d.division}
              bestStagesCount={d.bestStagesCount}
            />
          </div>
        ))}
      </section>

      <Footer />
    </PageShell>
  )
}

/** @deprecated use EventPage */
export const LeaguePage = EventPage

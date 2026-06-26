import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchStage } from '@/api/events'
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
import { StageDivisionTable } from '@/components/league/StageDivisionTable'
import { holeNumbers } from '@/lib/stage-holes'
import type { StageDetail } from '@/types/events'
import { PageMeta } from '@/components/seo/PageMeta'

function formatStageDate(iso: string | null) {
  if (!iso) return '—'
  const d = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatSyncedAt(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function StagePage() {
  const { slug, stageNumber } = useParams<{ slug: string; stageNumber: string }>()
  const n = Number(stageNumber)
  const [data, setData] = useState<StageDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug || !n) return
    setLoading(true)
    setError(null)
    fetchStage(slug, n)
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Ошибка загрузки'))
      .finally(() => setLoading(false))
  }, [slug, n])

  if (loading) {
    return (
      <>
        <PageMeta noindex title="Этап" />
        <PageShell wide>
        <Skeleton className="glass-panel h-8 w-48 rounded-xl" />
        <Skeleton className="glass-panel h-64 w-full rounded-2xl" />
      </PageShell>
      </>
    )
  }

  if (error || !data || !slug) {
    return (
      <>
        <PageMeta noindex title="Этап" />
        <PageShell wide>
        <Button asChild variant="outline-glass" className="mb-6 min-h-[44px]">
          <Link to={slug ? `/events/${slug}` : '/events'}>← Соревнование</Link>
        </Button>
        <GlassCard>
          <GlassCardHeader>
            <GlassCardTitle className="font-display">Этап не найден</GlassCardTitle>
          </GlassCardHeader>
          <GlassCardContent className="text-destructive text-sm">{error}</GlassCardContent>
        </GlassCard>
      </PageShell>
      </>
    )
  }

  const { stage, divisions } = data
  const holes = holeNumbers(
    stage.coursePar,
    divisions.flatMap((d) => d.results),
  )

  return (
    <>
      <PageMeta noindex title={`Этап ${stage.number}`} />
      <PageShell wide>
      <Button asChild variant="ghost-glow" size="sm" className="min-h-[44px] -ml-2">
        <Link to={`/events/${slug}`}>← Соревнование</Link>
      </Button>

      <header className="space-y-2">
        <h1 className="font-display flex min-h-[44px] flex-wrap items-baseline gap-x-2 text-sm sm:text-base">
          <span className="font-bold tracking-tight">Этап {stage.number}</span>
          {stage.venue && (
            <span className="text-muted-foreground">{stage.venue}</span>
          )}
          <span className="text-muted-foreground tabular-nums">
            {formatStageDate(stage.date)}
          </span>
        </h1>
        {stage.layoutName && (
          <p className="text-sm">
            <span className="text-muted-foreground">Лейаут: </span>
            {stage.metrixCourseUrl ? (
              <a
                href={stage.metrixCourseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                {stage.layoutName}
              </a>
            ) : (
              <span className="font-medium">{stage.layoutName}</span>
            )}
          </p>
        )}
        <p className="text-muted-foreground text-sm">
          <a
            href={stage.metrixUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
          >
            Metrix #{stage.metrixStageId}
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
          {stage.totalPar != null && <> · par {stage.totalPar}</>}
          {stage.playerCount > 0 && <> · {stage.playerCount} игроков</>}
        </p>
        {formatSyncedAt(stage.syncedAt) && (
          <p className="text-muted-foreground text-sm">
            обновлено {formatSyncedAt(stage.syncedAt)}
          </p>
        )}
      </header>

      {!stage.synced || stage.playerCount === 0 ? (
        <GlassCard>
          <GlassCardContent className="space-y-2 py-10 text-center text-sm">
            <p className="font-medium">
              {!stage.synced ? 'Этап ещё не сыгран' : 'Этап запланирован, но ещё не проведён'}
            </p>
            {stage.date && (
              <p className="text-muted-foreground">
                Запланирован на {formatStageDate(stage.date)}
              </p>
            )}
            <p className="text-muted-foreground">
              Результаты появятся после проведения и синхронизации с Metrix.
            </p>
          </GlassCardContent>
        </GlassCard>
      ) : (
        <div className="space-y-10">
          {divisions.map((d) => (
            <StageDivisionTable
              key={d.division}
              slug={slug}
              division={d}
              holes={holes}
              coursePar={stage.coursePar}
              rounds={stage.rounds}
            />
          ))}
        </div>
      )}

      <Footer />
    </PageShell>
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBingoStandings } from '@/api/bingo'
import { BingoStandingsTable } from '@/components/bingo/BingoStandingsTable'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import {
  GlassCard,
  GlassCardContent,
} from '@/components/ui/glass-card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageMeta } from '@/components/seo/PageMeta'
import type { BingoStandingsPayload } from '@/types/bingo'

function formatDate(iso: string) {
  const d = new Date(iso.includes('T') ? iso : `${iso}T12:00:00`)
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

export function BingoPage() {
  const [data, setData] = useState<BingoStandingsPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBingoStandings()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageMeta noindex title="BINGO" />
      <PageShell wide>
        <BackLink />

        <SectionHeading
          title="BINGO"
          subtitle="Тренировочная игра ФФДТ на фиксированном лейауте"
          className="mt-4"
        />

        {loading && (
          <Skeleton className="glass-panel mt-8 h-64 w-full rounded-2xl" />
        )}

        {error && (
          <GlassCard className="mt-8">
            <GlassCardContent className="pt-6 text-destructive text-sm">
              {error}
            </GlassCardContent>
          </GlassCard>
        )}

        {data && (
          <div className="mt-8 space-y-6">
            <GlassCard>
              <GlassCardContent className="space-y-3 pt-6 text-sm leading-7">
                <p>
                  <span className="text-muted-foreground">Сезон:</span>{' '}
                  {data.season.name} ({formatDate(data.season.seasonStart)} —{' '}
                  {formatDate(data.season.seasonEnd)})
                </p>
                <p>
                  <span className="text-muted-foreground">Лейаут:</span>{' '}
                  <a
                    href={data.season.layoutReferenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    эталонный раунд #{data.season.layoutReferenceRoundId}
                  </a>
                  {' · '}
                  course {data.season.courseId}
                  {' · '}
                  {data.season.holeCount} лунок
                </p>
                <p className="text-muted-foreground">{data.season.rulesSummary}</p>
              </GlassCardContent>
            </GlassCard>

            {data.players.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                Пока нет засчитанных раундов. Отправьте ID тренировки в Telegram-бот.
              </p>
            ) : (
              <BingoStandingsTable season={data.season} players={data.players} />
            )}
          </div>
        )}

        <Footer />
      </PageShell>
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchEvents } from '@/api/events'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import {
	GlassCard,
	GlassCardContent,
	GlassCardHeader,
	GlassCardTitle,
} from '@/components/ui/glass-card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageMeta } from '@/components/seo/PageMeta'
import type { EventListItem } from '@/types/events'

function typeLabel(type: string) {
  return type === 'league' ? 'Лига' : 'Турнир'
}

function formatUpdatedAt(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function EventCard({ event }: { event: EventListItem }) {
  return (
    <GlassCard glow>
      <GlassCardHeader>
        <GlassCardTitle className="font-display text-xl">{event.name}</GlassCardTitle>
        <p className="text-muted-foreground text-sm">
          {typeLabel(event.type)} · сезон {event.season} ·{' '}
          {event.totalStagesSynced}/{event.totalStagesConfigured} этапов
          {formatUpdatedAt(event.updatedAt) && (
            <> · обновлено {formatUpdatedAt(event.updatedAt)}</>
          )}
        </p>
      </GlassCardHeader>
      <GlassCardContent>
        <Button asChild variant="neon" size="lg" className="min-h-[44px]">
          <Link to={`/events/${event.slug}`}>Рейтинг и этапы</Link>
        </Button>
      </GlassCardContent>
    </GlassCard>
  )
}

export function EventsListPage() {
  const [events, setEvents] = useState<EventListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data.events))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageMeta noindex title="Соревнования" />
      <PageShell wide>
      <SectionHeading
        title="Соревнования"
        subtitle="Лиги и турниры диск-гольфа ФФДТ"
      />

      {loading && (
        <div className="space-y-4">
          <Skeleton className="glass-panel h-32 w-full rounded-2xl" />
          <Skeleton className="glass-panel h-32 w-full rounded-2xl" />
        </div>
      )}

      {error && (
        <GlassCard>
          <GlassCardContent className="pt-6 text-destructive text-sm">{error}</GlassCardContent>
        </GlassCard>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {events.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">
              Скоро здесь появятся турниры
            </p>
          ) : (
            events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))
          )}
        </div>
      )}

      <Footer />
    </PageShell>
    </>
  )
}

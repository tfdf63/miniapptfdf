import { useEffect, useMemo, useState } from 'react'
import { fetchClubMembers } from '@/api/club'
import { Footer } from '@/components/Footer'
import { PlayerCard } from '@/components/club/PlayerCard'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { ClubMember } from '@/types/club'

type GenderFilter = 'all' | 'M' | 'F'

const filterLabels: Record<GenderFilter, string> = {
  all: 'Все',
  M: 'Мужчины',
  F: 'Девушки',
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

export function PlayersPage() {
  const [members, setMembers] = useState<ClubMember[]>([])
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<GenderFilter>('all')

  useEffect(() => {
    fetchClubMembers()
      .then((data) => {
        setMembers(data.members)
        setUpdatedAt(data.updatedAt)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить игроков')
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return members
    return members.filter((m) => m.gender?.toUpperCase() === filter)
  }, [members, filter])

  return (
    <>
      <PageShell wide>
        <SectionHeading
          title="Игроки клуба"
          subtitle={
            updatedAt
              ? `Федерация флаинг диска Тольятти · обновлено ${formatUpdatedAt(updatedAt)}`
              : 'Участники клуба ФФДТ на DiscGolfMetrix'
          }
        />

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Фильтр по полу">
          {(Object.keys(filterLabels) as GenderFilter[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={cn(
                'min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === key
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-primary/25 text-muted-foreground hover:border-primary/40',
              )}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[280px] rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">Нет игроков в выбранной категории.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((member, index) => (
              <PlayerCard key={member.userId} member={member} rank={index + 1} />
            ))}
          </div>
        )}
      </PageShell>
      <Footer />
    </>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchClubMembers } from '@/api/club'
import { PlayerCard } from '@/components/club/PlayerCard'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { ClubMember } from '@/types/club'

function PlayersRow({
  label,
  members,
  loading,
}: {
  label: string
  members: ClubMember[]
  loading: boolean
}) {
  return (
    <div className="space-y-4">
      <p className="player-section-kicker font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {label}
      </p>
      {loading ? (
        <div className="player-cards-scroll flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="player-card-skeleton h-[280px] w-[200px] shrink-0 rounded-2xl" />
          ))}
        </div>
      ) : members.length === 0 ? (
        <p className="text-muted-foreground text-sm">Пока нет игроков с рейтингом в этой категории.</p>
      ) : (
        <div className="player-cards-scroll flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {members.map((member, index) => (
            <PlayerCard
              key={member.userId}
              member={member}
              rank={index + 1}
              className="w-[200px] md:w-auto"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FeaturedPlayersSection() {
  const [men, setMen] = useState<ClubMember[]>([])
  const [women, setWomen] = useState<ClubMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetchClubMembers({ gender: 'M', limit: 10 }),
      fetchClubMembers({ gender: 'F', limit: 10 }),
    ])
      .then(([menData, womenData]) => {
        setMen(menData.members)
        setWomen(womenData.members)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить игроков')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      className="scroll-mb-[var(--mobile-bar-offset)] scroll-mt-0 px-0 md:scroll-mb-0 md:scroll-mt-[var(--header-height)]"
      aria-labelledby="top-players-heading"
      id="top-players"
    >
      <SectionHeading
        id="top-players-heading"
        title="Топ игроков клуба"
        subtitle="Участники ФФДТ на DiscGolfMetrix — рейтинг по данным Metrix"
      />

      {error ? (
        <p className="text-destructive mt-8 text-sm">{error}</p>
      ) : (
        <div className="mt-8 space-y-10">
          <PlayersRow label="Топ 10 — мужчины" members={men} loading={loading} />
          <PlayersRow label="Топ 10 — девушки" members={women} loading={loading} />
        </div>
      )}

      <div className="mt-8">
        <Button asChild variant="outline-glass" size="lg" className="min-h-[44px]">
          <Link to="/players">Все игроки клуба</Link>
        </Button>
      </div>
    </section>
  )
}

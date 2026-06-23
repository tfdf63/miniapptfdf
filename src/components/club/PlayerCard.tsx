import { cn } from '@/lib/utils'
import type { ClubMember } from '@/types/club'

type PlayerCardProps = {
  member: ClubMember
  rank?: number
  className?: string
}

function PlayerAvatar({ member }: { member: ClubMember }) {
  if (member.avatarUrl) {
    return (
      <img
        src={member.avatarUrl}
        alt=""
        className="player-card-avatar-img h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    )
  }

  const initial = (member.name ?? member.nickname ?? '?').charAt(0).toUpperCase()

  return (
    <span className="player-card-avatar-fallback font-display text-2xl font-bold">
      {initial}
    </span>
  )
}

export function PlayerCard({ member, rank, className }: PlayerCardProps) {
  const handle = member.nickname ? `@${member.nickname}` : `Metrix #${member.userId}`

  return (
    <a
      href={member.metrixProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('player-card group block shrink-0', className)}
      aria-label={`Профиль ${member.name ?? member.userId} на Metrix`}
    >
      {rank != null && (
        <span className="player-card-rank font-display text-xs font-semibold uppercase tracking-wider">
          #{rank}
        </span>
      )}

      <div className="player-card-avatar-wrap mx-auto">
        <div className="player-card-avatar">
          <PlayerAvatar member={member} />
        </div>
      </div>

      <div className="mt-4 space-y-1 text-center">
        <p className="player-card-name font-display text-base font-semibold leading-tight md:text-lg">
          {member.name ?? 'Игрок'}
        </p>
        <p className="player-card-handle truncate text-xs text-muted-foreground md:text-sm">
          {handle}
        </p>
      </div>

      <div className="player-card-stats mt-4 grid grid-cols-2 gap-3 border-t border-primary/15 pt-4">
        <div className="text-center">
          <p className="player-card-stat-value font-display text-lg font-bold">
            {member.metrixRating ?? '—'}
          </p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-wide md:text-xs">
            Рейтинг
          </p>
        </div>
        <div className="text-center">
          <p className="font-display text-lg font-bold text-foreground">
            {member.quickRating ?? '—'}
          </p>
          <p className="text-muted-foreground text-[10px] uppercase tracking-wide md:text-xs">
            Quick
          </p>
        </div>
      </div>
    </a>
  )
}

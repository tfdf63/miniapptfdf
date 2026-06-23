import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { EventStage } from '@/types/events'

interface StageListProps {
  slug: string
  stages: EventStage[]
}

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

export function StageList({ slug, stages }: StageListProps) {
  if (!stages.length) {
    return (
      <p className="text-muted-foreground text-sm">Этапы сезона ещё не объявлены.</p>
    )
  }

  return (
    <div className="glass-panel divide-y divide-primary/10 overflow-hidden rounded-xl">
      {stages.map((stage) => (
        <Link
          key={stage.number}
          to={`/events/${slug}/stage/${stage.number}`}
          className={cn(
            'flex min-h-[44px] items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-primary/5',
            !stage.synced && 'opacity-70',
          )}
        >
          <span className="w-[4.5rem] shrink-0 font-medium sm:w-[5rem]">
            Этап {stage.number}
          </span>
          <span className="text-muted-foreground flex-1 tabular-nums">
            {formatStageDate(stage.date)}
          </span>
          <Badge
            variant={stage.synced ? 'default' : 'secondary'}
            className="shrink-0 text-xs"
          >
            {stage.synced ? 'Сыгран' : 'Ожидается'}
          </Badge>
        </Link>
      ))}
    </div>
  )
}

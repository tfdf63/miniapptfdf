import { cn } from '@/lib/utils'

/** Фон ячейки по разнице к пару (как в Metrix). */
export function holeScoreBgClass(diff: number, strokes: number): string {
  if (strokes === 1) return 'bg-amber-400 text-amber-950 dark:bg-amber-500 dark:text-amber-950'
  if (diff <= -2) return 'bg-emerald-600 text-white dark:bg-emerald-500'
  if (diff === -1) return 'bg-emerald-100 text-emerald-950 dark:bg-emerald-900/60 dark:text-emerald-100'
  if (diff === 0) return 'bg-background text-foreground dark:bg-secondary/50'
  if (diff === 1) return 'bg-rose-100 text-foreground dark:bg-rose-900/40 dark:text-rose-100'
  if (diff === 2) return 'bg-rose-300 text-foreground dark:bg-rose-800/60'
  return 'bg-rose-500 text-white dark:bg-rose-600'
}

export function holeScoreCellClass(
  diff: number,
  strokes: number,
  ob: number,
): string {
  return cn(
    'border border-primary/20 px-0.5 py-1.5 text-center text-xs tabular-nums',
    holeScoreBgClass(diff, strokes),
    ob > 0 && 'shadow-[inset_0_3px_0_0_hsl(var(--destructive))]',
  )
}

/** Плитка лунки в карточке игрока (та же логика цветов, что на странице этапа). */
export function holeScoreTileClass(
  diff: number,
  strokes: number,
  ob: number,
): string {
  return cn(
    'rounded-lg border border-primary/20 p-2 text-center text-xs',
    holeScoreBgClass(diff, strokes),
    ob > 0 && 'shadow-[inset_0_3px_0_0_hsl(var(--destructive))]',
  )
}

export function holeScoreTitle(hole: {
  number: number
  strokes: number
  par: number
  ob: number
}): string {
  const ace = hole.strokes === 1 ? ', эйс' : ''
  const base = `Лунка ${hole.number}: ${hole.strokes} (par ${hole.par}${ace})`
  return hole.ob > 0 ? `${base}, OB ${hole.ob}` : base
}

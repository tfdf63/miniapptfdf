import type { StageStandingCell } from '@/types/events'

export function canOpenStageScorecard(cell: StageStandingCell): boolean {
  if (cell.dns || cell.dnf) return true
  if ((cell.holes?.length ?? 0) > 0) return true
  return cell.rounds.some(
    (r) => r.dnf || r.dns || (r.holes?.length ?? 0) > 0,
  )
}

export function roundShortLabel(roundNumber: number) {
  return `Р${roundNumber}`
}

function formatRez(rez: number | null) {
  if (rez == null) return '—'
  return rez > 0 ? `+${rez}` : String(rez)
}

export { formatRez }

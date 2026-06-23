import type { HoleScore } from '@/types/events'

export function holeNumbers(
  coursePar: { number: number }[],
  results: { holes: HoleScore[] | null }[],
) {
  const fromPar = coursePar.map((h) => h.number)
  if (fromPar.length) return fromPar
  const max = results.reduce((m, r) => Math.max(m, r.holes?.length ?? 0), 0)
  return Array.from({ length: max }, (_, i) => i + 1)
}

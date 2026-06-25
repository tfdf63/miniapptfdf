import { config } from '@/config'
import type {
  BingoPlayerRoundsPayload,
  BingoSeason,
  BingoStandingsPayload,
} from '@/types/bingo'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${config.apiUrl}${path}`)
  if (!res.ok) {
    throw new Error(`API ${path}: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchBingoSeason() {
  return getJson<BingoSeason>('/bingo/season')
}

export function fetchBingoStandings() {
  return getJson<BingoStandingsPayload>('/bingo/standings')
}

export function fetchBingoPlayerRounds(metrixUserId: string) {
  return getJson<BingoPlayerRoundsPayload>(
    `/bingo/players/${encodeURIComponent(metrixUserId)}/rounds`,
  )
}

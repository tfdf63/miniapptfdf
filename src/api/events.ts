import { config } from '@/config'
import type {
  EventInfo,
  EventsListPayload,
  PlayerProfile,
  StageDetail,
  StandingsPayload,
} from '@/types/events'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${config.apiUrl}${path}`)
  if (!res.ok) {
    throw new Error(`API ${path}: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchEvents() {
  return getJson<EventsListPayload>('/events')
}

export function fetchEvent(slug: string) {
  return getJson<EventInfo>(`/events/${encodeURIComponent(slug)}`)
}

export function fetchStandings(slug: string, division?: string) {
  const params = new URLSearchParams()
  if (division) params.set('division', division)
  const qs = params.toString()
  return getJson<StandingsPayload>(
    `/events/${encodeURIComponent(slug)}/standings${qs ? `?${qs}` : ''}`,
  )
}

export function fetchStage(slug: string, stageNumber: number) {
  return getJson<StageDetail>(
    `/events/${encodeURIComponent(slug)}/stages/${stageNumber}`,
  )
}

export function fetchPlayer(
  slug: string,
  userId: string,
  division?: string,
) {
  const params = new URLSearchParams()
  if (division) params.set('division', division)
  const qs = params.toString()
  return getJson<PlayerProfile>(
    `/events/${encodeURIComponent(slug)}/players/${encodeURIComponent(userId)}${qs ? `?${qs}` : ''}`,
  )
}

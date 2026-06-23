import { config } from '@/config'
import type { ClubMembersPayload } from '@/types/club'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${config.apiUrl}${path}`)
  if (!res.ok) {
    throw new Error(`API ${path}: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export function fetchClubMembers(options?: {
  gender?: 'M' | 'F'
  limit?: number
}) {
  const params = new URLSearchParams()
  if (options?.gender) params.set('gender', options.gender)
  if (options?.limit != null) params.set('limit', String(options.limit))
  const qs = params.toString()
  return getJson<ClubMembersPayload>(`/club/members${qs ? `?${qs}` : ''}`)
}

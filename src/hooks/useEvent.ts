import { useEffect, useState } from 'react'
import { fetchEvent, fetchStandings, fetchStage } from '@/api/events'
import type { EventInfo, StageDetail, StandingsPayload } from '@/types/events'

function primaryStageNumber(event: EventInfo): number | null {
  const synced = event.stages.find((s) => s.synced)
  if (synced) return synced.number
  return event.stages[0]?.number ?? null
}

export interface EventPageData {
  event: EventInfo
  standings: StandingsPayload | null
  stage: StageDetail | null
}

export function useEvent(slug: string | undefined) {
  const [data, setData] = useState<EventPageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Событие не указано')
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchEvent(slug)
      .then(async (event) => {
        if (cancelled) return

        let stage: StageDetail | null = null
        let standings: StandingsPayload | null = null

        if (event.type === 'tournament') {
          const stageNumber = primaryStageNumber(event)
          if (stageNumber != null) {
            stage = await fetchStage(slug, stageNumber)
          }
        } else {
          standings = await fetchStandings(slug)
        }

        if (cancelled) return
        setData({ event, standings, stage })
      })
      .catch((err: Error) => {
        if (cancelled) return
        setError(err.message)
        setData(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { data, loading, error }
}

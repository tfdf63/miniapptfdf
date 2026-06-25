import type { HoleScore } from '@/types/events'

export interface BingoSeason {
  name: string
  courseId: number
  layoutReferenceRoundId: number
  layoutReferenceUrl: string
  holeCount: number
  holes: Array<{ number: number; par: number }>
  seasonStart: string
  seasonEnd: string
  minPlayers: number
  maxPlayers: number
  rulesSummary: string
}

export interface BingoStandingsPlayer {
  rank: number
  metrixUserId: string
  name: string
  totalPoints: number
  holes: Array<{
    number: number
    par: number
    strokes: number | null
    diff: number | null
    points: number
  }>
}

export interface BingoStandingsPayload {
  season: BingoSeason
  players: BingoStandingsPlayer[]
  updatedAt: string | null
}

export type BingoHoleHighlight = 'active' | 'improved' | 'penalty' | 'noop'

export interface BingoPlayerRound {
  submissionId: string
  metrixRoundId: number
  metrixRoundDate: string
  metrixUrl: string
  holes: Array<{
    number: number
    par: number
    strokes: number
    diff: number
    ob: number
    highlight: BingoHoleHighlight
  }>
}

export interface BingoPlayerRoundsPayload {
  metrixUserId: string
  name: string
  rounds: BingoPlayerRound[]
}

export type BingoHoleCell = HoleScore | null

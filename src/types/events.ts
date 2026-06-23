export interface HoleScore {
  number: number
  par: number
  strokes: number
  diff: number
  ob: number
}

export interface StageStandingCell {
  stageNumber: number
  bro: number | null
  rez: number | null
  mes: number | null
  countsTowardTotal: boolean
  dnf: boolean
  dns: boolean
  holes: HoleScore[] | null
  rounds: StagePlayerRoundResult[]
}

export interface StagePlayerRoundResult {
  number: number
  name: string
  bro: number | null
  rez: number | null
  dnf: boolean
  dns: boolean
  holes: HoleScore[] | null
}

export interface PlayerStanding {
  rank: number
  userId: string
  name: string
  metrixRating: number | null
  totalMes: number
  stagesPlayed: number
  stages: StageStandingCell[]
}

export interface PlayerProfile {
  userId: string
  name: string
  nickname: string | null
  gender: string | null
  metrixRating: number | null
  quickRating: number | null
  ratingCalculatedOn: string | null
  metrixProfileUrl: string
  standing: PlayerStanding | null
  division: string | null
}

export interface DivisionStandings {
  division: string
  bestStagesCount?: number
  standings: PlayerStanding[]
}

export interface StandingsPayload {
  event: {
    slug: string
    type: string
    season: number
    name: string
    bestStagesCount?: number
    totalStagesConfigured: number
    totalStagesSynced: number
  }
  divisions: DivisionStandings[]
  updatedAt: string | null
}

export interface EventStage {
  number: number
  metrix_id: number
  date: string | null
  venue: string
  synced: boolean
}

export interface EventListItem {
  slug: string
  type: string
  season: number
  name: string
  shortName: string
  totalStagesConfigured: number
  totalStagesSynced: number
  updatedAt: string | null
}

export interface EventsListPayload {
  events: EventListItem[]
}

export interface EventInfo {
  slug: string
  type: string
  season: number
  name: string
  shortName: string
  metrixParentId: number | null
  bestStagesCount?: number
  divisions: string[]
  stages: EventStage[]
}

export interface StagePlayerRoundResult {
  number: number
  name: string
  bro: number | null
  rez: number | null
  dnf: boolean
  dns: boolean
  holes: HoleScore[] | null
}

export interface StagePlayerResult {
  rank: number | null
  userId: string
  name: string
  metrixRating: number | null
  bro: number | null
  rez: number | null
  mes: number | null
  dnf: boolean
  dns: boolean
  holes: HoleScore[] | null
  rounds: StagePlayerRoundResult[]
}

export interface StageRoundInfo {
  number: number
  name: string
  metrixRoundId: number
  layoutName: string | null
  coursePar: { number: number; par: number }[]
  totalPar: number | null
}

export interface StageDivisionResults {
  division: string
  results: StagePlayerResult[]
}

export interface StageDetail {
  stage: {
    slug: string
    season: number
    number: number
    venue: string
    layoutName: string | null
    date: string | null
    metrixStageId: number
    metrixName: string | null
    metrixCourseId: number | null
    metrixCourseUrl: string | null
    coursePar: { number: number; par: number }[]
    totalPar: number | null
    syncedAt: string | null
    metrixUrl: string
    playerCount: number
    rounds: StageRoundInfo[]
  }
  divisions: StageDivisionResults[]
}

/** @deprecated use EventStage */
export type LeagueStage = EventStage

/** @deprecated use EventInfo */
export type LeagueInfo = EventInfo

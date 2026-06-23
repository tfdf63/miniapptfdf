export type ClubMember = {
  userId: string
  name: string | null
  nickname: string | null
  gender: string | null
  metrixRating: number | null
  quickRating: number | null
  metrixProfileUrl: string
  avatarUrl: string | null
}

export type ClubMembersPayload = {
  clubId: number
  updatedAt: string | null
  totalCount: number
  members: ClubMember[]
}

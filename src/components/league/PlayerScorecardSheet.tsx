import { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { HoleScoreTile } from '@/components/league/HoleScoreTile'
import {
  canOpenStageScorecard,
  formatRez,
  roundShortLabel,
} from '@/lib/stage-scorecard'
import type { EventStage, PlayerStanding, StageStandingCell } from '@/types/events'

interface PlayerScorecardSheetProps {
  player: PlayerStanding | null
  division: string
  stages: EventStage[]
  initialStageNumber: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

function StageScorecardContent({
  stageCell,
  stageMeta,
}: {
  stageCell: StageStandingCell
  stageMeta?: EventStage
}) {
  const multiRound = stageCell.rounds.length > 1

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium">
          {stageMeta?.venue ?? `Этап ${stageCell.stageNumber}`}
        </p>
        {stageCell.dns && (
          <Badge variant="outline" className="mt-2">
            Не стартовал (DNS)
          </Badge>
        )}
        {stageCell.dnf && !multiRound && (
          <Badge variant="destructive" className="mt-2">
            Не финишировал (DNF)
          </Badge>
        )}
        {!stageCell.dns && stageCell.mes != null && (
          <p className="text-muted-foreground mt-1 text-sm">
            Мес {stageCell.mes}
            {stageCell.bro != null && (
              <>
                {' '}
                · Бро {stageCell.bro} · Рез {formatRez(stageCell.rez)}
              </>
            )}
            {stageCell.countsTowardTotal && (
              <span className="text-primary ml-2">· в зачёте</span>
            )}
          </p>
        )}
      </div>

      {multiRound ? (
        <div className="space-y-5">
          {stageCell.rounds.map((round) => (
            <div key={round.number} className="space-y-2">
              <p className="text-sm font-semibold">
                {roundShortLabel(round.number)}
                {!round.dnf && round.bro != null && (
                  <span className="text-muted-foreground ml-2 font-normal tabular-nums">
                    · {round.bro} · {formatRez(round.rez)}
                  </span>
                )}
                {round.dnf && (
                  <Badge variant="destructive" className="ml-2 text-[10px]">
                    DNF
                  </Badge>
                )}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {(round.holes ?? []).map((hole) => (
                  <HoleScoreTile key={hole.number} hole={hole} />
                ))}
              </div>
              {round.dnf && (round.holes?.length ?? 0) < 18 && (
                <p className="text-muted-foreground text-xs">
                  Сыграно {round.holes?.length ?? 0} из 18 лунок
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {(stageCell.holes ?? []).map((hole) => (
              <HoleScoreTile key={hole.number} hole={hole} />
            ))}
          </div>
          {stageCell.dnf && (stageCell.holes?.length ?? 0) < 18 && (
            <p className="text-muted-foreground text-xs">
              Сыграно {stageCell.holes?.length ?? 0} из 18 лунок
            </p>
          )}
        </>
      )}
    </div>
  )
}

export function PlayerScorecardSheet({
  player,
  division,
  stages,
  initialStageNumber,
  open,
  onOpenChange,
}: PlayerScorecardSheetProps) {
  const [activeStage, setActiveStage] = useState(String(initialStageNumber))

  useEffect(() => {
    if (open) {
      setActiveStage(String(initialStageNumber))
    }
  }, [open, initialStageNumber])

  if (!player) return null

  const playedStages = player.stages.filter(canOpenStageScorecard)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="pb-8">
        <SheetHeader>
          <SheetTitle>{player.name}</SheetTitle>
          <SheetDescription>
            {division} · место {player.rank} · сумма {player.totalMes}
          </SheetDescription>
        </SheetHeader>

        {playedStages.length === 0 ? (
          <p className="text-muted-foreground mt-4 text-sm">Нет результатов по этапам.</p>
        ) : (
          <Tabs value={activeStage} onValueChange={setActiveStage} className="mt-4">
            <TabsList className="w-full">
              {playedStages.map((s) => (
                <TabsTrigger
                  key={s.stageNumber}
                  value={String(s.stageNumber)}
                  className="text-xs sm:text-sm"
                >
                  Э{s.stageNumber}
                </TabsTrigger>
              ))}
            </TabsList>

            {playedStages.map((stageCell) => {
              const stageMeta = stages.find(
                (s) => s.number === stageCell.stageNumber,
              )

              return (
                <TabsContent key={stageCell.stageNumber} value={String(stageCell.stageNumber)}>
                  <StageScorecardContent stageCell={stageCell} stageMeta={stageMeta} />
                </TabsContent>
              )
            })}
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  )
}

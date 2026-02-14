import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function About() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Цели эндаумента</CardTitle>
        <CardDescription>
          На что направляются средства эндаумент-фонда
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-muted-foreground">
          Средства эндаумент-фонда направляются на развитие флаинг диска по четырём направлениям:
        </p>
        <ul className="space-y-2 text-muted-foreground list-disc list-inside">
          <li>
            <strong className="text-foreground">Команды и вертикаль</strong> — тренировки для 54 команд разных возрастов и пола: детские, юниорские, взрослые, женские, мужские и микст.
          </li>
          <li>
            <strong className="text-foreground">Люди</strong> — тренерский штаб, STAFF, организация соревнований и лагерей.
          </li>
          <li>
            <strong className="text-foreground">Территория</strong> — открытое игровое поле, зал, зал силовой и кондиционной подготовки.
          </li>
          <li>
            <strong className="text-foreground">Диск-гольф</strong> — парк на 18 корзин в Тольятти с вариативными траекториями: конфигурации отрезков можно менять (переставляемые корзины), чтобы разнообразить маршруты и тренировки.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

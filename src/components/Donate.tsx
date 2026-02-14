import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Donate() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Поддержать</CardTitle>
        <CardDescription>Stars и TON — один тап</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Поддержать эндаумент-фонд можно звёздами Telegram (Stars) или криптовалютой TON — один тап, без лишних шагов. Звёзды списываются в интерфейсе Telegram; TON — по ссылке в кошелёк с предзаполненной суммой.
        </p>
      </CardContent>
    </Card>
  )
}

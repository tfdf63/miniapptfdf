import { config } from '@/config'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function Community() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Как присоединиться</CardTitle>
        <CardDescription>
          Сообщество в Telegram
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Присоединяйтесь к сообществу Федерации флаинг диска в Telegram: там анонсы тренировок, лагерей и турниров, обсуждения и ответы на вопросы. Один тап — и вы в чате.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <a
            href={config.communityLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Перейти в группу Telegram
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

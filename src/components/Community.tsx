import { config } from '@/config'

export function Community() {
  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold">Как присоединиться</h2>
      <p className="mt-2 text-muted-foreground">
        Присоединяйтесь к сообществу Федерации флаинг диска в Telegram: там анонсы тренировок, лагерей и турниров, обсуждения и ответы на вопросы. Один тап — и вы в чате.
      </p>
      <a
        href={config.communityLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Перейти в группу Telegram
      </a>
    </section>
  )
}

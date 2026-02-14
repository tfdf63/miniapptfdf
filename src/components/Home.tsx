import { Button } from '@/components/ui/button'
import { config } from '@/config'

export function Home() {
  return (
    <section className="flex flex-col items-center gap-8 py-12 text-center md:py-16">
      <div className="flex max-w-[600px] flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Федерация флаинг диска Тольятти
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Развиваем алтимат и диск-гольф в городе и в России. Эндаумент-фонд для команд, тренеров, полей и парка диск-гольфа на 18 корзин. Начни здесь — поддержка одним тапом.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <a
            href={config.communityLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            В Telegram
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#about">Цели эндаумента</a>
        </Button>
      </div>
    </section>
  )
}

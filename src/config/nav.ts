export type NavItem = {
	label: string
	to: string
	/** Точное совпадение pathname (без вложенных маршрутов). */
	end?: boolean
}

export const siteNav: NavItem[] = [
	{ label: 'Соревнования', to: '/events' },
	{ label: 'Игроки', to: '/players' },
	{ label: 'Парк H3', to: '/#park-h3' },
	{ label: 'Контакты', to: '/#contacts' },
]

export const siteTitle = 'Федерация флаинг диска Тольятти'
export const siteTitleShort = 'ФФДТ'

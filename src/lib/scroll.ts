export function scrollInstantly(top: number, left = 0) {
	const html = document.documentElement
	const previous = html.style.scrollBehavior

	html.style.scrollBehavior = 'auto'
	window.scrollTo(left, top)
	html.style.scrollBehavior = previous
}

export function scrollIntoViewInstantly(element: Element) {
	const html = document.documentElement
	const previous = html.style.scrollBehavior

	html.style.scrollBehavior = 'auto'
	element.scrollIntoView()
	html.style.scrollBehavior = previous
}

export function scrollToTopInstantly() {
	scrollInstantly(0)
}

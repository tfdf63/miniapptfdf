import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollInstantly, scrollIntoViewInstantly } from '@/lib/scroll'

export function ScrollToTop() {
	const { pathname, hash } = useLocation()
	const previousPathname = useRef(pathname)
	const previousHash = useRef(hash)

	useEffect(() => {
		const pathnameChanged = previousPathname.current !== pathname
		const hashCleared = previousHash.current !== '' && hash === ''
		previousPathname.current = pathname
		previousHash.current = hash

		if (hash) {
			const id = hash.slice(1)

			const scrollToTarget = () => {
				const el = document.getElementById(id)
				if (!el) return false

				if (pathnameChanged) {
					scrollIntoViewInstantly(el)
				} else {
					el.scrollIntoView()
				}

				return true
			}

			if (scrollToTarget()) return

			const timer = window.setTimeout(scrollToTarget, 0)
			return () => window.clearTimeout(timer)
		}

		if (pathnameChanged || hashCleared) {
			scrollInstantly(0)
		}
	}, [pathname, hash])

	return null
}

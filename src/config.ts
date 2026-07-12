/**
 * Конфиг Mini App: URL бэкенда, TON-адрес, номиналы донатов.
 * Прод: VITE_API_URL=/api/v1 (same-origin через Beget api-proxy.php).
 */
export const config = {
	apiUrl: import.meta.env.VITE_API_URL || '/api/v1',
	tonDonateAddress: import.meta.env.VITE_TON_DONATE_ADDRESS ?? '',
	tonAmounts: [1, 5, 10] as number[], // TON
	starAmounts: [50, 100, 250] as number[], // Stars
	communityLink:
		import.meta.env.VITE_COMMUNITY_LINK ?? 'https://t.me/tfdf63',
	contactLink:
		import.meta.env.VITE_CONTACT_TELEGRAM_LINK ?? 'https://t.me/slava_tfdf',
} as const

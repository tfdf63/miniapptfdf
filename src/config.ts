/**
 * Конфиг Mini App: URL бэкенда, TON-адрес, номиналы донатов
 */
export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? '/api',
  tonDonateAddress: import.meta.env.VITE_TON_DONATE_ADDRESS ?? '',
  tonAmounts: [1, 5, 10] as number[], // TON
  starAmounts: [50, 100, 250] as number[], // Stars
  communityLink: import.meta.env.VITE_COMMUNITY_LINK ?? 'https://t.me/',
} as const

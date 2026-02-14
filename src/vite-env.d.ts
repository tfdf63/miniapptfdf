/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_TON_DONATE_ADDRESS: string
  readonly VITE_COMMUNITY_LINK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

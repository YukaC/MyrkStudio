/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISCORD_URL?: string;
  readonly VITE_DEMO_INVITE_CODES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

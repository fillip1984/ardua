/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string
      readonly DATABASE_SCHEMA: string
      readonly BETTER_AUTH_SECRET: string
      readonly BETTER_AUTH_GOOGLE_ID: string
      readonly BETTER_AUTH_GOOGLE_SECRET: string
      readonly BETTER_AUTH_URL: string
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}

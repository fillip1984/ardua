import { config } from 'dotenv'
import { cache } from 'react'
import { initAuth } from '.'

config()

const baseUrl =
  process.env.NODE_ENV === 'production' && process.env.BETTER_AUTH_URL
    ? process.env.BETTER_AUTH_URL
    : 'http://localhost:3000'

export const auth = initAuth({
  baseUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  googleClientId: process.env.BETTER_AUTH_GOOGLE_ID,
  googleClientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
})

// export const getSession = cache(async () =>
//   auth.api.getSession({ headers: await headers() }),
// )

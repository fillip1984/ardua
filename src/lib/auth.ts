import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
      redirectURI: `${process.env.baseUrl}/api/auth/callback/google`,
      disableImplicitSignUp: true,
    },
  },
})

// export type Auth = ReturnType<typeof initAuth>
// export type Session = Auth['$Infer']['Session']

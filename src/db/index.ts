import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema/schema.ts'
import * as authSchema from './schema/auth-schema.ts'

config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
export const db = drizzle(pool, { schema: { ...schema, ...authSchema } })

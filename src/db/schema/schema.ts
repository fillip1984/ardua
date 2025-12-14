import { pgSchema, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const arduaSchema = pgSchema(process.env.DATABASE_SCHEMA)

export const todos = arduaSchema.table('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

import { relations } from 'drizzle-orm'
import { pgSchema, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const arduaSchema = pgSchema(process.env.DATABASE_SCHEMA)

export const todos = arduaSchema.table('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const todoRelations = relations(todos, ({ one }) => ({
  user: one(user, { fields: [todos.userId], references: [user.id] }),
}))

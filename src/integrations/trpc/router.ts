import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from './init'

import { todos } from '@/db/schema'
import type { TRPCRouterRecord } from '@trpc/server'
import { eq } from 'drizzle-orm/sql/expressions/conditions'

// const todos = [
//   { id: 1, name: 'Get groceries' },
//   { id: 2, name: 'Buy a new phone' },
//   { id: 3, name: 'Finish the project' },
// ]

const todosRouter = {
  list: publicProcedure.query(async ({ ctx }) => ctx.db.select().from(todos)),
  add: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.insert(todos).values({ title: input.title })
    }),
  remove: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.delete(todos).where(eq(todos.id, input.id))
    }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
})
export type TRPCRouter = typeof trpcRouter

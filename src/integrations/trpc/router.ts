import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from './init'

import { todos } from '@/db/schema/schema'
import type { TRPCRouterRecord } from '@trpc/server'
import { eq } from 'drizzle-orm/sql/expressions/conditions'

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
  // testSecure: protectedProcedure.query(async ({ ctx }) => {
  //   console.log({ ctx:ctx.session.user. })
  // }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
})
export type TRPCRouter = typeof trpcRouter

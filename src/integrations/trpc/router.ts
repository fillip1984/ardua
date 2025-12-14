import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from './init'

import { todos } from '@/db/schema/schema'
import type { TRPCRouterRecord } from '@trpc/server'
import { and, eq } from 'drizzle-orm/sql/expressions/conditions'

const todosRouter = {
  list: protectedProcedure.query(async ({ ctx }) =>
    ctx.db.select().from(todos).where(eq(todos.userId, ctx.session.user.id)),
  ),
  add: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .insert(todos)
        .values({ title: input.title, userId: ctx.session.user.id })
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .delete(todos)
        .where(
          and(eq(todos.id, input.id), eq(todos.userId, ctx.session.user.id)),
        )
    }),
  // testSecure: protectedProcedure.query(async ({ ctx }) => {
  //   console.log({ ctx:ctx.session.user. })
  // }),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  todos: todosRouter,
})
export type TRPCRouter = typeof trpcRouter

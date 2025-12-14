import { auth } from '@/lib/auth'
import { createFileRoute } from '@tanstack/react-router'

async function handler({ request }: { request: Request }) {
  return await auth.handler(request)
}

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
      // GET: async ({ request }:{ request: Request }) => {
      //     return await auth.handler(request)
      // },
      // POST: async ({ request }:{ request: Request }) => {
      //     return await auth.handler(request)
      // },
    },
  },
})

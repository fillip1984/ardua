import { config } from 'dotenv'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { trpcRouter } from '@/integrations/trpc/router'
import { createFileRoute } from '@tanstack/react-router'
import { createTRPCContext } from '@/integrations/trpc/init'
import { auth } from '@/integrations/better-auth/server'

config()

const createContext = async (req: Request) => {
  return createTRPCContext({
    headers: req.headers,
    auth,
  })
}

function handler({ request }: { request: Request }) {
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: '/api/trpc',
    createContext: () => createContext(request),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
            )
          }
        : undefined,
  })
}

export const Route = createFileRoute('/api/trpc/$')({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
    },
  },
})

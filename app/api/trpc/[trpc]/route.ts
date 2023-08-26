import { appRouter } from "@/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  return fetchRequestHandler({
    router: appRouter,
    endpoint: "/api/trpc",
    req,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };

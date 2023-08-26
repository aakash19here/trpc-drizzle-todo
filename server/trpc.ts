import { currentUser } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";

//Initiate trpc on the server
const t = initTRPC.create();

export const router = t.router;

export const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = await currentUser();

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user,
    },
  });
});

export const publicProcedure = t.procedure.use(isAuth);
// export const privateProcedure = t.procedure.use(isAuth);

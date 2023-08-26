import { db } from "@/db";
import { publicProcedure, router } from "./trpc";
import { Todos } from "@/db/schema";
import { z } from "zod";
import { asc, eq } from "drizzle-orm";

export const appRouter = router({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    const {
      user: { id },
    } = ctx;
    return await db
      .select()
      .from(Todos)
      .where(eq(Todos.authorId, id))
      .orderBy(asc(Todos.id));
  }),
  addTodo: publicProcedure.input(z.string()).mutation(
    async ({
      input,
      ctx: {
        user: { id },
      },
    }) => {
      await db.insert(Todos).values({ title: input, authorId: id });
      return true;
    }
  ),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      await db
        .update(Todos)
        .set({ isCompleted: opts.input.done })
        .where(eq(Todos.id, opts.input.id));
      return true;
    }),
});

export type AppRouter = typeof appRouter;

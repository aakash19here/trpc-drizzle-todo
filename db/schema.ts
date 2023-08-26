import { InferSelectModel } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  isCompleted: boolean("isComplete").default(false),
  authorId: varchar("author", { length: 256 }).notNull(),
});

export type todo = InferSelectModel<typeof Todos>;

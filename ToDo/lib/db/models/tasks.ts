import {
  varchar,
  pgTable,
  uuid,
  boolean,
  index,
  timestamp,
} from "drizzle-orm/pg-core";

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    description: varchar("description", { length: 1000 }),
    complete: boolean("complete").notNull().default(false),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => ({
    createdAtIndex: index("created_at_idx").on(table.created_at),
  })
);

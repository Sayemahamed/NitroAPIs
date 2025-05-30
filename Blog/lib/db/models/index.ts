import { pgTable, uuid, varchar, timestamp, index } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password_hash: varchar('password_hash', { length: 100 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index('user_created_at').on(table.created_at), index('user_email').on(table.email)],
)

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
    content: varchar('content', { length: 1000 }).notNull(),
    author_id: uuid('author_id')
      .notNull()
      .references(() => users.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index('post_created_at').on(table.created_at),
    index('post_author_id').on(table.author_id),
  ],
)

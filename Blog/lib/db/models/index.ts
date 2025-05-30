import { pgTable, uuid, varchar, timestamp, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
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

export const userRelation = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const posts = pgTable(
  'posts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 100 }).notNull(),
    content: varchar('content', { length: 1000 }).notNull(),
    author_id: uuid('author_id').notNull(),
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

export const postRelation = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}))
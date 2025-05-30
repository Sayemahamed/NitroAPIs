import { db } from '~/lib/db'

export default defineEventHandler(async () => {
  const users = await db.query.users.findMany({
    columns: { name: true, email: true },
    with: { posts: { columns: { title: true } } },
  })
  return users
})

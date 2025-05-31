import { db } from '~/lib/db'

export default defineEventHandler(async () => {
  const posts = await db.query.posts.findMany({
    columns: { id: true, title: true, updated_at: true },
  })
  return posts
})

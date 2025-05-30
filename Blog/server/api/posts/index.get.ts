import { db } from '~/lib/db'

export default defineEventHandler(async () => {
  const posts = await db.query.posts.findMany({
    columns: { id: true, title: true, content: true },
    limit: 10,
    with: { author: { columns: { name: true, id: true } } },
  })
  return posts
})

import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { eq } from 'drizzle-orm'
import { posts } from '~/lib/db/models'
export default defineEventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, IdParamsSchema.safeParseAsync)
  if (!result.success) {
    throw createError({ statusMessage: result.error.message, statusCode: 400 })
  }
  const post = await db.query.posts.findFirst({
    columns: { id: true, title: true, content: true, created_at: true, updated_at: true },
    with: { author: { columns: { name: true, id: true, email: true } } },
    where: eq(posts.id, result.data.id),
  })
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }
  return post
})

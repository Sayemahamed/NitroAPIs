import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { eq } from 'drizzle-orm'
import { posts } from '~/lib/db/models'

export default defineEventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, IdParamsSchema.safeParseAsync)
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: result.error.message,
      }),
    )
  }
  const user_posts = await db.query.posts.findMany({
    where: eq(posts.author_id, result.data.id),
    columns: { id: true, title: true, updated_at: true },
  })
  return user_posts
})

import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { posts } from '~/lib/db/models'
import { eq } from 'drizzle-orm'
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
  const post = await db.query.posts.findMany({
    where: eq(posts.id, result.data.id),
    columns: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      updated_at: true,
    },
    with: {
      author: {
        columns: { id: true, name: true, email: true },
      },
    },
  })
  return post
})

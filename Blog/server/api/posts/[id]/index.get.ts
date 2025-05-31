import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { posts } from '~/lib/db/models'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, IdParamsSchema.safeParseAsync)
  
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.message,
    })
  }

  const post = await db.query.posts.findFirst({
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

  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  return post
})

import { db } from '~/lib/db'
import { eq } from 'drizzle-orm'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { UpdatePostSchema } from '~/lib/db/schemas/posts'
import { posts } from '~/lib/db/models'

export default defineEventHandler(async (event) => {
    const id = await getValidatedRouterParams(event, IdParamsSchema.safeParseAsync)
    if (!id.success) {
        return sendError(
            event,
            createError({
                statusCode: 422,
                statusMessage: 'Invalid Id',
            }),
        )
    }
    const result = await readValidatedBody(event, UpdatePostSchema.safeParseAsync)
    if (!result.success) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: result.error.message,
            }),
        )
    }
    const post = await db.update(posts).set(result.data).where(eq(posts.id, id.data.id)).returning({
        id: posts.id,
        title: posts.title,
        content: posts.content,
    })
    return post
})
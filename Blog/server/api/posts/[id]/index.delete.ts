import { db } from '~/lib/db'
import { IdParamsSchema, passwordSchema } from '~/lib/db/schemas/users'
import { eq } from 'drizzle-orm'
import { posts, users } from '~/lib/db/models'
import bcrypt from 'bcryptjs'

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
  const password = await readValidatedBody(event, passwordSchema.safeParseAsync)
  if (!password.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: password.error.message,
      }),
    )
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, id.data.id),
  })
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User Not Found',
      }),
    )
  }
  if (!bcrypt.compareSync(password.data.password, user.password_hash)) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'Invalid Password',
      }),
    )
  }
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id.data.id),
  })
  if (!post) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Post Not Found',
      }),
    )
  }
  await db.delete(posts).where(eq(posts.id, id.data.id))
  return { message: 'Post Deleted' }
})

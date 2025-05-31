import { db } from '~/lib/db'
import { UpdateUserSchema, IdParamsSchema } from '~/lib/db/schemas/users'
import { users } from '~/lib/db/models'
import { eq } from 'drizzle-orm'
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
  const result = await readValidatedBody(event, UpdateUserSchema.safeParseAsync)
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: result.error.message,
      }),
    )
  }
  const user = await db.update(users).set(result.data).where(eq(users.id, id.data.id)).returning({
    id: users.id,
    name: users.name,
    email: users.email,
  })
  return user
})

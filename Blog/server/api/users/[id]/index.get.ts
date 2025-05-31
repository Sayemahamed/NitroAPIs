import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { users } from '~/lib/db/models'
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
  const user = await db.query.users.findFirst({
    where: eq(users.id, result.data.id),
    columns: {
      id: true,
      name: true,
      email: true,
      created_at: true,
      updated_at: true,
    },
  })
  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User not found',
      }),
    )
  }
  return user
})

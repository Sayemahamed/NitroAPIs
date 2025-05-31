import { db } from '~/lib/db'
import { InsertUserSchema } from '~/lib/db/schemas/users'
import { users } from '~/lib/db/models'
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertUserSchema.safeParseAsync)
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: result.error.message,
      }),
    )
  }
  const user = await db.insert(users).values(result.data).returning({
    id: users.id,
    name: users.name,
    email: users.email,
  })
  return user
})

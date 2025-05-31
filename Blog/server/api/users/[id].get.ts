import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/users'
import { eq } from 'drizzle-orm'
import { users } from '~/lib/db/models'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, IdParamsSchema.safeParseAsync)
  if (!result.success) {
    throw createError({ statusMessage: result.error.message, statusCode: 400 })
  }
  const user = await db.query.users.findFirst({
    columns: { name: true, email: true, created_at: true, updated_at: true },
    where: eq(users.id, result.data.id),
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }
  return user
})

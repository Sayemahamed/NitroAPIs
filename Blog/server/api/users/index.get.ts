import { db } from '~/lib/db'
import { IdParamsSchema } from '@/lib/db/schemas/users'
import { users } from '~/lib/db/models'
import { eq } from 'drizzle-orm'
export default defineEventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, IdParamsSchema.safeParseAsync)
  if (!result.success) {
    const users = await db.query.users.findMany({
      columns: { name: true, email: true },
      with: { posts: { columns: { title: true, id: true } } },
    })
    return users
  }
  const user = await db.query.users.findFirst({
    columns: { name: true, email: true },
    with: { posts: { columns: { title: true, id: true } } },
    where: eq(users.id, result.data.id),
  })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }
  return user
})

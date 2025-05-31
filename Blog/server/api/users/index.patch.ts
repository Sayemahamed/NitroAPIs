import { db } from '~/lib/db'
import { UpdateUserSchema } from '~/lib/db/schemas/users'
import bcrypt from 'bcryptjs'
import { users } from '~/lib/db/models'
import { eq } from 'drizzle-orm'
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, UpdateUserSchema.safeParseAsync)
  if (!result.success) {
    throw createError({ statusMessage: result.error.message, statusCode: 400 })
  }
  console.log(result.data)
  if (result.data.password_hash) {
    result.data.password_hash = await bcrypt.hash(result.data.password_hash, 10)
  }
  const user = await db
    .update(users)
    .set(result.data)
    .where(eq(users.id, result.data.id ?? ''))
    .returning({ id: users.id })
  return user
})

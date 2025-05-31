import { db } from '~/lib/db'
import { InsertUserSchema } from '~/lib/db/schemas/users'
import bcrypt from 'bcryptjs'
import { users } from '~/lib/db/models'
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertUserSchema.safeParseAsync)
  if (!result.success) {
    throw createError({ statusMessage: result.error.message, statusCode: 400 })
  }
  console.log(result.data)
  result.data.password_hash = await bcrypt.hash(result.data.password_hash, 10)
  const user = await db.insert(users).values(result.data).returning({ id: users.id })
  return user
})

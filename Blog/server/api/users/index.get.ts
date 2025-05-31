import { db } from '~/lib/db'

export default defineEventHandler(async () => {
  const users = await db.query.users.findMany({
    columns: { id: true, name: true, email: true },
  })
  return users
})

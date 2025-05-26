import { db } from '~/lib/db'
import { IdParamsSchema } from '~/lib/db/schemas/tasks'
import { tasks } from '~/lib/db/models/tasks'
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
  const task = await db.delete(tasks).where(eq(tasks.id, id.data.id)).returning()
  return task
})

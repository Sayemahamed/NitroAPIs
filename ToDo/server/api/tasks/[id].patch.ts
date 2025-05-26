import { db } from '~/lib/db'
import { tasks } from '~/lib/db/models/tasks'
import { IdParamsSchema,UpdateTaskSchema } from '~/lib/db/schemas/tasks'
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
  const result = await readValidatedBody(event, UpdateTaskSchema.safeParseAsync)
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      }),
    )
  }
  const task = await db.update(tasks).set(result.data).where(eq(tasks.id, id.data.id)).returning()
  return task
})

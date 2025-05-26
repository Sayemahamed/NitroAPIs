import { db } from '~/lib/db'
import { IdParamsSchema, UpdateTaskSchema } from '~/lib/db/schemas/tasks'
import { eq } from 'drizzle-orm'
import { tasks } from '~/lib/db/models/tasks'
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
  try {
    const task = await db.update(tasks).set(result.data).where(eq(tasks.id, id.data.id)).returning()
    if (!task) {
      return sendError(
        event,
        createError({
          statusCode: 404,
          statusMessage: 'Task Not Found',
        }),
      )
    }
    return task
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      }),
    )
  }
})

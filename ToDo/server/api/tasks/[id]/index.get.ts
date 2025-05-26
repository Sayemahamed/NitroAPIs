import { db } from '~/lib/db'
import { eq } from 'drizzle-orm'
import { tasks } from '~/lib/db/models/tasks'
import {IdParamsSchema}from "@/lib/db/schemas/tasks"



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
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, id.data.id),
  })
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
})

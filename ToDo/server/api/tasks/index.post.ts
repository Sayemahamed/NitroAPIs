import { db } from "~/lib/db";
import { InsertTaskSchema } from "~/lib/db/schemas/tasks";
import { tasks } from "~/lib/db/models/tasks";
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(
    event,
    InsertTaskSchema.safeParseAsync
  );
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Bad Request",
      })
    );
  }

  const task = await db.insert(tasks).values(result.data).returning();
  return task;
});

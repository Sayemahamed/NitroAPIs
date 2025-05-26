import * as models from "@/lib/db/models/tasks";
import { createInsertSchema } from "drizzle-zod";

export const InsertTaskSchema = createInsertSchema(models.tasks, {
  title: (field) => field.min(5).max(100),
  description: (field) => field.max(1000).optional(),
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
  complete: true,
});

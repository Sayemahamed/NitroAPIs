import * as models from '@/lib/db/models'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'

export const InsertPostSchema = createInsertSchema(models.posts, {
  title: (field) => field.min(5).max(100),
  content: (field) => field.min(5).max(1000),
  author_id: (field) => field.min(5).max(100),
}).omit({ id: true, created_at: true, updated_at: true })
export const UpdatePostSchema = createUpdateSchema(models.posts, {
  title: (field) => field.min(5).max(100).optional(),
  content: (field) => field.min(5).max(1000).optional(),
  author_id: (field) => field.min(5).max(100).optional(),
}).omit({ created_at: true, updated_at: true, id: true })

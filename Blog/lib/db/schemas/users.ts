import * as models from '@/lib/db/models'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'

export const InsertUserSchema = createInsertSchema(models.users, {
  name: (field) => field.min(5).max(100),
  email: (field) => field.email(),
  password_hash: (field) => field.min(5).max(100),
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const IdParamsSchema = z.object({
  id: z.string().uuid(),
})

export const UpdateUserSchema = createUpdateSchema(models.users, {
  id: (field) => field.min(5).max(100),
  name: (field) => field.min(5).max(100).optional(),
  email: (field) => field.email().optional(),
  password_hash: (field) => field.min(5).max(100).optional(),
}).omit({
  created_at: true,
  updated_at: true,
})

export const passwordSchema = z.object({
  password: z.string().min(5).max(100),
})

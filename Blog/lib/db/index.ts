import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './models/index.ts'

export const db = drizzle({
  client: new Pool({
    connectionString: process.env.DATABASE_URL as string,
  }),
  schema,
  logger: true,
  casing: 'snake_case',
})

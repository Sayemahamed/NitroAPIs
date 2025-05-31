import { db } from '~/lib/db'
import { posts } from '~/lib/db/models'
import { InsertPostSchema } from '~/lib/db/schemas/posts'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertPostSchema.safeParseAsync)
  
  if (!result.success) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: result.error.message,
      })
    )
  }

  try {
    const newPost = await db.insert(posts)
      .values({
        title: result.data.title,
        content: result.data.content,
        author_id: result.data.author_id,
      })
      .returning({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        author_id: posts.author_id,
        created_at: posts.created_at,
        updated_at: posts.updated_at,
      })

    if (!newPost[0]) {
      throw new Error('Failed to create post')
    }

    return newPost[0]
  } catch (error: any) {
    console.error('Error creating post:', error)
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: 'Failed to create post',
      })
    )
  }
})

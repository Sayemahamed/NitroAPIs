import { db } from '.'
import { users, posts } from './models'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

// Number of users and posts to generate
const NUM_USERS = 5
const POSTS_PER_USER = 3

// Helper function to generate random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Generate realistic test users
const generateUsers = async () => {
  const testUsers = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await bcrypt.hash('password123', 10),
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password_hash: await bcrypt.hash('password123', 10),
    },
  ]

  // Generate additional random users
  for (let i = 3; i <= NUM_USERS; i++) {
    testUsers.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      password_hash: await bcrypt.hash(`password${i}`, 10),
    })
  }

  return testUsers
}

// Generate test posts for users
const generatePosts = (userIds: string[]) => {
  const testPosts = []
  const now = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(now.getFullYear() - 1)

  for (const userId of userIds) {
    for (let i = 0; i < POSTS_PER_USER; i++) {
      const postDate = randomDate(oneYearAgo, now)
      testPosts.push({
        title: `Post ${i + 1} by User ${userId}`,
        content: `This is a test post #${i + 1} by user ${userId}. ` +
                 `This post was created on ${postDate.toLocaleDateString()}.`,
        author_id: userId,
        created_at: postDate,
        updated_at: postDate,
      })
    }
  }
  return testPosts
}

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting database seeding...')
    
    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await db.delete(posts)
    await db.delete(users)
    console.log('✅ Database cleared')

    // Insert users
    console.log('👥 Inserting users...')
    const testUsers = await generateUsers()
    const insertedUsers = await db
      .insert(users)
      .values(testUsers)
      .returning({ id: users.id })
    
    console.log(`✅ Inserted ${insertedUsers.length} users`)

    // Get user IDs for post generation
    const userIds = insertedUsers.map(user => user.id)
    
    // Insert posts
    console.log('📝 Generating posts...')
    const testPosts = generatePosts(userIds)
    const insertedPosts = await db
      .insert(posts)
      .values(testPosts)
      .returning({ id: posts.id })
    
    console.log(`✅ Inserted ${insertedPosts.length} posts`)
    console.log('🎉 Database seeding completed successfully!')
    
    // Return some test credentials
    return {
      testCredentials: {
        email: 'john@example.com',
        password: 'password123'
      }
    }
  } catch (error) {
    console.error('❌ Error seeding database:')
    console.error(error)
    throw error
  } finally {
    // Close the database connection
    // Note: This assumes your db client has a method to close the connection
    // If using a connection pool, you might not need to close it
    // await db.end()
  }
}

// Run the seed if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(({ testCredentials }) => {
      console.log('\nTest user credentials:')
      console.log(`Email: ${testCredentials.email}`)
      console.log(`Password: ${testCredentials.password}`)
      process.exit(0)
    })
    .catch((error) => {
      console.error('Failed to seed database:', error)
      process.exit(1)
    })
}

export { seedDatabase }
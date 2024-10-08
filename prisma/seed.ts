import { PrismaClient as SQLitePrismaClient } from '../prisma/generated/client1'
import { PrismaClient as MySQLPrismaClient } from '../prisma/generated/client2'

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function main() {
    // Connect to SQLite database
    const sqliteClient = new SQLitePrismaClient()

    // Connect to MySQL database
    const mysqlClient = new MySQLPrismaClient()

    try {
        // Fetch all tasks and hints from SQLite
        const sqliteTasks = await sqliteClient.task.findMany()
        const sqliteHints = await sqliteClient.hint.findMany()
        const sqliteHint_Bullets = await sqliteClient.hint_Bullet.findMany()
        // Insert each task into the MySQL database
        for (const task of sqliteTasks) {
            await mysqlClient.task.create({ data: task })
        }

        // Insert each hint into the MySQL database
        for (const hint of sqliteHints) {
            await mysqlClient.hint.create({ data: hint })
        }

        for (const bullet of sqliteHint_Bullets) {
            await mysqlClient.hint_Bullet.create({ data: bullet })
        }

        console.log('Data migration complete!')
    } catch (error) {
        console.error('Error migrating data:', error)
    } finally {
        // Disconnect both clients
        await sqliteClient.$disconnect()
        await mysqlClient.$disconnect()
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })

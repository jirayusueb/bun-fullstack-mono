import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './client';

async function main() {
  console.log('🔄 Starting migration...');

  try {
    // This will automatically run needed migrations on the database
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migrations completed successfully');
  }
  catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
  finally {
    // Close the database connection
    process.exit(0);
  }
}

// Only run the migration if this file is executed directly
if (require.main === module) {
  main();
}

export { main as migrateDb };

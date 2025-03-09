#!/usr/bin/env bun

import { migrateDb } from '@/shared/infrastructure/db';

// Get the command from the command line
const command = process.argv[2];

// Execute the appropriate command
if (command === 'migrate') {
  await migrateDb();
}
else {
  console.error(`Unknown command: ${command}`);
  console.log('Available commands: migrate');
  process.exit(1);
}

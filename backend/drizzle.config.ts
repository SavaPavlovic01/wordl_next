import { defineConfig } from 'drizzle-kit';
require('dotenv').config()
export default defineConfig({
    schema: ["./src/models/users.ts", "./src/models/games.ts"],
    out: './drizzle',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
      host: "127.0.0.1:5432",
      user: "postgres",
      password: "123",
      database: "test",
  },
});
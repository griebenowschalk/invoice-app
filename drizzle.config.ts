import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({
  path: "./.env.local",
});

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL!,
  },
});
// This configuration file is used by Drizzle ORM to manage database migrations
// and schema definitions. It specifies the output directory for migrations,
// the schema file location, the database dialect, and the database connection
// credentials. The environment variables are loaded from a local `.env.local` file.
// Ensure that the `XATA_DATABASE_URL` environment variable is set to connect to the database.
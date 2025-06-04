import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "open",
  "paid",
  "void",
  "uncollectable",
]);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  customer: text("customer").notNull(),
  email: text("email").notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  status: statusEnum("status").default("open").notNull(),
});

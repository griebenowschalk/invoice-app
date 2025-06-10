import { AVAILABLE_STATUSES } from "@/data/invoices";
import { Status } from "@/types/invoices";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum(
  "status",
  AVAILABLE_STATUSES.map(({ value }) => value) as [Status, ...Status[]]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  user_id: text("user_id").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  customer_id: integer("customer_id").references(() => Customers.id),
  status: statusEnum("status").default("open").notNull(),
});

export const Customers = pgTable("customer", {
  id: serial("id").primaryKey().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  user_id: text("user_id").notNull(),
});

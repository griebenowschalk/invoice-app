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
  customer: text("customer").notNull(),
  email: text("email").notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  user_id: text("user_id").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  status: statusEnum("status").default("open").notNull(),
});

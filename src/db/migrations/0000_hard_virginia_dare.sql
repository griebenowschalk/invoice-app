CREATE TYPE "public"."status" AS ENUM('open', 'paid', 'void', 'uncollectable');--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" "status" DEFAULT 'open' NOT NULL
);

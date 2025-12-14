CREATE SCHEMA "ardua";
--> statement-breakpoint
CREATE TABLE "ardua"."todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);

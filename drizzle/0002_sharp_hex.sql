ALTER TABLE "ardua"."todos" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "ardua"."todos" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ardua"."todos" ADD CONSTRAINT "todos_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "ardua"."user"("id") ON DELETE cascade ON UPDATE no action;
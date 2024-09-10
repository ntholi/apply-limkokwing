CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"role" text DEFAULT 'user',
	"created_at" timestamp,
	"updated_at" timestamp
);

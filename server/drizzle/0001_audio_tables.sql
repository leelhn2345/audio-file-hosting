CREATE TABLE "audios_genres" (
	"id" uuid PRIMARY KEY NOT NULL,
	"audio_id" uuid NOT NULL,
	"genre_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audios" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"file_object" json NOT NULL,
	"description" text,
	"artist" text,
	"release_date" timestamp with time zone,
	"uploaded_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "audios_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audios_genres" ADD CONSTRAINT "audios_genres_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audios_genres" ADD CONSTRAINT "audios_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audios" ADD CONSTRAINT "audios_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
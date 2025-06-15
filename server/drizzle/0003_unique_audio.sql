ALTER TABLE "audios" DROP CONSTRAINT "audios_name_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "uniqueSongIdx" ON "audios" USING btree ("name","uploaded_by");
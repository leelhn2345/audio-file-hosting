import { Static } from "@sinclair/typebox";
import { and, eq } from "drizzle-orm";

import { db } from "@db/index.js";
import { audioTable } from "@db/tables/audio.table.js";

import { UserSessionType } from "@modules/user/user.schema.js";

import { PaginationSchema } from "@utils/pagination.js";

export async function getAllAudios(
  pagination: Static<typeof PaginationSchema>,
  user: UserSessionType,
) {}

export async function getAudio(audioId: string, user: UserSessionType) {
  const data = await db
    .select()
    .from(audioTable)
    .where(and(eq(audioTable.id, audioId), eq(audioTable.uploadedBy, user.id)));

  return data;
}

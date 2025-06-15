import { Static } from "@sinclair/typebox";
import { and, eq } from "drizzle-orm";

import { db } from "@db/index.js";
import { audioTable } from "@db/tables/audio.table.js";

import { AudioPaginationSchema } from "./audio.schema.js";
import { UserSessionType } from "@modules/user/user.schema.js";

import {
  generateTextSearchCondition,
  queryOrderBy,
} from "@utils/pagination.js";

export async function getAllAudios(
  pagination: Static<typeof AudioPaginationSchema>,
  user: UserSessionType,
) {
  const textSearch = generateTextSearchCondition(
    [audioTable.name],
    pagination.textSearch,
  );

  const filter = and(textSearch, eq(audioTable.uploadedBy, user.id));

  const total = await db.$count(audioTable, filter);

  const orderBy = queryOrderBy(pagination.sortBy, pagination.sortOrder);

  const data = await db
    .select()
    .from(audioTable)
    .where(filter)
    .orderBy(orderBy)
    .limit(pagination.limit ?? 10)
    .offset(pagination.offset ?? 0);

  return { total, data };
}

export async function getAudio(audioId: string, user: UserSessionType) {
  const data = await db
    .select()
    .from(audioTable)
    .where(and(eq(audioTable.id, audioId), eq(audioTable.uploadedBy, user.id)));

  return data;
}

export async function deleteAudio(audioId: string, user: UserSessionType) {
  await db
    .delete(audioTable)
    .where(and(eq(audioTable.id, audioId), eq(audioTable.uploadedBy, user.id)));
}

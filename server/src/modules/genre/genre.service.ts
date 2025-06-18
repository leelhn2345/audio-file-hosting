import { Static } from "@sinclair/typebox";
import { randomUUID } from "crypto";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

import { db } from "@db/index.js";
import { audioGenreTable } from "@db/tables/audio-genre.table.js";
import { audioTable } from "@db/tables/audio.table.js";
import { genreTable } from "@db/tables/genre.table.js";

import { GenrePaginationSchema } from "./genre.schema.js";
import { UserSessionType } from "@modules/user/user.schema.js";

import {
  generateTextSearchCondition,
  queryOrderBy,
} from "@utils/pagination.js";

export async function getGenres(
  pagination: Static<typeof GenrePaginationSchema>,
  user: UserSessionType,
) {
  const textSearch = generateTextSearchCondition(
    [genreTable.name],
    pagination.textSearch,
  );

  const filter = and(textSearch, eq(genreTable.userId, user.id));

  const total = await db.$count(genreTable, filter);

  const orderBy = queryOrderBy(pagination.sortBy, pagination.sortOrder);

  let data;
  if (pagination.pagination) {
    data = await db
      .select()
      .from(genreTable)
      .where(filter)
      .orderBy(orderBy)
      .limit(pagination.limit ?? 10)
      .offset(pagination.offset ?? 0);
  } else {
    data = await db.select().from(genreTable).where(filter).orderBy(orderBy);
  }

  return { total, data };
}

export async function getGenreById(genreId: string, user: UserSessionType) {
  const { id, name } = await db
    .select({ name: genreTable.name, id: genreTable.id })
    .from(genreTable)
    .where(and(eq(genreTable.id, genreId), eq(genreTable.userId, user.id)))
    .then((x) => x[0]);

  const audios = await db
    .select({ ...getTableColumns(audioTable) })
    .from(genreTable)
    .innerJoin(audioGenreTable, eq(genreTable.id, audioGenreTable.genreId))
    .innerJoin(audioTable, eq(audioGenreTable.audioId, audioTable.id))
    .where(eq(audioGenreTable.genreId, id));

  const totalFileSize = await db
    .select({
      totalFileSize: sql<number>`SUM((${audioTable.fileObject}->>'fileSize')::numeric)`,
    })
    .from(genreTable)
    .innerJoin(audioGenreTable, eq(genreTable.id, audioGenreTable.genreId))
    .innerJoin(audioTable, eq(audioGenreTable.audioId, audioTable.id))
    .where(eq(audioGenreTable.genreId, id))
    .then((x) => x[0].totalFileSize);

  return { id, name, audios, totalFileSize };
}

export async function postGenre(genreName: string, user: UserSessionType) {
  const newId = await db
    .insert(genreTable)
    .values({
      id: randomUUID(),
      name: genreName.toLowerCase(),
      userId: user.id,
    })
    .onConflictDoUpdate({
      target: [genreTable.userId, genreTable.name],
      set: { name: genreName },
    })
    .returning({ id: genreTable.id })
    .then((x) => x[0].id);
  return newId;
}

export async function deleteGenre(genreId: string, user: UserSessionType) {
  await db
    .delete(genreTable)
    .where(and(eq(genreTable.id, genreId), eq(genreTable.userId, user.id)));
}

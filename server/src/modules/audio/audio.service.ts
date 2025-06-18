import { Static } from "@sinclair/typebox";
import { randomUUID } from "crypto";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

import { minioClient } from "@config/minio.js";

import { db } from "@db/index.js";
import { audioGenreTable } from "@db/tables/audio-genre.table.js";
import { audioTable } from "@db/tables/audio.table.js";
import { genreTable } from "@db/tables/genre.table.js";

import {
  AudioGenreSchema,
  AudioPaginationSchema,
  PostAudioSchema,
  PutAudioSchema,
} from "./audio.schema.js";
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

  let data;

  if (pagination.pagination) {
    data = await db
      .select()
      .from(audioTable)
      .where(filter)
      .orderBy(orderBy)
      .limit(pagination.limit ?? 10)
      .offset(pagination.offset ?? 0);
  } else {
    data = await db.select().from(audioTable).where(filter).orderBy(orderBy);
  }

  const totalFileSize = await db
    .select({
      totalFileSize: sql<number>`SUM((${audioTable.fileObject}->>'fileSize')::numeric)`,
    })
    .from(audioTable)
    .where(filter)
    .then((x) => x[0].totalFileSize);

  return { total, data, totalFileSize };
}

export async function getAudio(audioId: string, user: UserSessionType) {
  const data = await db
    .select()
    .from(audioTable)
    .where(and(eq(audioTable.id, audioId), eq(audioTable.uploadedBy, user.id)))
    .then((x) => x[0]);

  const genres = await db
    .select({ genreId: genreTable.id, genreName: genreTable.name })
    .from(audioGenreTable)
    .innerJoin(genreTable, eq(audioGenreTable.genreId, genreTable.id))
    .where(eq(audioGenreTable.audioId, audioId));

  return { ...data, genres };
}

export async function deleteAudio(audioId: string, user: UserSessionType) {
  const deletedAudioArray = await db
    .delete(audioTable)
    .where(and(eq(audioTable.id, audioId), eq(audioTable.uploadedBy, user.id)))
    .returning();

  if (deletedAudioArray.length === 0) return;

  const deletedAudio = deletedAudioArray[0];

  await minioClient.removeObject(
    deletedAudio.fileObject.bucket,
    deletedAudio.fileObject.objectKey,
  );
}

export async function postAudio(
  data: Static<typeof PostAudioSchema>,
  user: UserSessionType,
) {
  await db.insert(audioTable).values({
    id: randomUUID(),
    ...data,
    uploadedBy: user.id,
  });
}

export async function putAudio(
  audioId: string,
  data: Static<typeof PutAudioSchema>,
  user: UserSessionType,
) {
  await db
    .update(audioTable)
    .set({ ...data })
    .where(and(eq(audioTable.id, audioId), eq(audioTable.uploadedBy, user.id)));
}

export async function putAudioToGenre(data: Static<typeof AudioGenreSchema>) {
  const { audioId, genreId } = data;
  await db
    .insert(audioGenreTable)
    .values({ id: randomUUID(), audioId, genreId });
}

export async function deleteAudioFromGenre(
  data: Static<typeof AudioGenreSchema>,
) {
  const { audioId, genreId } = data;
  await db
    .delete(audioGenreTable)
    .where(
      and(
        eq(audioGenreTable.audioId, audioId),
        eq(audioGenreTable.genreId, genreId),
      ),
    );
}

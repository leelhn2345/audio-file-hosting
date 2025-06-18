import { Type as t } from "@sinclair/typebox";

import { PaginationSchema } from "@utils/pagination.js";

export const GenrePaginationSchema = t.Composite([
  PaginationSchema,
  t.Object({
    textSearch: t.Optional(
      t.String({ description: "Searches relevant fields." }),
    ),
  }),
]);
